# B92 protocol
import numpy as np


def simulate_b92(n, noise_prob, eve_prob, seed=None):
    """
    Simulate B92 quantum key distribution protocol
    
    Parameters:
    - n: number of qubits to send
    - noise_prob: channel noise probability
    - eve_prob: probability Eve attacks (0 = no Eve, 1 = always Eve)
    - seed: random seed for reproducibility
    
    Returns:
    - dict with total_signals, conclusive_detections, errors, conclusive_rate, qber
    """
    if seed is not None:
        np.random.seed(seed)
    
    # -----------------------------
    # STATES (column vectors)
    # -----------------------------
    H = np.array([1, 0])                     # |H>
    V = np.array([0, 1])                     # |V>
    PLUS = (H + V) / np.sqrt(2)              # |+>
    MINUS = (H - V) / np.sqrt(2)              # |->

    # Bob's POVM test states
    bob_tests = [V, MINUS]

    # -----------------------------
    # HELPER FUNCTIONS
    # -----------------------------
    def measure_probability(state, test_state):
        """Probability of detector click"""
        return abs(np.dot(test_state.conj(), state))**2

    def apply_noise(state):
        """Simple polarization flip noise"""
        if np.random.rand() < noise_prob:
            return V if np.allclose(state, H) else H
        return state

    # -----------------------------
    # ALICE: generate bits
    # -----------------------------
    alice_bits = np.random.randint(0, 2, n)

    # -----------------------------
    # MAIN SIMULATION
    # -----------------------------
    conclusive = 0
    errors = 0

    for i in range(n):

        # Alice encodes
        if alice_bits[i] == 0:
            state = H
        else:
            state = PLUS

        # Channel noise
        state = apply_noise(state)

        # Eve attack (intercept–resend)
        if np.random.rand() < eve_prob:
            eve_test = bob_tests[np.random.randint(0, 2)]
            p_eve = measure_probability(state, eve_test)
            if np.random.rand() < p_eve:
                state = eve_test          # collapse
            # else Eve resends guessed state
            else:
                state = bob_tests[np.random.randint(0, 2)]

        # Bob chooses POVM test
        bob_test = bob_tests[np.random.randint(0, 2)]
        p_bob = measure_probability(state, bob_test)

        # Detector click?
        if np.random.rand() < p_bob:
            conclusive += 1

            # Bob inference
            if np.allclose(bob_test, V):
                bob_bit = 1   # not |H>
            else:
                bob_bit = 0   # not |+>

            # Error check
            if bob_bit != alice_bits[i]:
                errors += 1

    # -----------------------------
    # RESULTS
    # -----------------------------
    conclusive_rate = conclusive / n
    QBER = errors / conclusive if conclusive > 0 else 0

    return {
        "total_signals": n,
        "conclusive_detections": conclusive,
        "errors": errors,
        "conclusive_rate": round(conclusive_rate, 4),
        "qber": round(QBER, 4)
    }


# -----------------------------
# For direct script execution
# -----------------------------
if __name__ == "__main__":
    # PARAMETERS (you can change)
    N = 20000
    noise_prob = 0.00
    eve_prob = 0.0
    
    result = simulate_b92(n=N, noise_prob=noise_prob, eve_prob=eve_prob, seed=1)
    
    print("Total signals sent:", result["total_signals"])
    print("Conclusive detections:", result["conclusive_detections"])
    print("Conclusive rate:", result["conclusive_rate"])
    print("Errors:", result["errors"])
    print("QBER:", result["qber"])
