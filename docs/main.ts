function floorLog2(n: number): number {
  return Math.floor(Math.log2(n));
}

function calculateRange(from: number, to: number): [number, number][] {
  const results: [number, number][] = [];
  for (let i = from; i <= to; i++) {
    if (i > 0) {
      results.push([i, floorLog2(i)]);
    }
  }
  return results;
}

document.getElementById("calculate")!.addEventListener("click", () => {
  const from = Number((document.getElementById("from") as HTMLInputElement).value);
  const to = Number((document.getElementById("to") as HTMLInputElement).value);
  const tableBody = document.querySelector("#result tbody")!;
  tableBody.innerHTML = "";

  if (from > to || from < 1) {
    tableBody.innerHTML = `<tr><td colspan="2">Nieprawidłowy przedział</td></tr>`;
    return;
  }

  const results = calculateRange(from, to);
  for (const [i, h] of results) {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${i}</td><td>${h}</td>`;
    tableBody.appendChild(row);
  }
});
