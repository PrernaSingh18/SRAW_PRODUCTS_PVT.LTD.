import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Noto_Sans, Noto_Sans_Devanagari } from "next/font/google";
import "../globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { isLocale, locales } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n";

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const notoDevanagari = Noto_Sans_Devanagari({
  variable: "--font-noto-devanagari",
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);

  return {
    title: { default: dict.meta.titleDefault, template: dict.meta.titleTemplate },
    description: dict.meta.description,
    alternates: {
      canonical: `/${lang}`,
      languages: { en: "/en", hi: "/hi" },
    },
  };
}

export default async function RootLayout({ params, children }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <html
      lang={lang}
      className={`${notoSans.variable} ${notoDevanagari.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white">
        <SiteHeader locale={lang} dict={dict} />
        <main className="flex-1">{children}</main>
        <SiteFooter locale={lang} dict={dict} />
      </body>
    </html>
  );
}
