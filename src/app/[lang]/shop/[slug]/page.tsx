import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCart } from "@/components/add-to-cart";
import { ProductGallery } from "@/components/product-gallery";
import { ProductCard } from "@/components/product-card";
import { formatINR, getProduct, products } from "@/lib/products";
import { getDictionary, localePath } from "@/lib/i18n";
import { isLocale, locales } from "@/lib/i18n/config";
import { localizeProduct, productNames } from "@/lib/i18n/products-hi";
import { site } from "@/lib/site";

type Params = PageProps<"/[lang]/shop/[slug]">;

export function generateStaticParams() {
  return locales.flatMap((lang) => products.map((p) => ({ lang, slug: p.slug })));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLocale(lang)) return {};
  const base = getProduct(slug);
  if (!base) return {};
  const product = localizeProduct(base, lang);
  const names = productNames(base, lang);
  return {
    title: `${names.primary} ${product.subtitle}`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Params) {
  const { lang, slug } = await params;
  if (!isLocale(lang)) notFound();
  const base = getProduct(slug);
  if (!base) notFound();

  const dict = getDictionary(lang);
  const product = localizeProduct(base, lang);
  const names = productNames(base, lang);
  const isHi = lang === "hi";

  const related = products
    .filter((p) => p.slug !== base.slug && p.category === base.category)
    .slice(0, 4)
    .map((p) => localizeProduct(p, lang));

  const details = [
    { label: dict.product.detailCategory, value: dict.categories[base.category] },
    { label: dict.product.detailBurn, value: product.burnTime },
    { label: dict.product.detailNotes, value: product.notes.join(" · ") },
    { label: dict.product.detailMade, value: dict.product.madeValue },
  ];

  return (
    <>
      <div className="border-b border-line bg-sand">
        <nav className="container-page py-4 text-xs text-muted" aria-label="Breadcrumb">
          <Link href={localePath(lang, "/")} className="hover:text-brand">
            {dict.common.home}
          </Link>
          <span className="px-2">/</span>
          <Link href={localePath(lang, "/shop")} className="hover:text-brand">
            {dict.product.breadcrumbShop}
          </Link>
          <span className="px-2">/</span>
          <span className="text-ink">{names.primary}</span>
        </nav>
      </div>

      <section className="container-page grid gap-12 py-12 lg:grid-cols-2 lg:py-16">
        <ProductGallery product={product} dict={dict} />

        <div>
          <p className="text-xs font-semibold tracking-[0.18em] text-muted uppercase">
            {product.subtitle}
          </p>
          <h1
            className={`mt-2 font-display text-4xl font-semibold ${isHi ? "font-hindi" : ""}`}
          >
            {names.primary}
          </h1>
          <p className={`mt-1 text-xl text-brand ${isHi ? "" : "font-hindi"}`}>
            {names.secondary}
          </p>
          <p className="mt-2 text-sm text-muted">
            <span className="text-gold">★</span> {product.rating.toFixed(1)} ·{" "}
            {product.reviews} {dict.common.reviews}
          </p>
          <p className="mt-5 text-ink-soft">{product.description}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {product.notes.map((n) => (
              <span
                key={n}
                className="rounded-full border border-line bg-sand px-3 py-1.5 text-xs font-medium text-ink-soft"
              >
                {n}
              </span>
            ))}
          </div>

          <p className="mt-6 text-sm text-muted">
            {dict.product.availableIn}{" "}
            <span className="text-ink">
              {product.variants.map((v) => formatINR(v.price)).join(" , ")}
            </span>
          </p>

          <div className="mt-8 border-t border-line pt-8">
            <AddToCart product={product} dict={dict} />
          </div>

          <dl className="mt-8 grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2">
            {details.map((d) => (
              <div key={d.label} className="bg-white p-5">
                <dt className="text-xs tracking-[0.14em] text-muted uppercase">{d.label}</dt>
                <dd className="mt-1 text-sm font-medium">{d.value}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-6 text-sm text-ink-soft">
            {dict.product.bulkLine}{" "}
            <Link
              href={localePath(lang, "/bulk-order")}
              className="font-semibold text-brand underline underline-offset-4"
            >
              {dict.product.bulkLink}
            </Link>{" "}
            {dict.product.bulkOr}{" "}
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noreferrer noopener"
              className="font-semibold text-brand underline underline-offset-4"
            >
              {dict.product.bulkWhatsapp}
            </a>
            .
          </p>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="border-t border-line bg-sand py-16">
          <div className="container-page">
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">
              {dict.product.related}
            </h2>
            <div className="stagger mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} locale={lang} dict={dict} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
