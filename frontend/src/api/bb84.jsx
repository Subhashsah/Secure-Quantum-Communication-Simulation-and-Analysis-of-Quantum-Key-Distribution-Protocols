export async function runBB84(params) {
  const response = await fetch("http://localhost:3000/api/bb84/simulate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params)
  });
  return response.json();
}
