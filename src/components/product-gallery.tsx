"use client";

import { useState } from "react";
import {
  ProductArt,
  productViews,
  type ProductView,
} from "@/components/product-art";
import type { Dictionary } from "@/lib/i18n";
import type { Product } from "@/lib/products";

export function ProductGallery({
  product,
  dict,
}: {
  product: Product;
  dict: Dictionary;
}) {
  const [active, setActive] = useState<ProductView>("pack");
  const viewLabels = dict.product.views;

  return (
    <div>
      <div className="overflow-hidden rounded-card border border-line bg-white">
        <ProductArt key={active} product={product} view={active} large className="w-full animate-rise" />
      </div>

      <div className="mt-4 grid grid-cols-4 gap-3">
        {productViews.map((view) => (
          <button
            key={view}
            type="button"
            onClick={() => setActive(view)}
            aria-label={viewLabels[view]}
            aria-pressed={active === view}
            className={`overflow-hidden rounded-lg border bg-white transition-all duration-200 hover:-translate-y-0.5 ${
              active === view ? "border-brand ring-1 ring-brand" : "border-line"
            }`}
          >
            <ProductArt product={product} view={view} className="aspect-square w-full" />
          </button>
        ))}
      </div>
      <p className="mt-2 text-xs text-muted">{viewLabels[active]}</p>
    </div>
  );
}
