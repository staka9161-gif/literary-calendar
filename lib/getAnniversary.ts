import anniversariesData from "@/data/anniversaries.json";

export interface RelatedWork {
  title: string;
  aozoraUrl: string;
  excerpt: string;
  excerptSource: string;
}

export interface Anniversary {
  id: string;
  title: string;
  type: "kinichi" | "tanjobi" | "hakkan" | "jiken";
  person: string;
  personReading: string;
  born?: number;
  died?: number;
  description: string;
  relatedWork: RelatedWork;
  tags: string[];
}

type AnniversariesMap = Record<string, Anniversary[]>;

const anniversaries = anniversariesData as AnniversariesMap;

export function getAnniversary(mmdd: string): Anniversary[] | null {
  return anniversaries[mmdd] ?? null;
}

export function getAllDates(): string[] {
  return Object.keys(anniversaries).sort();
}

export function getTypeLabel(type: Anniversary["type"]): string {
  const labels: Record<Anniversary["type"], string> = {
    kinichi: "忌日",
    tanjobi: "誕生日",
    hakkan: "作品発表日",
    jiken: "文学史的事件",
  };
  return labels[type];
}

export function getAdjacentDates(mmdd: string): {
  prev: string;
  next: string;
} {
  const [month, day] = mmdd.split("-").map(Number);
  const date = new Date(2024, month - 1, day); // 2024 is a leap year

  const prevDate = new Date(date);
  prevDate.setDate(prevDate.getDate() - 1);

  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + 1);

  const format = (d: Date) =>
    `${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

  return {
    prev: format(prevDate),
    next: format(nextDate),
  };
}

export function findNearestDates(mmdd: string, count: number = 3): string[] {
  const allDates = getAllDates();
  if (allDates.length === 0) return [];

  // Sort by distance from target date
  const [targetMonth, targetDay] = mmdd.split("-").map(Number);
  const targetDayOfYear = targetMonth * 31 + targetDay;

  return allDates
    .map((date) => {
      const [m, d] = date.split("-").map(Number);
      const dayOfYear = m * 31 + d;
      const distance = Math.abs(dayOfYear - targetDayOfYear);
      return { date, distance };
    })
    .sort((a, b) => a.distance - b.distance)
    .slice(0, count)
    .map((item) => item.date);
}
