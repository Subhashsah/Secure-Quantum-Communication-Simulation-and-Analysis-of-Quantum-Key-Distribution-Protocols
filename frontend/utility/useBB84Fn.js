import { useCallback, useEffect, useRef, useState } from "react";
import { runBB84 } from "../src/api/bb84";
export function useBB84Fn() {
  const [bits, setBits] = useState(10);
  const [noise, setNoise] = useState(0.0);
  const [eve, setEve] = useState(0.0);
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
      const data = await runBB84(
        { bits, noise, eve },
        { signal: controller.signal },
      );
      if (!controller.signal.aborted && requestIdRef.current === requestId) {
        setResult(data);
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Simulation error:", error);
      }
    } finally {
      if (requestIdRef.current === requestId) {
        setLoading(false);
        abortControllerRef.current = null;
      }
    }
  };

  const updateBits = (value) => {
    cancelInFlight();
    setBits(value);
    setResult(null);
  };

  const updateNoise = (value) => {
    cancelInFlight();
    setNoise(value);
    setResult(null);
  };

  const updateEve = (value) => {
    cancelInFlight();
    setEve(value);
    setResult(null);
  };

  const handleReset = () => {
    cancelInFlight();
    setBits(10);
    setNoise(0.0);
    setEve(0.0);
    setResult(null);
  };

  return {
    result,
    loading,
    noise,
    bits,
    eve,
    setNoise: updateNoise,
    setBits: updateBits,
    setEve: updateEve,
    handleRun,
    handleReset,
  };
}
