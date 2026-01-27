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


# ==================== SINGLE BBM92 ROUND ====================
def bbm92_round(eve_prob=0.0, noise_prob=0.0, seed=None):
    """
    Simulate a single BBM92 protocol round.
    
    Alice and Bob measure entangled qubits in random bases.
    Eve can perform eavesdropping with given probability.
    """
    # Random basis choices for Alice and Bob
    alice_basis = random.randint(0, 1)  # 0='Z', 1='X'
    bob_basis = random.randint(0, 1)
    
    # Create Bell state
    qc = create_phi_plus()
    
    # Eve's eavesdropping (intercept-resend attack)
    if random.random() < eve_prob:
        eve_basis = random.randint(0, 1)
        qc_eve = measure_in_basis(qc.copy(), eve_basis, 1, 1)
        # Execute to get Eve's measurement
        noise_model = build_depolarizing_noise(noise_prob) if noise_prob > 0 else None
        sim = AerSimulator(noise_model=noise_model, seed_simulator=seed)
        tqc = transpile(qc_eve, sim)
        result = sim.run(tqc, shots=1).result()
        eve_bit = int(list(result.get_counts().keys())[0][-1])
        # Resend based on Eve's measurement
        qc = create_phi_plus()
        if eve_bit == 1:
            qc.x(1)
    
    # Channel noise
    if random.random() < noise_prob:
        qc.x(0)
    if random.random() < noise_prob:
        qc.x(1)
    
    # Combined measurement circuit
    qc_combined = QuantumCircuit(2, 2)
    qc_combined.compose(create_phi_plus(), inplace=True)
    measure_in_basis(qc_combined, alice_basis, 0, 0)
    measure_in_basis(qc_combined, bob_basis, 1, 1)
    
    noise_model = build_depolarizing_noise(noise_prob) if noise_prob > 0 else None
    sim = AerSimulator(noise_model=noise_model, seed_simulator=seed)
    tqc = transpile(qc_combined, sim)
    result = sim.run(tqc, shots=1).result()
    outcome = list(result.get_counts().keys())[0]
    
    alice_bit = int(outcome[1])
    bob_bit = int(outcome[0])
    
    return alice_basis, bob_basis, alice_bit, bob_bit


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
    
    sifted_key = 0
    errors = 0
    
    for _ in range(n):
        a_basis, b_basis, a_bit, b_bit = bbm92_round(eve_prob, noise_prob, seed)
        
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
