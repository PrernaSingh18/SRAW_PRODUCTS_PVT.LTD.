import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { ProductArt } from "@/components/product-art";
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
  const hero = products.find((p) => p.slug === "chandan")!;

  return (
    <>
      <section className="border-b border-line bg-sand">
        <div className="container-page grid items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div className="animate-rise">
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1.5 text-xs font-semibold tracking-[0.16em] text-brand uppercase">
              {lang === "hi" ? site.trademarkHi : site.trademark}
            </span>
            <h1
              className={`mt-6 font-display text-4xl leading-[1.1] font-semibold sm:text-5xl lg:text-6xl ${
                lang === "hi" ? "font-hindi" : ""
              }`}
            >
              {t.heroTitle}
            </h1>
            {lang === "en" ? (
              <p className="mt-4 font-hindi text-xl text-brand sm:text-2xl">
                {t.heroAccent}
              </p>
            ) : null}
            <p className="mt-5 max-w-xl text-base text-ink-soft sm:text-lg">{t.heroBody}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={localePath(lang, "/shop")}
                className="rounded-lg bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
              >
                {dict.common.shopAll}
              </Link>
              <Link
                href={localePath(lang, "/dealership")}
                className="rounded-lg border border-ink px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-white"
              >
                {dict.common.becomeDealer}
              </Link>
            </div>

            <dl className="mt-12 grid grid-cols-2 gap-6 border-t border-line pt-8 sm:grid-cols-4">
              {t.stats.map((s) => (
                <div key={s.label}>
                  <dt className="font-display text-2xl font-semibold text-brand">
                    {s.value}
                  </dt>
                  <dd className="mt-1 text-xs tracking-[0.12em] text-muted uppercase">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-card border border-line bg-white">
              <ProductArt product={hero} large className="w-full" />
            </div>
            <div className="absolute -bottom-6 left-6 hidden animate-sway rounded-card border border-line bg-white p-5 sm:block">
              <p className="text-xs tracking-[0.16em] text-muted uppercase">
                {t.heroCardLabel}
              </p>
              <p className="mt-1 font-display text-lg font-semibold">{t.heroCardProduct}</p>
              <p className="text-sm text-ink-soft">
                <span className="text-gold">★</span> 4.9 · 738 {dict.common.reviews}
              </p>
            </div>
          </div>
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
          <div className="overflow-hidden rounded-card border border-line bg-white">
            <ProductArt product={hero} view="carton" className="w-full" />
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

      <section className="border-y border-line bg-clay py-20">
        <div className="container-page">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">
            {t.testimonialsTitle}
          </h2>
          <div className="stagger mt-10 grid gap-6 md:grid-cols-3">
            {t.testimonials.map((item) => (
              <figure key={item.name} className="rounded-card border border-line bg-white p-7">
                <div className="text-sm text-gold">★★★★★</div>
                <blockquote className="mt-4 text-sm leading-relaxed text-ink-soft">
                  “{item.quote}”
                </blockquote>
                <figcaption className="mt-5 border-t border-line pt-4 text-sm">
                  <span className="font-semibold">{item.name}</span>
                  <span className="block text-xs text-muted">{item.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

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
