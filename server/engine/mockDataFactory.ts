const names = ['Alice Chen', 'Liam Zhao', 'Mia Wang', 'Noah Liu', 'Emma Zhang'];
const status = ['Active', 'Pending', 'Disabled'];

export function buildTableMockData(rows = 6): Array<Record<string, string>> {
  return Array.from({ length: rows }).map((_, index) => ({
    username: names[index % names.length],
    status: status[index % status.length],
    created_time: `2026-03-${String((index % 9) + 10).padStart(2, '0')}`
  }));
}
