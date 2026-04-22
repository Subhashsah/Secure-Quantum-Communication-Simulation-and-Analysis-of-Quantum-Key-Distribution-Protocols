import { useCallback, useEffect, useRef, useState } from "react";
import { runE91 } from "../src/api/e91";
export function useE91Fn() {
  const [totalPairs, setTotalPairs] = useState(1000);
  const [noiseProb, setNoiseProb] = useState(0.0);
  const [eveProb, setEveProb] = useState(0.0);
  const [bellRatio, setBellRatio] = useState(0.2);
  const [eveMode, setEveMode] = useState("both");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const abortControllerRef = useRef(null);
  const requestIdRef = useRef(0);

  const cancelInFlight = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    return () => {
      cancelInFlight();
    };
  }, [cancelInFlight]);

  const handleRun = async () => {
    cancelInFlight();
    const controller = new AbortController();
    abortControllerRef.current = controller;
    const requestId = ++requestIdRef.current;
    setLoading(true);
    try {
      const data = await runE91(
        {
          total_pairs: totalPairs,
          noise_prob: noiseProb,
          eve_prob: eveProb,
          bell_ratio: bellRatio,
          eve_mode: eveMode,
        },
        { signal: controller.signal },
      );
      if (!controller.signal.aborted && requestIdRef.current === requestId) {
        setResult(data);
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Simulation error:", error);
        alert("Error running simulation: " + error.message);
      }
    } finally {
      if (requestIdRef.current === requestId) {
        setLoading(false);
        abortControllerRef.current = null;
      }
    }
  };

  const updateTotalPairs = (value) => {
    cancelInFlight();
    setTotalPairs(value);
    setResult(null);
  };

  const updateNoiseProb = (value) => {
    cancelInFlight();
    setNoiseProb(value);
    setResult(null);
  };

  const updateEveProb = (value) => {
    cancelInFlight();
    setEveProb(value);
    setResult(null);
  };

  const updateBellRatio = (value) => {
    cancelInFlight();
    setBellRatio(value);
    setResult(null);
  };

  const updateEveMode = (value) => {
    cancelInFlight();
    setEveMode(value);
    setResult(null);
  };

  const handleReset = () => {
    cancelInFlight();
    setTotalPairs(1000);
    setNoiseProb(0.0);
    setEveProb(0.0);
    setBellRatio(0.2);
    setEveMode("both");
    setResult(null);
  };

  return {
    totalPairs,
    setTotalPairs: updateTotalPairs,
    noiseProb,
    setNoiseProb: updateNoiseProb,
    eveProb,
    setEveProb: updateEveProb,
    bellRatio,
    setBellRatio: updateBellRatio,
    eveMode,
    setEveMode: updateEveMode,
    handleRun,
    loading,
    handleReset,
    result,
  };
}
