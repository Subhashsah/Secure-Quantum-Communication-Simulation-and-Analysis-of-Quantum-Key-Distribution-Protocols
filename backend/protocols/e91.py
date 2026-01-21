import numpy as np
from qiskit import QuantumCircuit, transpile
from qiskit_aer import AerSimulator
from qiskit_aer.noise import NoiseModel, depolarizing_error

# ==========================================================
# Measurement angles (radians)
# ==========================================================
alice_angles = {
    "A0": 0.0,              # Key basis
    "A1": 0.0,
    "A2": np.pi / 4
}

bob_angles = {
    "B0": 0.0,              # Key basis
    "B1": np.pi / 8,
    "B3": 3 * np.pi / 8
}

bell_pairs = [("A1","B1"), ("A1","B3"), ("A2","B1"), ("A2","B3")]

# ==========================================================
# Bell-state circuit
# ==========================================================
def bell_circuit(theta_A, theta_B):
    qc = QuantumCircuit(2, 2)
    qc.h(0)
    qc.cx(0, 1)
    qc.ry(-2 * theta_A, 0)
    qc.ry(-2 * theta_B, 1)
    qc.measure(0, 0)
    qc.measure(1, 1)
    return qc

# ==========================================================
# Noise model
# ==========================================================
def build_noise(p):
    nm = NoiseModel()
    nm.add_all_qubit_quantum_error(depolarizing_error(p, 1), ["h", "ry"])
    nm.add_all_qubit_quantum_error(depolarizing_error(p, 2), ["cx"])
    return nm

# ==========================================================
# E91 SIMULATION WITH FLEXIBLE EVE
# ==========================================================
def simulate_e91(
    total_pairs=10000,
    eve_prob=0.0,
    noise_prob=0.0,
    bell_ratio=0.2,
    eve_mode="key"   # "key", "bell", "both"
):
    """
    E91 simulation with configurable Eve behavior

    eve_mode:
        "key"  -> Eve attacks only key-generation rounds
        "bell" -> Eve attacks only Bell-test rounds
        "both" -> Eve attacks both
    """

    sim = (
        AerSimulator(noise_model=build_noise(noise_prob))
        if noise_prob > 0 else AerSimulator()
    )

    bell_shots = int(total_pairs * bell_ratio / 4)
    key_shots  = int(total_pairs * (1 - bell_ratio))

    bell_data = {pair: [] for pair in bell_pairs}
    key_data  = []

    # ================= Bell test =================
    for (A, B) in bell_pairs:
        qc = bell_circuit(alice_angles[A], bob_angles[B])

        # Eve attacks Bell-test rounds
        if eve_mode in ["bell", "both"] and np.random.rand() < eve_prob:
            qc.x(1)   # disturb Bob's qubit

        tqc = transpile(qc, sim)
        result = sim.run(tqc, shots=bell_shots).result()
        counts = result.get_counts()

        for bitstring, c in counts.items():
            a = 1 if bitstring[1] == '0' else -1
            b = 1 if bitstring[0] == '0' else -1
            bell_data[(A, B)] += [a * b] * c

    # ================= Key generation =================
    qc_key = bell_circuit(alice_angles["A0"], bob_angles["B0"])
    tqc_key = transpile(qc_key, sim)
    result = sim.run(tqc_key, shots=key_shots).result()
    counts = result.get_counts()

    for bitstring, c in counts.items():
        a = 1 if bitstring[1] == '0' else -1
        b = 1 if bitstring[0] == '0' else -1

        for _ in range(c):
            if eve_mode in ["key", "both"] and np.random.rand() < eve_prob:
                b *= -1   # Eve flips Bob's bit
            key_data.append((a, b))

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
    print("\n====== E91 FINAL PROJECT RESULTS ======")
    print(f"Total pairs           : {total_pairs}")
    print(f"Bell-test fraction    : {bell_ratio}")
    print(f"Eavesdropper strength : {eve_prob}")
    print(f"Eve mode              : {eve_mode}")
    print(f"Noise probability     : {noise_prob}\n")

    print("Bell correlations:")
    print(f"E(A1,B1) = {E11:.3f}")
    print(f"E(A1,B3) = {E13:.3f}")
    print(f"E(A2,B1) = {E21:.3f}")
    print(f"E(A2,B3) = {E23:.3f}")

    print(f"\nCHSH S = {S:.3f}")
    print(f"QBER   = {qber*100:.2f}%")

    if S <= 2:
        print("✘ Abort: No Bell violation")
    elif qber > 0.11:
        print("✘ Abort: QBER too high")
    else:
        print("✔ Secure key established")

    return {
        "S": float(S),
        "QBER": qber,
        "errors": errors,
        "eve_mode": eve_mode
    }

# ==========================================================
# EXAMPLE RUN
# ==========================================================
if __name__ == "__main__":
    simulate_e91(
        total_pairs=5000,
        eve_prob=0.05,
        noise_prob=0.00,
        bell_ratio=0.25,
        eve_mode="both"   # try: "key", "bell", "both"
    )
