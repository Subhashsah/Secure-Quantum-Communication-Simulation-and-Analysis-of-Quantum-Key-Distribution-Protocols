import { useNavigate } from "react-router-dom";
import "../styles/BB84.css";

export default function BB84() {
  const navigate = useNavigate();

  return (
    <div className="bb84-container">
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
      <header className="bb84-header">
        <button className="back-button" onClick={() => navigate("/")}>
          <span>←</span> Back
        </button>
        <div className="header-content">
          <h1 className="bb84-title">BB84 Quantum Key Distribution Protocol</h1>
          <p className="bb84-subtitle">
            Simulate quantum communication with eavesdropping detection
          </p>
        </div>
      </header>

      {/* Information Panel */}
      <div className="info-panel">
        <div className="info-card">
          <h3 className="info-title">About B92</h3>
          <div className="flex flex-col gap-5">
            <p className="text-[1.5rem]">
              The BB84 protocol is a quantum key distribution (QKD) method
              proposed by Charles H. Bennett and Gilles Brassard in 1984. It is
              the first and most widely known quantum cryptographic protocol
              that enables two parties to securely generate a shared secret key
              using the principles of quantum mechanics.
            </p>
            <p className="text-[1.5rem]">
              Unlike classical cryptographic systems, whose security depends on
              computational complexity, BB84 provides information-theoretic
              security based on the laws of quantum physics. It uses four
              quantum states encoded in two different bases to ensure secure
              communication.
            </p>
            <p className="text-[1.5rem]">
              The protocol’s security relies on fundamental quantum principles
              such as the no-cloning theorem, measurement-induced disturbance,
              and the intrinsic randomness of quantum measurements, making any
              eavesdropping attempt detectable.
            </p>
            <p className="text-[1.5rem]">
              The BB84 protocol works by encoding classical bits into quantum
              states using two different bases and transmitting them over a
              quantum channel. The receiver measures the incoming qubits using
              randomly chosen bases, and only the matching results are used to
              generate a secure key
            </p>
          </div>
        </div>

        <div className="info-card ">
          <h3 className="info-title">How It Works</h3>

          <div className="flex justify-between  ml-10 relative ">
            <div className="w-full lg:flex-1 relative left-10">
              <ol className="list-decimal relative flex flex-col gap-7 text-[1.8rem]">
                {" "}
                <li>
                  {" "}
                  <h4 className="font-bold text-[1.8rem]">
                    State Preparation
                  </h4>{" "}
                  <p className="text-[1.5rem]">
                    The sender encodes bits using two bases:{" "}
                  </p>{" "}
                  <ul className="flex flex-col gap-5 list-disc ml-8 relative left-10 text-[1.5rem]">
                    {" "}
                    <li>
                      <dl>
                        <dt>Z-basis (rectilinear):</dt>
                        <dd>Bit 0 → Horizontal polarization (|0⟩)</dd>
                        <dd>Bit 1 → Vertical polarization (|1⟩)</dd>
                      </dl>{" "}
                    </li>{" "}
                    <li>
                      <dl>
                        <dt>X-basis (diagonal):</dt>
                        <dd>Bit 0 → |+⟩ (45° polarization)</dd>
                        <dd>Bit 1 → |−⟩ (135° polarization)</dd>
                      </dl>{" "}
                    </li>{" "}
                  </ul>{" "}
                </li>{" "}
                <li>
                  {" "}
                  <h4 className="font-bold text-[1.8rem]">
                    Quantum Transmission
                  </h4>{" "}
                  <p className="text-[1.5rem]">
                    The encoded quantum states (photons) are transmitted to the
                    receiver over a quantum channel.
                  </p>{" "}
                </li>{" "}
                <li>
                  {" "}
                  <h4 className="font-bold text-[1.8rem]">Measurement</h4>{" "}
                  <p className="text-[1.5rem]">
                    The receiver randomly selects a basis (Z or X) to measure
                    each incoming photon.
                  </p>{" "}
                </li>{" "}
                <li>
                  {" "}
                  <h4 className="font-bold text-[1.8rem]">
                    {" "}
                    Basis Matching{" "}
                  </h4>{" "}
                  <p className="text-[1.5rem]">
                    After transmission, both parties publicly compare their
                    chosen bases (not the bit values).
                  </p>{" "}
                </li>{" "}
                <li>
                  {" "}
                  <h4 className="font-bold text-[1.8rem]">Key Shift</h4>{" "}
                  <p className="text-[1.5rem]">
                    Only the bits where the sender’s and receiver’s bases match
                    are retained. These form the sifted key.{" "}
                  </p>{" "}
                </li>{" "}
                <li>
                  {" "}
                  <h4 className="font-bold text-[1.8rem]">
                    Error Checking (QBER)
                  </h4>{" "}
                  <p className="text-[1.5rem] ">
                    {" "}
                    A subset of the key is compared to calculate the Quantum Bit
                    Error Rate (QBER):{" "}
                  </p>{" "}
                  <ul className="list-disc list-outside ml-8 relative left-10 text-[1.5rem]">
                    {" "}
                    <li>Low QBER → secure communication</li>{" "}
                    <li>
                      High QBER → possible eavesdropping, communication
                      aborted{" "}
                    </li>{" "}
                  </ul>{" "}
                </li>{" "}
                <li>
                  {" "}
                  <h4 className="font-bold text-[1.8rem]">
                    Key Generation
                  </h4>{" "}
                  <p className="text-[1.5rem]">
                    After error correction and privacy amplification, a final
                    secure key is produced.{" "}
                  </p>{" "}
                </li>{" "}
              </ol>
            </div>
            <div className="flex-[1r] h-full sticky top-5">
              <img
                src="image/BB84.png"
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
              <ul className="list-disc list-outside relative flex flex-col gap-7 text-[1.8rem]">
                {" "}
                <li>
                  {" "}
                  <h4 className="font-bold text-[1.8rem]">
                    Uses Two Bases and Four Quantum States
                  </h4>{" "}
                  <p className="text-[1.5rem] ">
                    {" "}
                    Employs Z-basis and X-basis for encoding using four states:
                    |0⟩, |1⟩, |+⟩, |−⟩{" "}
                  </p>{" "}
                </li>{" "}
                <li>
                  {" "}
                  <h4 className="font-bold text-[1.8rem]">
                    Information-Theoretic Security
                  </h4>{" "}
                  <p className="text-[1.5rem] ">
                    {" "}
                    Security is guaranteed by quantum mechanics, not computational assumptions
                    {" "}
                  </p>{" "}
                </li>{" "}
                 <li>
                  {" "}
                  <h4 className="font-bold text-[1.8rem]">
                    Eavesdropping Detection
                  </h4>{" "}
                  <p className="text-[1.5rem] ">
                    {" "}Any interception introduces detectable errors due to measurement disturbance
                    
                    {" "}
                  </p>{" "}
                </li>{" "}
                 <li>
                  {" "}
                  <h4 className="font-bold text-[1.8rem]">
                   Basis Randomization
                  </h4>{" "}
                  <p className="text-[1.5rem] ">
                    {" "}
                   Random selection of bases ensures unpredictability and prevents deterministic attacks
                    {" "}
                  </p>{" "}
                </li>{" "}
                 <li>
                  {" "}
                  <h4 className="font-bold text-[1.8rem]">
                    Measurement-Induced Disturbance
                  </h4>{" "}
                  <p className="text-[1.5rem] ">
                    {" "}
                    Measuring quantum states alters them, revealing the presence of an eavesdropper
                    {" "}
                  </p>{" "}
                </li>{" "}
                 <li>
                  {" "}
                  <h4 className="font-bold text-[1.8rem]">
                    No-Cloning Protection
                  </h4>{" "}
                  <p className="text-[1.5rem] ">
                    {" "}
                    Quantum states cannot be copied, preventing duplication of transmitted information.
                    {" "}
                  </p>{" "}
                </li>{" "}
                 <li>
                  {" "}
                  <h4 className="font-bold text-[1.8rem]">
                    Quantum Bit Error Rate (QBER) Monitoring
                  </h4>{" "}
                  <dl className="text-[1.5rem] ">
                    <dt>Security is verified using QBER</dt>
                    <dd >If QBER ≤ 11% → secure key generation</dd>
                    <dd >If QBER > 11% → communication is aborted</dd>
                  </dl>{" "}
                </li>{" "}
                 <li>
                  {" "}
                  <h4 className="font-bold text-[1.8rem]">
                    Combination of Quantum and Classical Channels
                  </h4>{" "}
                  <p className="text-[1.5rem] ">
                    {" "}
                    Uses a quantum channel for transmission and a classical channel for basis comparison
                    {" "}
                  </p>{" "}
                </li>{" "}
                 <li>
                  {" "}
                  <h4 className="font-bold text-[1.8rem]">
                    Foundation of Modern Quantum Cryptography
                  </h4>{" "}
                  <p className="text-[1.5rem] ">
                    {" "}
                    Serves as the basis for many advanced QKD protocols and real-world quantum communication systems
                    {" "}
                  </p>{" "}
                </li>{" "}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="nav">
        <button
          className="nav-btn"
          onClick={() => navigate("/bb84_simulation")}
        >
          View BB84 Simulation
        </button>
      </div>
    </div>
  );
}
