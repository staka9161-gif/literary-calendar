"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { getAdjacentDates } from "@/lib/getAnniversary";
import { formatDateJapanese } from "@/lib/formatDate";

interface DateNavProps {
  mmdd: string;
}

export default function DateNav({ mmdd }: DateNavProps) {
  const router = useRouter();
  const { prev, next } = getAdjacentDates(mmdd);

  const year = new Date().getFullYear();
  const dateValue = `${year}-${mmdd}`;

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value) return;
    const date = new Date(value);
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    router.push(`/d/${mm}-${dd}`);
  };

  return (
    <nav className="flex items-center justify-between max-w-md mx-auto mt-8 pt-6 border-t border-shu/20">
      <Link
        href={`/d/${prev}`}
        className="text-sm text-sumi-light hover:text-shu transition-colors"
      >
        ← {formatDateJapanese(prev)}
      </Link>

      {/* PC: 通常のdate input */}
      <input
        type="date"
        value={dateValue}
        onChange={handleDateChange}
        className="hidden md:block text-sm"
        aria-label="日付を選択"
      />

      {/* スマホ: テキスト表示 + 透明date inputオーバーレイ */}
      <div className="relative inline-flex items-center justify-center border border-shu/40 rounded px-3 py-1 md:hidden">
        <span className="text-sm text-shu pointer-events-none">
          日付選択
        </span>
        <input
          type="date"
          value={dateValue}
          onChange={handleDateChange}
          aria-label="日付を選択"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            opacity: 0,
            cursor: "pointer",
          }}
        />
      </div>

      <Link
        href={`/d/${next}`}
        className="text-sm text-sumi-light hover:text-shu transition-colors"
      >
        {formatDateJapanese(next)} →
      </Link>
    </nav>
  );
}
