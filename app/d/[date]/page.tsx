import { Metadata } from "next";
import { notFound } from "next/navigation";
import DateHeader from "@/components/DateHeader";
import Excerpt from "@/components/Excerpt";
import DateNav from "@/components/DateNav";
import {
  getAnniversary,
  getAllDates,
  findNearestDates,
} from "@/lib/getAnniversary";
import { isValidMMDD, formatDateJapanese } from "@/lib/formatDate";
import Link from "next/link";

interface PageProps {
  params: Promise<{ date: string }>;
}

export async function generateStaticParams() {
  // Generate all 366 days (including leap year Feb 29)
  const params: { date: string }[] = [];
  for (let month = 1; month <= 12; month++) {
    const daysInMonth = new Date(2024, month, 0).getDate();
    for (let day = 1; day <= daysInMonth; day++) {
      const mm = String(month).padStart(2, "0");
      const dd = String(day).padStart(2, "0");
      params.push({ date: `${mm}-${dd}` });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { date } = await params;
  const anniversaries = getAnniversary(date);
  const dateStr = formatDateJapanese(date);

  if (anniversaries && anniversaries.length > 0) {
    const a = anniversaries[0];
    return {
      title: `${dateStr} ${a.title}`,
      description: `${dateStr}は${a.title}。${a.description}`,
    };
  }

  return {
    title: `${dateStr}`,
    description: `${dateStr}の文学カレンダー`,
  };
}

export default async function DatePage({ params }: PageProps) {
  const { date } = await params;

  if (!isValidMMDD(date)) {
    notFound();
  }

  const anniversaries = getAnniversary(date);

  if (!anniversaries || anniversaries.length === 0) {
    // Fallback: show nearest dates
    const nearest = findNearestDates(date, 5);
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <p className="text-sm text-sumi-light tracking-widest mb-4">
          {formatDateJapanese(date)}
        </p>
        <h2 className="text-2xl font-semibold mb-6">
          この日の記念日はまだ登録されていません
        </h2>
        <div className="mt-8">
          <p className="text-sm text-sumi-light mb-4">
            近い日付の記念日：
          </p>
          <ul className="space-y-2">
            {nearest.map((d) => {
              const a = getAnniversary(d);
              if (!a) return null;
              return (
                <li key={d}>
                  <Link
                    href={`/d/${d}`}
                    className="text-shu hover:underline"
                  >
                    {formatDateJapanese(d)} ── {a[0].title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <DateNav mmdd={date} />
      </div>
    );
  }

  const anniversary = anniversaries[0];

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <DateHeader mmdd={date} anniversary={anniversary} />

      <div className="my-8 flex justify-center">
        <div className="w-16 h-px bg-shu/40"></div>
      </div>

      <Excerpt work={anniversary.relatedWork} />

      <DateNav mmdd={date} />
    </div>
  );
}
