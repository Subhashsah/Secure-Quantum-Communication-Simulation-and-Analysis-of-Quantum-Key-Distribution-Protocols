import numpy as np
from qiskit import QuantumCircuit, transpile
from qiskit_aer import AerSimulator
from qiskit_aer.noise import NoiseModel, depolarizing_error

# ==========================================================
# Measurement angles (radians)
# ==========================================================
alice_angles = {
    "A0": 0.0,
    "A1": 0.0,
    "A2": np.pi / 4
}

bob_angles = {
    "B0": 0.0,
    "B1": np.pi / 8,
    "B3": 3 * np.pi / 8
}

bell_pairs = [("A1","B1"), ("A1","B3"), ("A2","B1"), ("A2","B3")]

# ==========================================================
# Noise model
# ==========================================================
def build_noise(p):
    nm = NoiseModel()
    nm.add_all_qubit_quantum_error(depolarizing_error(p, 1), ["h", "ry"])
    nm.add_all_qubit_quantum_error(depolarizing_error(p, 2), ["cx"])
    return nm

# ==========================================================
# Bell-state circuit
# ==========================================================
def bell_circuit(theta_A, theta_B, eve_attack=False):
    qc = QuantumCircuit(2, 2)

    qc.h(0)
    qc.cx(0, 1)

    if eve_attack:
        qc.reset(0)
        qc.reset(1)

    qc.ry(-2 * theta_A, 0)
    qc.ry(-2 * theta_B, 1)

    qc.measure(0, 0)
    qc.measure(1, 1)
    return qc

# ==========================================================
# E91 SIMULATION
# ==========================================================
def simulate_e91(
    total_pairs=5000,
    eve_prob=0.0,
    noise_prob=0.0,
    bell_ratio=0.2,
    eve_mode="key"   # "none", "key", "bell", "both"
):

    shots_per_circuit = 200   # ✅ FIX

    sim = (
        AerSimulator(noise_model=build_noise(noise_prob))
        if noise_prob > 0 else AerSimulator()
    )

    total_bell_pairs = int(total_pairs * bell_ratio)
    total_key_pairs  = total_pairs - total_bell_pairs
    bell_per_setting = total_bell_pairs // len(bell_pairs)

    bell_data = {pair: [] for pair in bell_pairs}
    key_data  = []

    bell_used = 0
    key_used  = 0

    # ================= Bell test =================
    for (A, B) in bell_pairs:
        for _ in range(bell_per_setting):

            eve_here = (
                eve_mode in ["bell", "both"]
                and np.random.rand() < eve_prob
            )

            qc = bell_circuit(
                alice_angles[A],
                bob_angles[B],
                eve_attack=eve_here
            )

            tqc = transpile(qc, sim)
            result = sim.run(tqc, shots=shots_per_circuit).result()
            counts = result.get_counts()

            E = 0
            total = sum(counts.values())

            for bitstring, c in counts.items():
                a = 1 if bitstring[1] == '0' else -1
                b = 1 if bitstring[0] == '0' else -1
                E += (a * b) * c

            E /= total
            bell_data[(A, B)].append(E)
            bell_used += 1

    # ================= Key generation (unchanged) =================
    for _ in range(total_key_pairs):
        qc = bell_circuit(
            alice_angles["A0"],
            bob_angles["B0"],
            eve_attack=False
        )

        tqc = transpile(qc, sim)
        result = sim.run(tqc, shots=1).result()
        bitstring = list(result.get_counts().keys())[0]

        a = 1 if bitstring[1] == '0' else -1
        b = 1 if bitstring[0] == '0' else -1

        if eve_mode in ["key", "both"] and np.random.rand() < eve_prob:
            b *= -1

        key_data.append((a, b))
        key_used += 1

    # ================= QBER =================
    errors = sum(1 for a, b in key_data if a != b)
    qber = errors / len(key_data) if key_data else 0.0

    # ================= CHSH =================
    def E(pair):
        return np.mean(bell_data[pair]) if bell_data[pair] else 0.0

    E11 = E(("A1","B1"))
    E13 = E(("A1","B3"))
    E21 = E(("A2","B1"))
    E23 = E(("A2","B3"))

    S = abs(E11 - E13 + E21 + E23)

    # ================= OUTPUT =================
    print("\n====== E91 FINAL RESULTS ======")
    print(f"Total pairs generated : {total_pairs}")
    print(f"Bell-test pairs used  : {bell_used}")
    print(f"Key-generation pairs  : {key_used}")
    print(f"Eve probability       : {eve_prob}")
    print(f"Eve mode              : {eve_mode}")
    print(f"Noise probability     : {noise_prob}")
    print(f"Bell ratio            : {bell_ratio}")

    print(f"\nCHSH S = {S:.3f}")
    print(f"QBER   = {qber*100:.2f}%")

    if S <= 2:
        print("✘ Abort: No Bell violation")
    elif qber > 0.11:
        print("✘ Abort: QBER too high")
    else:
        print("✔ Secure key established")

    return {
        "S": S,
        "QBER": qber,
        "errors": errors,
        "eve_mode": eve_mode,
        "bell_pairs_used": bell_used,
        "key_pairs_used": key_used
    }

# ==========================================================
# EXAMPLE RUN
# ==========================================================
if __name__ == "__main__":
    simulate_e91(
        total_pairs=5000,
        eve_prob=0.0,
        noise_prob=0.08,
        bell_ratio=0.25,
        eve_mode="none"
    )
