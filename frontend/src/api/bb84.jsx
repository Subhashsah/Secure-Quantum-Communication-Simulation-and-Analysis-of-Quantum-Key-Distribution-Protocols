const API_URL = import.meta.env.VITE_API_URL;

console.log(API_URL);

export async function runBB84(params, options = {}) {
  const response = await fetch(`${API_URL}/api/bb84/simulate`, {
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
