import Link from "next/link";
import { getAnniversary } from "@/lib/getAnniversary";

interface MonthCalendarProps {
  month: number; // 1-12
}

const WEEKDAY_LABELS = ["日", "月", "火", "水", "木", "金", "土"];

export default function MonthCalendar({ month }: MonthCalendarProps) {
  // Use 2024 (leap year) so Feb 29 works
  const year = 2024;
  const daysInMonth = new Date(year, month, 0).getDate();
  const firstDayOfWeek = new Date(year, month - 1, 1).getDay(); // 0=Sun

  // Build calendar grid cells
  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDayOfWeek; i++) {
    cells.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(d);
  }

  return (
    <div className="fade-in">
      {/* Weekday headers */}
      <div className="grid grid-cols-7 text-center text-xs text-sumi-light mb-1">
        {WEEKDAY_LABELS.map((label, i) => (
          <div
            key={label}
            className={`py-1 ${i === 0 ? "text-shu" : i === 6 ? "text-blue-600" : ""}`}
          >
            {label}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-px bg-kinari-dark/50 border border-kinari-dark rounded-lg overflow-hidden">
        {cells.map((day, idx) => {
          if (day === null) {
            return <div key={`empty-${idx}`} className="bg-kinari/50 p-1 min-h-[72px]" />;
          }

          const mm = String(month).padStart(2, "0");
          const dd = String(day).padStart(2, "0");
          const mmdd = `${mm}-${dd}`;
          const anniversaries = getAnniversary(mmdd);
          const dayOfWeek = (firstDayOfWeek + day - 1) % 7;
          const isSunday = dayOfWeek === 0;
          const isSaturday = dayOfWeek === 6;

          if (anniversaries && anniversaries.length > 0) {
            return (
              <Link
                key={day}
                href={`/d/${mmdd}`}
                className="bg-white/80 p-1.5 min-h-[72px] hover:bg-shu/5 transition-colors group block"
              >
                <span
                  className={`text-xs font-semibold ${isSunday ? "text-shu" : isSaturday ? "text-blue-600" : "text-sumi"}`}
                >
                  {day}
                </span>
                {anniversaries.map((a) => (
                  <div
                    key={a.id}
                    className="mt-0.5 text-[10px] leading-tight text-shu/80 group-hover:text-shu truncate"
                    title={a.title}
                  >
                    {a.title}
                  </div>
                ))}
              </Link>
            );
          }

          return (
            <Link
              key={day}
              href={`/d/${mmdd}`}
              className="bg-kinari/50 p-1.5 min-h-[72px] hover:bg-white/60 transition-colors block"
            >
              <span
                className={`text-xs ${isSunday ? "text-shu/60" : isSaturday ? "text-blue-600/60" : "text-sumi-light/60"}`}
              >
                {day}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
