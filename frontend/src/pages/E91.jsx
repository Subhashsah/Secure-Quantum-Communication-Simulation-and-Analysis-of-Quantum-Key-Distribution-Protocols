import { useNavigate } from "react-router-dom";
import "../styles/E91.css";

export default function E91() {
  const navigate = useNavigate();

  return (
    <div className="e91-container">
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

      <header className="e91-header">
        <button className="back-button" onClick={() => navigate("/")}>
          <span>←</span> Back
        </button>
        <div className="header-content">
          <h1 className="e91-title">E91 Quantum Key Distribution Protocol</h1>
          <p className="e91-subtitle">
            Entanglement-based QKD with CHSH Bell test
          </p>
        </div>
      </header>

            {/* Information Panel */}
      <div className="info-panel">
        <div className="info-card">
          <h3 className="info-title">About B92</h3>
          <div className="flex flex-col gap-5">
            <p className="text-[1.5rem]">
              The E91 protocol is an entanglement-based Quantum Key Distribution (QKD) method proposed by Artur Ekert in 1991. It enables two distant parties (Sender and Receiver) to generate a secure shared cryptographic key using the principles of quantum entanglement.
            </p>
            <p className="text-[1.5rem]">
              Unlike BB84 and B92 protocols, E91 does not rely solely on disturbance detection. Instead, its security is fundamentally guaranteed by the violation of Bell inequalities, which confirms the presence of genuine quantum correlations that cannot be explained by classical physics. 
            </p>
            <p className="text-[1.5rem]">
              The E91 protocol operates by distributing entangled photon pairs between two parties. Each party independently measures their photon using randomly chosen measurement bases.
            </p>
          </div>
        </div>

        <div className="info-card ">
          <h3 className="info-title">How It Works</h3>

          <div className="flex justify-between gap-10 relative">
            <div className="w-full lg:flex-1 relative ">
              <div className="relative flex flex-col gap-7 text-[1.8rem]">
                {" "}
                 <div>
                   <p className="font-normal text-[1.5rem]">
                    The protocol works through the following core process:
                  </p>{" "}
                  <ul className="flex flex-col gap-1 list-disc ml-8 relative left-10 text-[1.5rem]">
                    {" "}
                    <li>A quantum source generates entangled photon pairs and sends one photon to each party. </li>
                    <li>Both Sender and Receiver randomly choose measurement bases and record outcomes. </li>
                    <li>They publicly share only their measurement bases (not outcomes). </li>
                    <li>
                      <dl>
                        <dt>The collected data is divided into: </dt>
                        <dd><span className = "font-bold">Key-generation rounds</span> (used to form the secret key) </dd>
                        <dd><span className = "font-bold">Bell-test rounds </span> (used to verify security)  </dd>
                  
                      </dl>{" "}
                    </li>{" "}
                  </ul>{" "}
                 </div>
                 <p className = "block text-[1.5rem]">
                  Security is verified using the Bell–CHSH inequality, which measures the strength of quantum correlations. If the measured value exceeds the classical bound, it confirms the presence of entanglement and guarantees security.
                 </p>
                 <div>
                  <p className = "block text-[1.5rem]">Additionally, the Quantum Bit Error Rate (QBER) is used to evaluate the quality of the generated key. The protocol proceeds only if:</p>
                  <ul className="flex flex-col gap-1 list-disc ml-8 relative left-10 text-[1.5rem]">
                    {" "}
                    <li>Bell inequality is violated (|S| &gt; 2), and  </li>
                    <li>QBER is below an acceptable threshold. </li>
                  </ul>{" "}
                 </div>
                 <p className = "block text-[1.5rem]">If these conditions are not met, the protocol is aborted to ensure security. </p>
              </div>
            </div>
            <div className="flex-[1r] h-full sticky top-5">
              <img
                src="image/E91.png"
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
              <ul className="list-disc relative flex flex-col gap-7 text-[1.8rem]">
                {" "}
                <li>
                  {" "}
                  <dl>                  
                    <dt className="font-bold text-[1.8rem]">
                    Uses Two Bases and Four Quantum States
                    </dt>{" "}
                    <dd className="text-[1.5rem] ">
                    {" "}
                    Security is derived from quantum entanglement rather than simple disturbance detection. 
                    </dd>{" "}
                    </dl>
                </li>{" "}
                <li>
                  {" "}
                                   <dl>                  
                    <dt className="font-bold text-[1.8rem]">
                    Bell Inequality Verification (CHSH Test)
                    </dt>{" "}
                    <dd className="text-[1.5rem] ">
                    {" "}
                    Uses Bell–CHSH inequality to certify true quantum correlations and detect eavesdropping. 
                    </dd>{" "}
                    </dl>{" "}
                </li>{" "}
                 <li>
                  {" "}
                  <dl>                  
                    <dt className="font-bold text-[1.8rem]">
                    Device-Independent Security Foundation
                    </dt>{" "}
                    <dd className="text-[1.5rem] ">
                    {" "}
                    Security does not rely heavily on trusting the internal workings of devices. 
                    </dd>{" "}
                    </dl>{" "}
                </li>{" "}
                 <li>
                  {" "}
                  <dl>                  
                    <dt className="font-bold text-[1.8rem]">
                    Separation of Security and Key Quality 
                    </dt>{" "}
                    <dd className="text-[1.5rem] ">
                    {" "}
                    <ul className="flex flex-col gap-1 list-disc ml-8 relative left-10 text-[1.5rem]">
                      <li>CHSH value (S) → certifies security </li>
                      <li>QBER → determines key quality and rate </li>
                    </ul>
                    </dd>{" "}
                    </dl>{" "}
                </li>{" "}
                 <li>
                  {" "}
                  <dl>                  
                    <dt className="font-bold text-[1.8rem]">
                    Use of Bell States
                    </dt>{" "}
                    <dd className="text-[1.5rem] ">
                    {" "}
                    Employs maximally entangled states (e.g., Φ⁺) for strong quantum correlations. 
                    </dd>{" "}
                    </dl>{" "}
                </li>{" "}
                 <li>
                  {" "}
                  <dl>                  
                    <dt className="font-bold text-[1.8rem]">
                    Bell-Test Fraction (Bell Ratio)
                    </dt>{" "}
                    <dd className="text-[1.5rem] ">
                    {" "}
                    A portion of photon pairs is sacrificed to verify security, ensuring robustness against attacks. 
                    </dd>{" "}
                    </dl>{" "}
                </li>{" "}
                 <li>
                  {" "}
                  <dl>                  
                    <dt className="font-bold text-[1.8rem]">
                    Eavesdropper Detection (Eve Model)
                    </dt>{" "}
                    <dd className="text-[1.5rem] ">
                    {" "}
                    Detects eavesdropping through: 
                    </dd>{" "}
                    <ul className="flex flex-col gap-1 list-disc ml-8 relative left-10 text-[1.5rem]">
                      <li>Reduction in CHSH value (loss of entanglement) </li>
                      <li>Increase in QBER  </li>
                    </ul>
                    </dl>{" "}
                </li>{" "}
                 <li>
                  {" "}
                  <dl>                  
                    <dt className="font-bold text-[1.8rem]">
                    Random Measurement Bases
                    </dt>{" "}
                    <dd className="text-[1.5rem] ">
                    {" "}
                    Sender and Receiver independently choose bases, ensuring unpredictability.  
                    </dd>{" "}
                    </dl>{" "}
                </li>{" "}
                 <li>
                  {" "}
                  <dl>                  
                    <dt className="font-bold text-[1.8rem]">
                    Protocol Abort Mechanism
                    </dt>{" "}
                    <dd className="text-[1.5rem] ">
                    {" "}
                    Automatically aborts if: 
                    </dd>{" "}
                    <ul className="flex flex-col gap-1 list-disc ml-8 relative left-10 text-[1.5rem]">
                      <li>No Bell violation is observed, or  </li>
                      <li>Error rate exceeds acceptable limits  </li>
                    </ul>
                    </dl>{" "}
                </li>{" "}
                 <li>
                  {" "}
                  <dl>                  
                    <dt className="font-bold text-[1.8rem]">
                    Physics-Based Security Guarantee
                    </dt>{" "}
                    <dd className="text-[1.5rem] ">
                    {" "}
                    Security is guaranteed by fundamental quantum mechanics, not computational assumptions.
                    </dd>{" "}
                    </dl>{" "}
                </li>{" "}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="nav">
        <button className="nav-btn" onClick={() => navigate("/e91_simulation")}>
          View E91 Simulation
        </button>
      </div>
    </div>
  );
}
