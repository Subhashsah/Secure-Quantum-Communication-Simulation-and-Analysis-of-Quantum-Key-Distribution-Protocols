export async function runB92(params) {
  const response = await fetch("http://localhost:3000/api/b92/simulate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params)
  });
  return response.json();
}
