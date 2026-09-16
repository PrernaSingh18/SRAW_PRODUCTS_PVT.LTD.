import Link from "next/link";
import { ProductArt } from "@/components/product-art";
import { QuickAdd } from "@/components/add-to-cart";
import { formatINR, fromPrice, type Product } from "@/lib/products";
import { localePath, type Dictionary } from "@/lib/i18n";
import { productNames } from "@/lib/i18n/products-hi";
import type { Locale } from "@/lib/i18n/config";

export function ProductCard({
  product,
  locale,
  dict,
}: {
  product: Product;
  locale: Locale;
  dict: Dictionary;
}) {
  const href = localePath(locale, `/shop/${product.slug}`);
  const names = productNames(product, locale);
  const isHi = locale === "hi";

  return (
    <article className="group flex flex-col overflow-hidden rounded-card border border-line bg-white transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/40 hover:shadow-[0_22px_45px_-28px_rgba(28,16,48,0.55)]">
      <Link href={href} className="relative block overflow-hidden">
        <ProductArt
          product={product}
          className="aspect-square w-full transition-transform duration-500 ease-out group-hover:scale-[1.06]"
        />
        {product.badge ? (
          <span className="absolute left-3 top-3 rounded-full bg-ink px-3 py-1 text-[11px] font-semibold tracking-wider text-white uppercase">
            {product.badge}
          </span>
        ) : null}
        <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-ink/85 py-2.5 text-center text-xs font-semibold tracking-[0.14em] text-white uppercase transition-transform duration-300 group-hover:translate-y-0">
          {dict.common.viewDetails}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-[11px] font-semibold tracking-[0.16em] text-muted uppercase">
          {product.subtitle}
        </p>
        <h3
          className={`mt-1 font-display text-lg font-semibold ${isHi ? "font-hindi" : ""}`}
        >
          <Link href={href} className="transition-colors hover:text-brand">
            {names.primary}
          </Link>
        </h3>
        <p className={`text-sm text-brand ${isHi ? "" : "font-hindi"}`}>
          {names.secondary}
        </p>
        <p className="mt-2 line-clamp-2 text-sm text-ink-soft">{product.tagline}</p>

        <div className="mt-4 flex items-baseline justify-between border-t border-line pt-4">
          <span className="text-sm text-muted">
            {dict.common.from}{" "}
            <span className="text-base font-semibold text-ink">
              {formatINR(fromPrice(product))}
            </span>
          </span>
          <span className="text-xs font-medium text-ink-soft">
            <span className="text-gold">★</span> {product.rating.toFixed(1)}
          </span>
        </div>

        <div className="mt-3">
          <QuickAdd product={product} dict={dict} />
        </div>
      </div>
    </article>
  );
}
