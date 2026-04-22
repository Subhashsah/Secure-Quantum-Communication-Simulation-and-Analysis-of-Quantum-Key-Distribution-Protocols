export async function runBB84(params, options = {}) {
  const response = await fetch("http://localhost:4000/api/bb84/simulate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
    signal: options.signal,
  });
  if (!response.ok) {
    throw new Error("BB84 simulation failed");
  }
  return response.json();
}
