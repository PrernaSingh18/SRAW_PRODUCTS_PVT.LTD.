import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ShopGrid } from "@/components/shop-grid";
import { products } from "@/lib/products";
import { getDictionary } from "@/lib/i18n";
import { isLocale } from "@/lib/i18n/config";
import { localizeProduct } from "@/lib/i18n/products-hi";

type Params = PageProps<"/[lang]/shop">;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);
  return { title: dict.shop.title, description: dict.shop.metaDescription };
}

export default async function ShopPage({ params }: Params) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const localized = products.map((p) => localizeProduct(p, lang));

  return (
    <>
      <section className="border-b border-line bg-sand">
        <div className="container-page py-14">
          <p className="text-xs font-semibold tracking-[0.18em] text-brand uppercase">
            {dict.shop.eyebrow}
            {dict.shop.eyebrowAccent ? (
              <span className="font-hindi tracking-normal normal-case">
                {" "}
                · {dict.shop.eyebrowAccent}
              </span>
            ) : null}
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold sm:text-5xl">
            {dict.shop.heading}
          </h1>
          {dict.shop.headingAccent ? (
            <p className="mt-2 font-hindi text-xl text-brand">{dict.shop.headingAccent}</p>
          ) : null}
          <p className="mt-4 max-w-2xl text-ink-soft">{dict.shop.intro}</p>
        </div>
      </section>

      <ShopGrid products={localized} locale={lang} dict={dict} />
    </>
  );
}
