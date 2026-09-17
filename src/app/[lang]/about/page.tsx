import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getDictionary, localePath } from "@/lib/i18n";
import { isLocale } from "@/lib/i18n/config";

type Params = PageProps<"/[lang]/about">;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);
  return { title: dict.about.title, description: dict.about.metaDescription };
}

export default async function AboutPage({ params }: Params) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const t = dict.about;

  return (
    <>
      <section className="border-b border-line bg-sand">
        <div className="container-page py-16 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-brand uppercase">
              {t.eyebrow}
            </p>
            <h1 className="mt-2 max-w-3xl font-display text-4xl font-semibold sm:text-5xl">
              {t.heading}
            </h1>
            <p className="mt-5 max-w-2xl text-ink-soft">{t.intro}</p>
          </div>
          <div className="shrink-0 self-start md:self-center">
            <div className="rounded-2xl border border-line bg-white p-4 shadow-sm">
              <Image
                src="/assets/logo-trimmed.png"
                alt="SRAW Products Pvt. Ltd."
                width={200}
                height={91}
                className="h-16 w-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Brand Imagery: Slide 1 & Slide 9 */}
      <section className="container-page py-12">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="relative aspect-[16/10] overflow-hidden rounded-card border border-line shadow-sm">
            <Image
              src="/assets/Slide 1.jpg"
              alt="Sri Kanth Agarbatti Range & Heritage"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent flex items-end p-6">
              <p className="text-white font-display text-lg font-semibold drop-shadow">
                {lang === "hi" ? "आपकी हर पूजा का साथी" : "Your Devotional Companion in Every Pooja"}
              </p>
            </div>
          </div>

          <div className="relative aspect-[16/10] overflow-hidden rounded-card border border-line shadow-sm">
            <Image
              src="/assets/Slide 9.jpg"
              alt="Neelkanth 4-in-1 Kedarnath Temple Heritage"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent flex items-end p-6">
              <p className="text-white font-display text-lg font-semibold drop-shadow">
                {lang === "hi" ? "नीलकंठ — पवित्र केदारनाथ धाम से प्रेरित सुगंध" : "Neelkanth — Fragrance Inspired by Sacred Kedarnath"}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page grid gap-12 pb-16 lg:grid-cols-[1.3fr_1fr]">
        <div className="space-y-4 text-ink-soft">
          <p>{t.body1}</p>
          <p>{t.body2}</p>
          <p>{t.body3}</p>
          <div className="pt-2">
            <Link
              href={localePath(lang, "/dealership")}
              className="inline-block rounded-lg bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
            >
              {t.cta}
            </Link>
          </div>
        </div>

        <div className="rounded-card border border-line bg-white p-7">
          <h2 className="font-display text-xl font-semibold">{t.capabilitiesTitle}</h2>
          <ul className="mt-5 space-y-2.5 text-sm text-ink-soft">
            {t.capabilities.map((c) => (
              <li key={c} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-y border-line bg-sand py-16">
        <div className="container-page">
          <h2 className="font-display text-3xl font-semibold">{t.timelineTitle}</h2>
          <ol className="stagger mt-10 grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {t.timeline.map((item) => (
              <li key={item.year} className="bg-white p-7">
                <span className="font-display text-sm font-semibold text-brand">
                  {item.year}
                </span>
                <h3 className="mt-3 font-display text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-ink-soft">{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
