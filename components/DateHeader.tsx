import { formatDateFull } from "@/lib/formatDate";
import { Anniversary, getTypeLabel } from "@/lib/getAnniversary";

interface DateHeaderProps {
  mmdd: string;
  anniversary: Anniversary;
}

export default function DateHeader({ mmdd, anniversary }: DateHeaderProps) {
  const dateStr = formatDateFull(mmdd);
  const lifeSpan =
    anniversary.born && anniversary.died
      ? `（${anniversary.born}–${anniversary.died}）`
      : "";

  return (
    <div className="text-center fade-in">
      <p className="text-sm text-sumi-light tracking-widest mb-2">
        {dateStr}
      </p>
      <h2 className="text-3xl font-semibold tracking-wider mb-3">
        今日は「{anniversary.title}」
      </h2>
      <p className="text-base text-sumi-light">
        <span className="inline-block px-2 py-0.5 text-xs border border-shu text-shu rounded mr-2">
          {getTypeLabel(anniversary.type)}
        </span>
        {anniversary.person}
        {lifeSpan}
      </p>
      <p className="mt-4 text-sm text-sumi-light leading-relaxed max-w-lg mx-auto">
        {anniversary.description}
      </p>
    </div>
  );
}
