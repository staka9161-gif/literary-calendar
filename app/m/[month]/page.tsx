import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAnniversary, getAllDates, getTypeLabel } from "@/lib/getAnniversary";
import { formatDateJapanese } from "@/lib/formatDate";
import MonthCalendar from "@/components/MonthCalendar";

interface PageProps {
  params: Promise<{ month: string }>;
}

const MONTH_NAMES = [
  "",
  "睦月",
  "如月",
  "弥生",
  "卯月",
  "皐月",
  "水無月",
  "文月",
  "葉月",
  "長月",
  "神無月",
  "霜月",
  "師走",
];

export async function generateStaticParams() {
  return Array.from({ length: 12 }, (_, i) => ({
    month: String(i + 1).padStart(2, "0"),
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { month } = await params;
  const monthNum = parseInt(month, 10);
  return {
    title: `${monthNum}月（${MONTH_NAMES[monthNum]}）の文学記念日`,
    description: `${monthNum}月の文学記念日一覧`,
  };
}

export default async function MonthPage({ params }: PageProps) {
  const { month } = await params;
  const monthNum = parseInt(month, 10);

  if (isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
    notFound();
  }

  const allDates = getAllDates();
  const monthDates = allDates.filter((d) => d.startsWith(month + "-"));

  const prevMonth = String(monthNum === 1 ? 12 : monthNum - 1).padStart(2, "0");
  const nextMonth = String(monthNum === 12 ? 1 : monthNum + 1).padStart(2, "0");

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-8 fade-in">
        <h2 className="text-3xl font-semibold tracking-wider">
          {monthNum}月
          <span className="text-lg text-sumi-light ml-2">
            {MONTH_NAMES[monthNum]}
          </span>
        </h2>
      </div>

      {/* Calendar navigation */}
      <nav className="flex items-center justify-between max-w-md mx-auto mb-6">
        <Link
          href={`/m/${prevMonth}`}
          className="text-sm text-sumi-light hover:text-shu transition-colors"
        >
          ← {parseInt(prevMonth, 10)}月
        </Link>
        <Link href="/" className="text-sm text-shu hover:underline">
          今日へ戻る
        </Link>
        <Link
          href={`/m/${nextMonth}`}
          className="text-sm text-sumi-light hover:text-shu transition-colors"
        >
          {parseInt(nextMonth, 10)}月 →
        </Link>
      </nav>

      {/* Monthly calendar grid */}
      <MonthCalendar month={monthNum} />

      {/* Event list */}
      {monthDates.length > 0 && (
        <div className="mt-10">
          <h3 className="text-sm text-sumi-light mb-4 text-center tracking-widest">
            この月の記念日
          </h3>
          <ul className="space-y-3 fade-in-delay">
            {monthDates.map((date) => {
              const anniversaries = getAnniversary(date);
              if (!anniversaries) return null;
              return anniversaries.map((a) => (
                <li key={a.id}>
                  <Link
                    href={`/d/${date}`}
                    className="block bg-white/50 border border-kinari-dark rounded-lg p-4 hover:border-shu/40 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-sm text-sumi-light">
                          {formatDateJapanese(date)}
                        </span>
                        <h3 className="text-lg font-semibold mt-1">
                          {a.title}
                        </h3>
                        <p className="text-sm text-sumi-light mt-1">
                          {a.person} ── 『{a.relatedWork.title}』
                        </p>
                      </div>
                      <span className="text-xs px-2 py-0.5 border border-shu text-shu rounded shrink-0 ml-3">
                        {getTypeLabel(a.type)}
                      </span>
                    </div>
                  </Link>
                </li>
              ));
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
