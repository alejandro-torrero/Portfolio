export function contributionsToGrid(contributions) {
  if (!contributions?.length) return [];

  const weeks = Array.from({ length: 7 }, () => []);
  const [fy, fm, fd] = contributions[0].date.split("-").map(Number);
  const firstDow = new Date(Date.UTC(fy, fm - 1, fd)).getUTCDay();

  for (let row = 0; row < firstDow; row++) {
    weeks[row].push(null);
  }

  for (const day of contributions) {
    const [y, m, d] = day.date.split("-").map(Number);
    const date = new Date(Date.UTC(y, m - 1, d));
    const dow = date.getUTCDay();
    const month = date.toLocaleString("en-US", { month: "short", timeZone: "UTC" });
    weeks[dow].push({
      count: day.count ?? 0,
      level: day.level ?? 0,
      month,
      date: day.date,
    });
  }

  const maxCols = Math.max(...weeks.map((row) => row.length));
  for (const row of weeks) {
    while (row.length < maxCols) row.push(null);
  }

  return weeks;
}
