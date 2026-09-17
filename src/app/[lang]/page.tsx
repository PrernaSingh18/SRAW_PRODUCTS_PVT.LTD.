import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { HeroSlider } from "@/components/hero-slider";
import { FragranceFinder } from "@/components/fragrance-finder";
import { PoojaSanctuary3D } from "@/components/pooja-sanctuary-3d";
import { TestimonialsInteractive } from "@/components/testimonials-interactive";
import { products } from "@/lib/products";
import { format, getDictionary, localePath } from "@/lib/i18n";
import { isLocale } from "@/lib/i18n/config";
import { localizeProduct } from "@/lib/i18n/products-hi";
import { site } from "@/lib/site";

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const t = dict.home;

  const bestsellers = products
    .filter((p) => p.bestseller)
    .map((p) => localizeProduct(p, lang));

  return (
    <>
      {/* Interactive Hero Banner Slider showcasing Slides 1-9 */}
      <section className="border-b border-line">
        <HeroSlider lang={lang} dict={dict} />
      </section>

      {/* Brand Heritage & Trust Statistics */}
      <section className="border-b border-line bg-sand py-8">
        <div className="container-page flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1 text-xs font-semibold tracking-[0.16em] text-brand uppercase">
              {lang === "hi" ? site.trademarkHi : site.trademark}
            </span>
            <p className="mt-2 text-sm text-ink-soft">
              {t.heroBody}
            </p>
          </div>
          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-6 shrink-0 border-t md:border-t-0 md:border-l border-line pt-4 md:pt-0 md:pl-8">
            {t.stats.map((s) => (
              <div key={s.label}>
                <dt className="font-display text-2xl font-semibold text-brand">
                  {s.value}
                </dt>
                <dd className="mt-0.5 text-xs tracking-[0.12em] text-muted uppercase">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="overflow-hidden border-b border-line bg-ink py-3.5">
        <div className="flex w-max animate-marquee">
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex items-center" aria-hidden={copy === 1}>
              {t.marquee.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-8 px-8 text-xs font-semibold tracking-[0.2em] text-white/85 uppercase"
                >
                  {item}
                  <span className="h-1 w-1 rounded-full bg-brand" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </section>

      <section className="container-page py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-brand uppercase">
              {t.bestsellersEyebrow}
              {t.bestsellersAccent ? (
                <span className="font-hindi tracking-normal normal-case">
                  {" "}
                  · {t.bestsellersAccent}
                </span>
              ) : null}
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
              {t.bestsellersTitle}
            </h2>
          </div>
          <Link
            href={localePath(lang, "/shop")}
            className="text-sm font-semibold text-ink underline underline-offset-4 hover:text-brand"
          >
            {format(t.viewAll, { count: products.length })}
          </Link>
        </div>

        <div className="stagger mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {bestsellers.map((p) => (
            <ProductCard key={p.slug} product={p} locale={lang} dict={dict} />
          ))}
        </div>
      </section>

      {/* Interactive Pooja & Fragrance Ritual Finder */}
      <FragranceFinder locale={lang} dict={dict} />

      {/* Interactive 3D Pooja Sanctum & Incense Experience */}
      <PoojaSanctuary3D locale={lang} dict={dict} />

      <section className="border-y border-line bg-sand py-20">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-brand uppercase">
              {t.aboutEyebrow}
              {t.aboutAccent ? (
                <span className="font-hindi tracking-normal normal-case"> · {t.aboutAccent}</span>
              ) : null}
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
              {t.aboutTitle}
            </h2>
            <p className="mt-5 text-ink-soft">{t.aboutBody1}</p>
            <p className="mt-4 text-ink-soft">{t.aboutBody2}</p>
            <Link
              href={localePath(lang, "/about")}
              className="mt-7 inline-block rounded-lg border border-ink px-6 py-3 text-sm font-semibold transition-colors hover:bg-ink hover:text-white"
            >
              {t.aboutCta}
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {t.promises.map((p) => (
              <div key={p.title} className="rounded-card border border-line bg-white p-6">
                <h3 className="font-display text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm text-ink-soft">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-20">
        <p className="text-xs font-semibold tracking-[0.18em] text-brand uppercase">
          {t.stepsEyebrow}
          {t.stepsAccent ? (
            <span className="font-hindi tracking-normal normal-case"> · {t.stepsAccent}</span>
          ) : null}
        </p>
        <h2 className="mt-2 max-w-2xl font-display text-3xl font-semibold sm:text-4xl">
          {t.stepsTitle}
        </h2>
        <ol className="stagger mt-10 grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {t.steps.map((s) => (
            <li key={s.n} className="bg-white p-7">
              <span className="font-display text-sm font-semibold text-brand">{s.n}</span>
              <h3 className="mt-3 font-display text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-ink-soft">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-y border-line bg-sand py-20">
        <div className="container-page grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative aspect-[16/11] w-full overflow-hidden rounded-card border border-line bg-white shadow-sm">
            <Image
              src="/assets/Slide 6.jpg"
              alt="Sri Kanth Wholesale Master Cartons & Dhoop Boxes"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>

          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-brand uppercase">
              {t.bulkEyebrow}
              {t.bulkAccent ? (
                <span className="font-hindi tracking-normal normal-case"> · {t.bulkAccent}</span>
              ) : null}
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
              {t.bulkTitle}
            </h2>
            <p className="mt-4 text-ink-soft">{t.bulkBody}</p>

            <dl className="mt-8 grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-3">
              {t.bulkStats.map((item) => (
                <div key={item.v} className="bg-white p-5">
                  <dt className="font-display text-xl font-semibold text-brand">{item.k}</dt>
                  <dd className="mt-1 text-xs tracking-[0.12em] text-muted uppercase">
                    {item.v}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href={localePath(lang, "/bulk-order")}
                className="rounded-lg bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
              >
                {t.bulkCta}
              </Link>
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noreferrer noopener"
                className="rounded-lg border border-ink px-6 py-3 text-sm font-semibold transition-colors hover:bg-ink hover:text-white"
              >
                {t.bulkCtaAlt}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Customer Testimonials & Reviews */}
      <TestimonialsInteractive locale={lang} title={t.testimonialsTitle} />

      <section className="border-b border-line bg-ink py-16 text-center text-white">
        <div className="container-page">
          <p className="font-hindi text-2xl leading-relaxed sm:text-3xl">
            {t.shlokaTitle} <br className="hidden sm:block" />
            {t.shlokaTitle2}
          </p>
          <p className="mt-4 text-sm text-white/60">{t.shlokaSub}</p>
        </div>
      </section>

      <section className="container-page py-20">
        <div className="rounded-card border border-line bg-ink px-8 py-14 text-center text-white sm:px-14">
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-semibold sm:text-4xl">
            {t.ctaTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-white/75">{t.ctaBody}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href={localePath(lang, "/dealership")}
              className="rounded-lg bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
            >
              {t.ctaPrimary}
            </Link>
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noreferrer noopener"
              className="rounded-lg border border-white/30 px-6 py-3 text-sm font-semibold transition-colors hover:bg-white hover:text-ink"
            >
              {dict.common.whatsappUs}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
