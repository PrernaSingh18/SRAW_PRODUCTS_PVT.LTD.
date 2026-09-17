"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/components/cart-provider";
import { formatINR, getProduct } from "@/lib/products";
import { format, localePath, type Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/config";
import { site } from "@/lib/site";

const SHIPPING_FREE_ABOVE = 499;
const SHIPPING_FLAT = 49;

export function CartView({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const { items, subtotal, setQty, remove, clear, ready } = useCart();
  const t = dict.cart;
  const shipping = subtotal === 0 || subtotal >= SHIPPING_FREE_ABOVE ? 0 : SHIPPING_FLAT;
  const total = subtotal + shipping;

  const orderText = encodeURIComponent(
    `${t.orderIntro}\n${items
      .map((i) => `• ${i.name} — ${i.variant} x ${i.qty}`)
      .join("\n")}\n\n${t.orderTotal}: ${formatINR(total)}`,
  );

  if (!ready) {
    return (
      <div className="container-page py-24">
        <p className="text-sm text-muted">{t.loading}</p>
      </div>
    );
  }

  return (
    <div className="container-page py-14">
      <h1 className="font-display text-4xl font-semibold">{t.title}</h1>

      {items.length === 0 ? (
        <div className="mt-10 rounded-card border border-line bg-sand p-12 text-center">
          <p className="font-display text-xl font-semibold">{t.emptyTitle}</p>
          <p className="mx-auto mt-2 max-w-md text-sm text-ink-soft">{t.emptyBody}</p>
          <Link
            href={localePath(locale, "/shop")}
            className="mt-7 inline-block rounded-lg bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
          >
            {t.browse}
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <div className="overflow-hidden rounded-card border border-line">
            <ul>
              {items.map((item) => {
                const prod = getProduct(item.slug);
                return (
                  <li
                    key={item.id}
                    className="flex flex-wrap items-center gap-4 border-b border-line p-5 last:border-0"
                  >
                    {prod?.image ? (
                      <Link
                        href={localePath(locale, `/shop/${item.slug}`)}
                        className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-line bg-[#faf7f2] p-1"
                      >
                        <Image
                          src={prod.image}
                          alt={item.name}
                          fill
                          sizes="64px"
                          className="object-contain p-1"
                        />
                      </Link>
                    ) : null}

                    <div className="min-w-48 flex-1">
                      <Link
                        href={localePath(locale, `/shop/${item.slug}`)}
                        className="font-display text-base font-semibold hover:text-brand"
                      >
                        {item.name}
                      </Link>
                      <p className="mt-1 text-xs text-muted">{item.variant}</p>
                    </div>

                  <div className="flex items-center rounded-lg border border-line">
                    <button
                      type="button"
                      aria-label={dict.common.decreaseQty}
                      onClick={() => setQty(item.id, item.qty - 1)}
                      className="h-9 w-9 text-ink-soft transition-colors hover:bg-sand"
                    >
                      −
                    </button>
                    <span className="w-9 text-center text-sm font-semibold">{item.qty}</span>
                    <button
                      type="button"
                      aria-label={dict.common.increaseQty}
                      onClick={() => setQty(item.id, item.qty + 1)}
                      className="h-9 w-9 text-ink-soft transition-colors hover:bg-sand"
                    >
                      +
                    </button>
                  </div>

                  <span className="w-20 text-right text-sm font-semibold">
                    {formatINR(item.price * item.qty)}
                  </span>

                  <button
                    type="button"
                    onClick={() => remove(item.id)}
                    className="text-xs font-medium text-muted underline underline-offset-4 hover:text-brand"
                  >
                    {t.remove}
                  </button>
                  </li>
                );
              })}
            </ul>
            <div className="flex items-center justify-between bg-sand px-5 py-4">
              <button
                type="button"
                onClick={clear}
                className="text-xs font-medium text-muted underline underline-offset-4 hover:text-brand"
              >
                {t.clear}
              </button>
              <Link
                href={localePath(locale, "/shop")}
                className="text-xs font-semibold text-ink underline underline-offset-4 hover:text-brand"
              >
                {t.continue}
              </Link>
            </div>
          </div>

          <aside className="h-fit rounded-card border border-line bg-sand p-6">
            <h2 className="font-display text-xl font-semibold">{t.summary}</h2>
            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-ink-soft">{t.subtotal}</dt>
                <dd className="font-medium">{formatINR(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-soft">{t.shipping}</dt>
                <dd className="font-medium">
                  {shipping === 0 ? t.free : formatINR(shipping)}
                </dd>
              </div>
              <div className="flex justify-between border-t border-line pt-3 text-base">
                <dt className="font-semibold">{t.total}</dt>
                <dd className="font-semibold">{formatINR(total)}</dd>
              </div>
            </dl>

            {shipping > 0 ? (
              <p className="mt-3 text-xs text-muted">
                {format(t.freeShippingHint, {
                  amount: formatINR(SHIPPING_FREE_ABOVE - subtotal),
                })}
              </p>
            ) : null}

            <a
              href={`https://api.whatsapp.com/send?phone=${site.phoneHref.replace("+", "")}&text=${orderText}`}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-6 block rounded-lg bg-brand px-6 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
            >
              {t.orderWhatsapp}
            </a>
            <a
              href={`tel:${site.phoneHref}`}
              className="mt-3 block rounded-lg border border-ink px-6 py-3 text-center text-sm font-semibold transition-colors hover:bg-ink hover:text-white"
            >
              {t.orderPhone}
            </a>
            <p className="mt-4 text-xs text-muted">{t.note}</p>
          </aside>
        </div>
      )}
    </div>
  );
}
