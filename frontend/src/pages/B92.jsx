import { useNavigate } from "react-router-dom";
import "../styles/B92.css";

export default function B92() {
  const navigate = useNavigate();

  return (
    <div className="b92-container">
      {/* Background Elements */}
      <div className="starfield-bg">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="star-bg"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="b92-header">
        <button className="back-button" onClick={() => navigate("/")}>
          <span>←</span> Back
        </button>
        <div className="header-content">
          <h1 className="b92-title">B92 Quantum Key Distribution Protocol</h1>
          <p className="b92-subtitle">
            Two-state quantum cryptography with POVM measurements
          </p>
        </div>
      </header>

      {/* Information Panel */}
      <div className="info-panel">
        <div className="info-card">
          <h3 className="info-title">About B92</h3>
          <div className="flex flex-col gap-5">
            <p className="text-[1.5rem]">
              The B92 protocol is a quantum key distribution (QKD) method
              proposed by Charles H. Bennett in 1992. It is a simplified version
              of the BB84 protocol that enables two parties to securely generate
              a shared secret key using the principles of quantum mechanics.
            </p>
            <p className="text-[1.5rem]">
              Unlike BB84, which uses four quantum states, B92 uses only two
              non-orthogonal quantum states to encode information. Its security
              is fundamentally based on the fact that non-orthogonal quantum
              states cannot be perfectly distinguished, making eavesdropping
              detectable.
            </p>
            <p className="text-[1.5rem]">
              The B92 protocol works by encoding classical bits into quantum states and transmitting them over a quantum channel. The receiver performs measurements that sometimes yield definite (conclusive) results and sometimes inconclusive ones.
            </p>
          </div>
        </div>

        <div className="info-card ">
          <h3 className="info-title">How It Works</h3>

          <div className="flex justify-between  ml-10 relative">
            <div className="w-full lg:flex-1 relative left-10">
              <ol className="list-decimal relative flex flex-col gap-7 text-[1.8rem]">
                {" "}
                <li>
                  {" "}
                  <h4 className="font-bold text-[1.8rem]">
                    Uses Only Two Quantum States
                  </h4>{" "}
                  <p className="text-[1.5rem]">
                    The sender encodes bits using two non-orthogonal
                    states:{" "}
                  </p>{" "}
                  <ul className="list-disc ml-8 relative left-10 text-[1.5rem]">
                    {" "}
                    <li>Bit 0 → Horizontal polarization (|H⟩) </li>{" "}
                    <li>Bit 1 → Diagonal polarization (|+⟩) </li>{" "}
                  </ul>{" "}
                </li>{" "}
                <li>
                  {" "}
                  <h4 className="font-bold text-[1.8rem]">
                    Quantum Transmission
                  </h4>{" "}
                  <p className="text-[1.5rem]">
                    These quantum states are sent to the receiver.
                  </p>{" "}
                </li>{" "}
                <li>
                  {" "}
                  <h4 className="font-bold text-[1.8rem]">Measurement</h4>{" "}
                  <p className="text-[1.5rem]">
                    {" "}
                    The receiver randomly measures using states orthogonal to
                    the sender’s states:{" "}
                  </p>{" "}
                  <ul className="list-disc relative left-10 text-[1.5rem]">
                    {" "}
                    <li>|V⟩ (orthogonal to |H⟩) </li>{" "}
                    <li>|−⟩ (orthogonal to |+⟩) (|+⟩) </li>{" "}
                  </ul>{" "}
                </li>{" "}
                <li>
                  {" "}
                  <h4 className="font-bold text-[1.8rem]">
                    {" "}
                    Conclusive vs Inconclusive Results{" "}
                  </h4>{" "}
                  <ul className="list-disc ml-8 relative left-10 text-[1.5rem]">
                    {" "}
                    <li>Bit 0 → Horizontal polarization (|H⟩) </li>{" "}
                    <li>Bit 1 → Diagonal polarization (|+⟩) </li>{" "}
                  </ul>{" "}
                </li>{" "}
                <li>
                  {" "}
                  <h4 className="font-bold text-[1.8rem]">
                    Key Generation
                  </h4>{" "}
                  <p className="text-[1.5rem]">
                    Only conclusive results are used to form the raw key.{" "}
                  </p>{" "}
                </li>{" "}
                <li>
                  {" "}
                  <h4 className="font-bold text-[1.8rem]">
                    Eavesdropping Detection
                  </h4>{" "}
                  <p className="text-[1.5rem]">
                    {" "}
                    A subset of bits is compared publicly. If the error rate
                    (QBER) is high, communication is aborted.{" "}
                  </p>{" "}
                </li>{" "}
              </ol>
            </div>
            <div className="flex-[1r] h-full sticky top-5">
              <img
                src="image/B92.png"
                alt="B92"
                className="mx-auto w-full max-w-2xl rounded-lg object-contain lg:mx-0"
              />
            </div>
          </div>
        </div>

        <div className="info-card">
          <h3 className="info-title">Key Features</h3>
          <div className="flex justify-between  ml-10 ">
            <div className="w-full lg:flex-1 relative left-10">
              <ol className="list-disc list-outside relative flex flex-col gap-7 text-[1.8rem]">
                {" "}
                <li>
                  {" "}
                  <h4 className="font-bold text-[1.8rem]">
                    State Preparation
                  </h4>{" "}
                  <ul className="list-disc list-outside ml-8 relative left-10 text-[1.5rem]">
                    {" "}
                    <li>Simplifies implementation compared to BB84 </li>{" "}
                    <li>
                      Uses non-orthogonal states instead of multiple bases{" "}
                    </li>{" "}
                  </ul>{" "}
                </li>{" "}
                <li>
                  {" "}
                  <h4 className="font-bold text-[1.8rem]">
                    Security from Non-Orthogonality
                  </h4>{" "}
                  <ul className="list-disc list-outside ml-8 relative left-10 text-[1.5rem]">
                    {" "}
                    <li>Impossible to perfectly distinguish states </li>{" "}
                    <li>
                      Ensures inherent protection against eavesdropping{" "}
                    </li>{" "}
                  </ul>{" "}
                </li>{" "}
                <li>
                  {" "}
                  <h4 className="font-bold text-[1.5rem]">
                    Detection-Based Bit Inference
                  </h4>{" "}
                  <ul className="list-disc list-outside ml-8 relative left-10 text-[1.5rem]">
                    {" "}
                    <li>
                      Bits are inferred only when a detector click occurs{" "}
                    </li>{" "}
                    <li>Inconclusive results are safely discarded </li>{" "}
                  </ul>{" "}
                </li>{" "}
                <li>
                  {" "}
                  <h4 className="font-bold text-[1.8rem]">
                    {" "}
                    POVM-Based Measurement{" "}
                  </h4>{" "}
                  <ul className="list-disc list-outside ml-8 relative left-10 text-[1.5rem]">
                    {" "}
                    <li>
                      Uses advanced measurement (POVM) instead of simple
                      projective measurement
                    </li>{" "}
                    <li>
                      Produces three outcomes: 0, 1, or inconclusive{" "}
                    </li>{" "}
                  </ul>{" "}
                </li>{" "}
                <li>
                  {" "}
                  <h4 className="font-bold text-[1.8rem]">
                    Built-in Eavesdropping Detection
                  </h4>{" "}
                  <ul className="list-disc list-outside ml-8 relative left-10 text-[1.5rem]">
                    {" "}
                    <li>
                      Any interception introduces errors (due to measurement
                      disturbance){" "}
                    </li>{" "}
                    <li>Detected via Quantum Bit Error Rate (QBER)</li>{" "}
                  </ul>{" "}
                </li>{" "}
                <li>
                  {" "}
                  <h4 className="font-bold text-[1.8rem]">
                    Relies on Fundamental Quantum Principles
                  </h4>{" "}
                  <ul className="list-disc list-outside ml-8 relative left-10 text-[1.5rem]">
                    {" "}
                    <li>
                      <span className="font-bold">No-cloning theorem</span> →
                      prevents copying of quantum states{" "}
                    </li>{" "}
                    <li>
                      <span className="font-bold">Measurement disturbance</span>{" "}
                      → reveals eavesdropping{" "}
                    </li>{" "}
                    <li>
                      <span className="font-bold">Quantum uncertainty</span> →
                      ensures security{" "}
                    </li>{" "}
                  </ul>{" "}
                </li>{" "}
                <li>
                  {" "}
                  <h4 className="font-bold text-[1.8rem]">
                    Simpler but Efficient
                  </h4>{" "}
                  <ul className="list-disc list-outside ml-8 relative left-10 text-[1.5rem]">
                    {" "}
                    <li>Conceptually simpler than BB84 </li>{" "}
                    <li>
                      Demonstrates secure communication with minimal quantum
                      resources
                    </li>{" "}
                  </ul>{" "}
                </li>{" "}
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className="nav">
        <button className="nav-btn" onClick={() => navigate("/b92_simulation")}>
          View B92 Simulation
        </button>
      </div>
    </div>
  );
}
