export async function runE91(params, options = {}) {
  const response = await fetch("http://localhost:4000/api/e91/simulate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
    signal: options.signal,
  });
  if (!response.ok) {
    throw new Error("E91 simulation failed");
  }
  return response.json();
}
