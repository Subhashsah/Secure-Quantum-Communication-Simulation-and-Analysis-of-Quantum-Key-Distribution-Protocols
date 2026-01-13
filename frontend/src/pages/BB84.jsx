import { useState } from "react";
import { runBB84 } from "../api/bb84";

export default function BB84() {
  const [bits, setBits] = useState(100);
  const [noise, setNoise] = useState(0.0);
  const [eve, setEve] = useState(0.0);
  const [result, setResult] = useState(null);

  const handleRun = async () => {
    const data = await runBB84({ bits, noise, eve });
    setResult(data);
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">BB84 Simulator</h1>

      <label className="block mb-2">Number of bits</label>
      <input type="number" value={bits} onChange={e => setBits(e.target.value)}
        className="w-full p-2 border mb-4"/>

      <label className="block mb-2">Noise (0–1)</label>
      <input type="number" step="0.01" value={noise}
        onChange={e => setNoise(e.target.value)}
        className="w-full p-2 border mb-4"/>

      <label className="block mb-2">Eavesdropper probability (0–1)</label>
      <input type="number" step="0.01" value={eve}
        onChange={e => setEve(e.target.value)}
        className="w-full p-2 border mb-4"/>

      <button onClick={handleRun}
        className="bg-blue-600 text-white px-4 py-2 rounded">
        Run Simulation
      </button>

      {result && (
        <div className="mt-6 p-4 border rounded">
          <p><strong>Sifted bits:</strong> {result.sifted_bits}</p>
          <p><strong>Errors:</strong> {result.errors}</p>
          <p><strong>QBER:</strong> {result.qber}</p>
        </div>
      )}
    </div>
  );
}
