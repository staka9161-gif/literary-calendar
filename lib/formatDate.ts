const WEEKDAYS = ["日", "月", "火", "水", "木", "金", "土"];

export function formatDateJapanese(mmdd: string): string {
  const [month, day] = mmdd.split("-").map(Number);
  return `${month}月${day}日`;
}

export function formatDateFull(mmdd: string): string {
  const [month, day] = mmdd.split("-").map(Number);
  const now = new Date();
  const date = new Date(now.getFullYear(), month - 1, day);
  const weekday = WEEKDAYS[date.getDay()];
  return `${now.getFullYear()}年 ${month}月${day}日（${weekday}）`;
}

export function getTodayMMDD(): string {
  const now = new Date();
  return `${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

export function isValidMMDD(mmdd: string): boolean {
  if (!/^\d{2}-\d{2}$/.test(mmdd)) return false;
  const [month, day] = mmdd.split("-").map(Number);
  if (month < 1 || month > 12) return false;
  if (day < 1 || day > 31) return false;
  // Validate actual day count for the month (use leap year)
  const date = new Date(2024, month - 1, day);
  return date.getMonth() === month - 1 && date.getDate() === day;
}
