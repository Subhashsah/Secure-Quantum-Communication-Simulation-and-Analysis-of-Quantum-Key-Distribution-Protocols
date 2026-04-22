
import random
import numpy as np
from qiskit import QuantumCircuit, transpile
from qiskit_aer import AerSimulator
from qiskit_aer.noise import NoiseModel, depolarizing_error


# ------------------ QUBIT PREPARATION ------------------

def prepare_bb84_qubit(bit, basis):
    qc = QuantumCircuit(1, 1)
    if bit == 1:
        qc.x(0)
    if basis == 1:
        qc.h(0)
    return qc


def measure_in_basis(qc, basis):
    if basis == 1:
        qc.h(0)
    qc.measure(0, 0)
    return qc


# ------------------ NOISE MODEL ------------------

def build_depolarizing_noise(p):
    noise_model = NoiseModel()
    error = depolarizing_error(p, 1)
    noise_model.add_all_qubit_quantum_error(
        error, ["id", "x", "h", "u1", "u2", "u3"]
    )
    return noise_model


# ------------------ SINGLE MEASUREMENT ------------------

def run_shot(transpiled_qc, sim):
    result = sim.run(transpiled_qc, shots=1).result()
    bitstring = next(iter(result.get_counts()))
    return int(bitstring)


def build_measurement_cache(sim, seed=None):
    cache = {}
    for bit in (0, 1):
        for prep_basis in (0, 1):
            for meas_basis in (0, 1):
                qc = prepare_bb84_qubit(bit, prep_basis)
                qc = measure_in_basis(qc, meas_basis)
                cache[(bit, prep_basis, meas_basis)] = transpile(
                    qc, sim, seed_transpiler=seed
                )
    return cache


# ------------------ BB84 SIMULATION ------------------

def simulate_bb84(n, depolar_prob, eve_prob, seed=None):

   
    if seed is not None:
        random.seed(seed)
        np.random.seed(seed)

    # Alice & Bob random choices
    alice_bits  = [random.randint(0, 1) for _ in range(n)]
    alice_bases = [random.randint(0, 1) for _ in range(n)]
    bob_bases   = [random.randint(0, 1) for _ in range(n)]

    # Noise model
    noise_model = build_depolarizing_noise(depolar_prob) if depolar_prob > 0 else None

    #ONE simulator per simulation 
    sim = AerSimulator(
        noise_model=noise_model,
        seed_simulator=seed
    )

    measurement_cache = build_measurement_cache(sim, seed=seed)

    sifted = 0
    errors = 0

    for i in range(n):
        current_bit = alice_bits[i]
        current_basis = alice_bases[i]

        # Eve intercept-resend attack
        if random.random() < eve_prob:
            eve_basis = random.randint(0, 1)
            eve_qc = measurement_cache[(current_bit, current_basis, eve_basis)]
            eve_bit = run_shot(eve_qc, sim)
            current_bit = eve_bit
            current_basis = eve_basis

        # Bob measurement
        bob_qc = measurement_cache[(current_bit, current_basis, bob_bases[i])]
        bob_bit = run_shot(bob_qc, sim)

        # Basis reconciliation
        if alice_bases[i] == bob_bases[i]:
            sifted += 1
            if alice_bits[i] != bob_bit:
                errors += 1

    qber = errors / sifted if sifted else 0

    return {
        "total_bits": n,
        "sifted_bits": sifted,
        "errors": errors,
        "qber": round(qber, 4)
    }
