"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/product-card";
import { categories, fromPrice, type Product } from "@/lib/products";
import { format, type Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/config";

const sortIds = ["featured", "price-asc", "price-desc", "rating"] as const;
type SortId = (typeof sortIds)[number];

export function ShopGrid({
  products,
  locale,
  dict,
}: {
  products: Product[];
  locale: Locale;
  dict: Dictionary;
}) {
  const [category, setCategory] = useState<string>("All");
  const [sort, setSort] = useState<SortId>("featured");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = products.filter((p) => {
      const matchesCategory = category === "All" || p.category === category;
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.nameHi.includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.notes.some((n) => n.toLowerCase().includes(q));
      return matchesCategory && matchesQuery;
    });

    switch (sort) {
      case "price-asc":
        return [...list].sort((a, b) => fromPrice(a) - fromPrice(b));
      case "price-desc":
        return [...list].sort((a, b) => fromPrice(b) - fromPrice(a));
      case "rating":
        return [...list].sort((a, b) => b.rating - a.rating);
      default:
        return list;
    }
  }, [products, category, sort, query]);

  return (
    <div className="container-page py-12">
      <div className="flex flex-col gap-4 border-b border-line pb-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {["All", ...categories].map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              aria-pressed={category === c}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                category === c
                  ? "border-ink bg-ink text-white"
                  : "border-line bg-white text-ink-soft hover:border-ink-soft"
              }`}
            >
              {dict.categories[c] ?? c}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <label className="sr-only" htmlFor="shop-search">
            {dict.shop.searchLabel}
          </label>
          <input
            id="shop-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={dict.shop.searchPlaceholder}
            className="h-10 w-56 rounded-lg border border-line px-3 text-sm outline-none focus:border-ink"
          />
          <label className="sr-only" htmlFor="shop-sort">
            {dict.shop.sortLabel}
          </label>
          <select
            id="shop-sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortId)}
            className="h-10 rounded-lg border border-line bg-white px-3 text-sm outline-none focus:border-ink"
          >
            {sortIds.map((id) => (
              <option key={id} value={id}>
                {dict.shop.sorts[id]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="mt-6 text-sm text-muted">
        {format(dict.shop.showing, { visible: visible.length, total: products.length })}
      </p>

      {visible.length === 0 ? (
        <p className="mt-16 text-center text-sm text-muted">{dict.shop.empty}</p>
      ) : (
        <div className="stagger mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((p) => (
            <ProductCard key={p.slug} product={p} locale={locale} dict={dict} />
          ))}
        </div>
      )}
    </div>
  );
}
