import Link from "next/link";
import { products } from "@/lib/products";
import { localePath, type Dictionary } from "@/lib/i18n";
import { productNames } from "@/lib/i18n/products-hi";
import type { Locale } from "@/lib/i18n/config";
import { navItems, site } from "@/lib/site";

export function SiteFooter({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const isHi = locale === "hi";

  return (
    <footer className="mt-24 border-t border-line bg-sand">
      <div className="container-page grid gap-10 py-14 md:grid-cols-4">
        <div>
          <span className="font-display text-xl font-semibold">
            {isHi ? site.brandHi : site.brand}
          </span>
          <span className={`ml-2 text-lg text-brand ${isHi ? "" : "font-hindi"}`}>
            {isHi ? site.brand : site.brandHi}
          </span>
          <p className="mt-3 font-hindi text-sm text-ink-soft">
            {dict.footer.taglineAccent}
          </p>
          <p className="mt-1 text-sm text-ink-soft">{dict.footer.tagline}</p>
          <p className="mt-4 text-xs tracking-[0.16em] text-muted uppercase">
            {isHi ? site.trademarkHi : site.trademark}
          </p>
        </div>

        <div>
          <h3 className="text-xs font-semibold tracking-[0.18em] text-muted uppercase">
            {dict.footer.quickLinks}
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link href={localePath(locale, "/")} className="text-ink-soft hover:text-brand">
                {dict.common.home}
              </Link>
            </li>
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={localePath(locale, item.href)}
                  className="text-ink-soft hover:text-brand"
                >
                  {dict.nav[item.href]}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={localePath(locale, "/cart")}
                className="text-ink-soft hover:text-brand"
              >
                {dict.common.cart}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold tracking-[0.18em] text-muted uppercase">
            {dict.footer.products}
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {products.slice(0, 7).map((p) => (
              <li key={p.slug}>
                <Link
                  href={localePath(locale, `/shop/${p.slug}`)}
                  className={`text-ink-soft hover:text-brand ${isHi ? "font-hindi" : ""}`}
                >
                  {productNames(p, locale).primary}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold tracking-[0.18em] text-muted uppercase">
            {dict.footer.contact}
          </h3>
          <address className="mt-4 space-y-2.5 text-sm not-italic text-ink-soft">
            <p>{isHi ? site.addressHi : site.address}</p>
            <p>
              <a href={`mailto:${site.email}`} className="hover:text-brand">
                {site.email}
              </a>
            </p>
            <p>
              <a href={`tel:${site.phoneHref}`} className="hover:text-brand">
                {site.phone}
              </a>
            </p>
          </address>
          <div className="mt-5 flex flex-wrap gap-2">
            {site.social.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer noopener"
                className="rounded-full border border-line bg-white px-3 py-1.5 text-xs font-medium text-ink-soft transition-colors hover:border-brand hover:text-brand"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-page flex flex-col gap-2 py-5 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {isHi ? site.nameHi : site.name}.{" "}
            {dict.footer.rights}
          </p>
          <p>{dict.footer.madeIn}</p>
        </div>
      </div>
    </footer>
  );
}
