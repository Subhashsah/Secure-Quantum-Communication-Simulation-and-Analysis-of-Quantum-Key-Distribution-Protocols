export async function runB92(params, options = {}) {
  const response = await fetch("http://localhost:4000/api/b92/simulate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
    signal: options.signal,
  });
  if (!response.ok) {
    throw new Error("B92 simulation failed");
  }
  return response.json();
}
