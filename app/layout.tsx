import type { Metadata } from "next";
import Script from "next/script";
import { Noto_Serif_JP, Shippori_Mincho } from "next/font/google";
import "./globals.css";

const GA_ID = "G-0KSXLWYPTV";

const notoSerifJP = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-noto-serif-jp",
  display: "swap",
});

const shipporiMincho = Shippori_Mincho({
  subsets: ["latin"],
  weight: ["400", "600", "800"],
  variable: "--font-shippori-mincho",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "今日の文学カレンダー",
    template: "%s | 今日の文学カレンダー",
  },
  description:
    "毎日ひとつ、日本近代文学の記念日と青空文庫の一節を届けるWebサイト",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${notoSerifJP.variable} ${shipporiMincho.variable} h-full`}
    >
      <body className="min-h-full flex flex-col font-[family-name:var(--font-shippori-mincho)]">
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
        <header className="flex items-center justify-between px-4 py-4 border-b border-shu/20">
          <a href="/" className="text-sumi hover:text-shu transition-colors">
            <h1 className="text-lg tracking-widest">今日の文学カレンダー</h1>
          </a>
          <nav className="flex items-center gap-4 text-sm text-sumi-light">
            <a
              href={`/m/${String(new Date().getMonth() + 1).padStart(2, "0")}`}
              className="hover:text-shu transition-colors"
            >
              月別一覧
            </a>
            <a
              href="https://buntomo.bunkare.jp"
              className="rounded-md bg-amber-600 px-3 py-1 text-white hover:bg-amber-700 transition-colors text-xs"
            >
              📖 文とも
            </a>
          </nav>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="text-center py-6 text-xs text-sumi-light border-t border-shu/20">
          <p>
            引用テキストは
            <a
              href="https://www.aozora.gr.jp/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-shu hover:underline"
            >
              青空文庫
            </a>
            より。著作権の消滅した作品のみを掲載しています。
          </p>
          <p className="mt-1">今日の文学カレンダー</p>
          <a
            href="https://buntomo.bunkare.jp"
            className="mt-2 inline-block rounded-md bg-amber-600 px-4 py-1.5 text-white hover:bg-amber-700 transition-colors text-xs"
          >
            📖 読書SNS「文とも」はこちら
          </a>
          <a
            href="https://metromonk.tokyo/tamanaka/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center justify-center gap-2.5 opacity-60 hover:opacity-90 transition-opacity"
          >
            <img
              src="/logo-raccoon.png"
              alt="多摩中読書倶楽部"
              className="h-9 w-9 mix-blend-multiply"
            />
            <span className="text-xs tracking-widest text-sumi-light">
              多摩中読書倶楽部
            </span>
          </a>
        </footer>
      </body>
    </html>
  );
}
