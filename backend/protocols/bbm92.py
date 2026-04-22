import random
import numpy as np
from qiskit import QuantumCircuit, transpile
from qiskit_aer import AerSimulator
from qiskit_aer.noise import NoiseModel, depolarizing_error


# ==================== NOISE MODEL ====================
def build_depolarizing_noise(p):
    noise_model = NoiseModel()
    error = depolarizing_error(p, 1)
    noise_model.add_all_qubit_quantum_error(
        error, ["id", "x", "h", "u1", "u2", "u3"]
    )
    return noise_model


# ==================== CREATE BELL STATE ====================
def create_phi_plus():
    """Create a Bell state (|Phi+> = (|00> + |11>)/sqrt(2))"""
    qc = QuantumCircuit(2, 2)
    qc.h(0)
    qc.cx(0, 1)
    return qc


# ==================== MEASUREMENT ====================
def measure_in_basis(qc, basis, qubit, classical_bit):
    """Measure qubit in chosen basis (0='Z' or 1='X')"""
    if basis == 1:  # X basis
        qc.h(qubit)
    qc.measure(qubit, classical_bit)
    return qc


def build_measurement_circuit(alice_basis, bob_basis):
    qc = QuantumCircuit(2, 2)
    qc.compose(create_phi_plus(), inplace=True)
    measure_in_basis(qc, alice_basis, 0, 0)
    measure_in_basis(qc, bob_basis, 1, 1)
    return qc


def build_eve_circuit(eve_basis):
    qc = QuantumCircuit(2, 2)
    qc.compose(create_phi_plus(), inplace=True)
    measure_in_basis(qc, eve_basis, 1, 1)
    return qc


# ==================== BBM92 SIMULATION ====================
def simulate_bbm92(
    n=1000,
    eve_prob=0.0,
    noise_prob=0.0,
    seed=None
):
    """
    BBM92 protocol simulation
    
    Parameters:
    -----------
    n : int
        Number of entangled pairs to distribute
    eve_prob : float
        Probability of Eve eavesdropping (0-1)
    noise_prob : float
        Channel noise level (0-1)
    seed : int, optional
        Random seed for reproducibility
    
    Returns:
    --------
    dict
        Simulation results
    """
    if seed is not None:
        random.seed(seed)
        np.random.seed(seed)
    
    noise_model = build_depolarizing_noise(noise_prob) if noise_prob > 0 else None
    sim = AerSimulator(noise_model=noise_model, seed_simulator=seed)

    measurement_cache = {
        (a_basis, b_basis): transpile(build_measurement_circuit(a_basis, b_basis), sim)
        for a_basis in (0, 1)
        for b_basis in (0, 1)
    }
    eve_cache = {
        eve_basis: transpile(build_eve_circuit(eve_basis), sim)
        for eve_basis in (0, 1)
    }

    sifted_key = 0
    errors = 0
    
    for _ in range(n):
        a_basis = random.randint(0, 1)
        b_basis = random.randint(0, 1)

        if random.random() < eve_prob:
            eve_basis = random.randint(0, 1)
            eve_result = sim.run(eve_cache[eve_basis], shots=1).result()
            _eve_bit = int(next(iter(eve_result.get_counts()))[-1])

        if random.random() < noise_prob:
            pass
        if random.random() < noise_prob:
            pass

        result = sim.run(measurement_cache[(a_basis, b_basis)], shots=1).result()
        outcome = next(iter(result.get_counts()))

        a_bit = int(outcome[1])
        b_bit = int(outcome[0])
        
        # Basis comparison for sifted key
        if a_basis == b_basis:
            sifted_key += 1
            if a_bit != b_bit:
                errors += 1
    
    qber = errors / sifted_key if sifted_key > 0 else 0.0
    
    return {
        "pairs_sent": n,
        "sifted_key": sifted_key,
        "errors": errors,
        "qber": round(qber, 4)
    }
