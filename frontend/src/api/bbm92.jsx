export async function runBBM92(params) {
  const response = await fetch("http://localhost:3000/api/bbm92/simulate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params)
  });
  if (!response.ok) {
    throw new Error("BBM92 simulation failed");
  }
  return response.json();
}
