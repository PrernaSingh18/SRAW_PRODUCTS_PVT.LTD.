"use client";

import { useState } from "react";
import { useCart } from "@/components/cart-provider";
import { formatINR, type Product } from "@/lib/products";
import type { Dictionary } from "@/lib/i18n";

export function AddToCart({ product, dict }: { product: Product; dict: Dictionary }) {
  const { add } = useCart();
  const [variantIndex, setVariantIndex] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const variant = product.variants[variantIndex];

  function handleAdd() {
    add(
      {
        slug: product.slug,
        name: `${product.name} — ${product.subtitle}`,
        variant: `${variant.label} (${formatINR(variant.price)})`,
        price: variant.price,
      },
      qty,
    );
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold tracking-[0.18em] text-muted uppercase">
          {dict.common.choosePack}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {product.variants.map((v, i) => (
            <button
              key={v.label}
              type="button"
              onClick={() => setVariantIndex(i)}
              aria-pressed={i === variantIndex}
              className={`rounded-lg border px-4 py-2.5 text-left transition-colors ${
                i === variantIndex
                  ? "border-brand bg-brand-soft text-brand-dark"
                  : "border-line bg-white text-ink-soft hover:border-ink-soft"
              }`}
            >
              <span className="block text-sm font-semibold">{v.label}</span>
              <span className="block text-xs text-muted">
                {formatINR(v.price)} · {v.sticks}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center rounded-lg border border-line">
          <button
            type="button"
            aria-label={dict.common.decreaseQty}
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="h-11 w-11 text-lg text-ink-soft transition-colors hover:bg-sand"
          >
            −
          </button>
          <span className="w-10 text-center text-sm font-semibold" aria-live="polite">
            {qty}
          </span>
          <button
            type="button"
            aria-label={dict.common.increaseQty}
            onClick={() => setQty((q) => Math.min(99, q + 1))}
            className="h-11 w-11 text-lg text-ink-soft transition-colors hover:bg-sand"
          >
            +
          </button>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className={`h-11 flex-1 min-w-48 rounded-lg px-6 text-sm font-semibold text-white transition-all duration-200 active:scale-[0.98] ${
            added ? "bg-leaf" : "bg-brand hover:bg-brand-dark"
          }`}
        >
          {added
            ? `${dict.common.added} ✓`
            : `${dict.common.addToCart} · ${formatINR(variant.price * qty)}`}
        </button>
      </div>
    </div>
  );
}

export function QuickAdd({ product, dict }: { product: Product; dict: Dictionary }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const variant = product.variants[0];

  return (
    <button
      type="button"
      onClick={() => {
        add({
          slug: product.slug,
          name: `${product.name} — ${product.subtitle}`,
          variant: `${variant.label} (${formatINR(variant.price)})`,
          price: variant.price,
        });
        setAdded(true);
        window.setTimeout(() => setAdded(false), 1500);
      }}
      className="w-full rounded-lg border border-line bg-white py-2.5 text-sm font-semibold text-ink transition-all duration-200 hover:border-brand hover:bg-brand hover:text-white active:scale-[0.97]"
    >
      {added ? `${dict.common.added} ✓` : dict.common.quickAdd}
    </button>
  );
}
