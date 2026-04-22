import { RelatedWork } from "@/lib/getAnniversary";

interface ExcerptProps {
  work: RelatedWork;
}

export default function Excerpt({ work }: ExcerptProps) {
  return (
    <div className="fade-in-delay">
      <div className="bg-white/50 rounded-lg p-6 md:p-8 border border-kinari-dark">
        <div className="leading-[2] tracking-wide">
          <p className="whitespace-pre-line text-base md:text-lg">
            {work.excerpt}
          </p>
        </div>
      </div>

      <div className="mt-4 text-right">
        <p className="text-sm text-sumi-light">
          ── 『{work.title}』より
        </p>
        <p className="text-xs text-sumi-light mt-1">{work.excerptSource}</p>
      </div>

      <div className="mt-4 text-center">
        <a
          href={work.aozoraUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-5 py-2.5 text-sm text-shu border border-shu rounded hover:bg-shu hover:text-kinari transition-colors"
        >
          青空文庫で全文を読む →
        </a>
      </div>
    </div>
  );
}
