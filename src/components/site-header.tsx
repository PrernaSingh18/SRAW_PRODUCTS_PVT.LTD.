"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/components/cart-provider";
import { localePath, type Dictionary } from "@/lib/i18n";
import { locales, localeNames, type Locale } from "@/lib/i18n/config";
import { navItems, site } from "@/lib/site";

export function SiteHeader({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const pathname = usePathname();
  const { count, ready } = useCart();
  const [openedAt, setOpenedAt] = useState<string | null>(null);
  const open = openedAt === pathname;

  const pathWithoutLocale = pathname.replace(/^\/(en|hi)/, "") || "/";

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur">
      <div className="hidden border-b border-line bg-ink text-white md:block">
        <div className="container-page flex h-9 items-center justify-between text-xs">
          <p>
            <span className="font-hindi">{dict.header.promoAccent}</span>
            <span className="px-2 text-white/40">|</span>
            {dict.header.promo}
          </p>
          <div className="flex items-center gap-5">
            <a href={`tel:${site.phoneHref}`} className="hover:text-white/70">
              {site.phone}
            </a>
            <a href={`mailto:${site.email}`} className="hover:text-white/70">
              {site.email}
            </a>
          </div>
        </div>
      </div>

      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link href={localePath(locale, "/")} className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-brand font-hindi text-base font-bold text-white">
            श्री
          </span>
          <span className="leading-tight">
            <span className="block font-display text-base font-semibold">
              {locale === "hi" ? site.brandHi : site.brand}{" "}
              <span
                className={`text-sm font-medium text-brand ${locale === "hi" ? "" : "font-hindi"}`}
              >
                {dict.common.accentBrand}
              </span>
            </span>
            <span className="block text-[11px] tracking-[0.18em] text-muted uppercase">
              {dict.common.brandBy}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => {
            const href = localePath(locale, item.href);
            const active = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={item.href}
                href={href}
                className={`group text-sm font-medium transition-colors ${
                  active ? "text-brand" : "text-ink-soft hover:text-ink"
                }`}
              >
                {dict.nav[item.href]}
                {dict.navAccent[item.href] ? (
                  <span className="block font-hindi text-[10px] leading-tight text-muted transition-colors group-hover:text-brand">
                    {dict.navAccent[item.href]}
                  </span>
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <div
            className="hidden items-center rounded-lg border border-line p-0.5 sm:flex"
            role="group"
            aria-label={dict.common.language}
          >
            {locales.map((l) => (
              <Link
                key={l}
                href={localePath(l, pathWithoutLocale)}
                hrefLang={l}
                aria-current={l === locale ? "true" : undefined}
                className={`rounded-md px-2.5 py-1 text-xs font-semibold transition-colors ${
                  l === locale
                    ? "bg-ink text-white"
                    : "text-ink-soft hover:text-brand"
                } ${l === "hi" ? "font-hindi" : ""}`}
              >
                {localeNames[l]}
              </Link>
            ))}
          </div>

          <Link
            href={localePath(locale, "/cart")}
            className="relative flex h-10 items-center gap-2 rounded-lg border border-line px-4 text-sm font-medium transition-colors hover:border-ink-soft"
          >
            {dict.common.cart}
            <span className="grid h-5 min-w-5 place-items-center rounded-full bg-brand px-1 text-[11px] font-semibold text-white">
              {ready ? count : 0}
            </span>
          </Link>

          <button
            type="button"
            aria-label={dict.common.toggleMenu}
            aria-expanded={open}
            onClick={() => setOpenedAt(open ? null : pathname)}
            className="grid h-10 w-10 place-items-center rounded-lg border border-line md:hidden"
          >
            <span className="space-y-1.5">
              <span className="block h-0.5 w-5 bg-ink" />
              <span className="block h-0.5 w-5 bg-ink" />
              <span className="block h-0.5 w-5 bg-ink" />
            </span>
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-line bg-white md:hidden">
          <nav className="container-page flex flex-col py-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={localePath(locale, item.href)}
                onClick={() => setOpenedAt(null)}
                className="flex items-center justify-between border-b border-line py-3 text-sm font-medium text-ink-soft"
              >
                {dict.nav[item.href]}
                {dict.navAccent[item.href] ? (
                  <span className="font-hindi text-xs text-muted">
                    {dict.navAccent[item.href]}
                  </span>
                ) : null}
              </Link>
            ))}
            <div className="flex items-center gap-2 py-3">
              {locales.map((l) => (
                <Link
                  key={l}
                  href={localePath(l, pathWithoutLocale)}
                  hrefLang={l}
                  className={`rounded-lg border px-3 py-1.5 text-xs font-semibold ${
                    l === locale ? "border-ink bg-ink text-white" : "border-line text-ink-soft"
                  } ${l === "hi" ? "font-hindi" : ""}`}
                >
                  {localeNames[l]}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
