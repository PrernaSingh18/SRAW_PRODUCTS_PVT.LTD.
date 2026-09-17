"use client";

import { useState } from "react";
import Image from "next/image";
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
  const hasPhotos = Boolean(product.images && product.images.length > 0);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [activeArtView, setActiveArtView] = useState<ProductView>("pack");
  const [viewMode, setViewMode] = useState<"photo" | "art">(hasPhotos ? "photo" : "art");

  const images = product.images ?? [];
  const currentPhoto = images[photoIndex] ?? images[0];
  const viewLabels = dict.product.views;

  return (
    <div>
      {/* Main Display Area */}
      <div className="relative aspect-square w-full overflow-hidden rounded-card border border-line bg-[#faf7f2] flex items-center justify-center shadow-sm">
        {viewMode === "photo" && currentPhoto ? (
          <div className="relative h-full w-full p-4 flex items-center justify-center animate-rise">
            <Image
              src={currentPhoto.src}
              alt={currentPhoto.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain p-4 transition-transform duration-300 hover:scale-105"
            />
            {currentPhoto.label ? (
              <span className="absolute bottom-4 left-4 rounded-md bg-ink/85 px-3 py-1 text-xs font-semibold tracking-wide text-white backdrop-blur-sm shadow-sm">
                {currentPhoto.label}
              </span>
            ) : null}
          </div>
        ) : (
          <ProductArt
            key={activeArtView}
            product={product}
            view={activeArtView}
            large
            className="w-full animate-rise"
          />
        )}
      </div>

      {/* Thumbnails Row */}
      {hasPhotos ? (
        <div className="mt-4 space-y-2">
          <div className="flex flex-wrap items-center gap-2.5">
            {images.map((img, idx) => {
              const isSelected = viewMode === "photo" && photoIndex === idx;
              return (
                <button
                  key={img.src + idx}
                  type="button"
                  onClick={() => {
                    setViewMode("photo");
                    setPhotoIndex(idx);
                  }}
                  aria-label={img.label || img.alt}
                  aria-pressed={isSelected}
                  className={`group relative h-20 w-20 overflow-hidden rounded-lg border bg-[#faf7f2] p-1.5 transition-all duration-200 hover:-translate-y-0.5 ${
                    isSelected
                      ? "border-brand ring-2 ring-brand/40 shadow-sm"
                      : "border-line opacity-75 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="80px"
                    className="object-contain p-1 transition-transform duration-200 group-hover:scale-105"
                  />
                  {img.label ? (
                    <span className="absolute inset-x-0 bottom-0 bg-ink/80 py-0.5 text-center text-[9px] font-medium text-white truncate px-1">
                      {img.label}
                    </span>
                  ) : null}
                </button>
              );
            })}

            {/* Also allow toggling to diagram view */}
            <button
              type="button"
              onClick={() => setViewMode("art")}
              aria-label="Illustration / Spec View"
              aria-pressed={viewMode === "art"}
              className={`relative h-20 w-20 overflow-hidden rounded-lg border bg-white p-1 transition-all duration-200 hover:-translate-y-0.5 ${
                viewMode === "art"
                  ? "border-brand ring-2 ring-brand/40 shadow-sm"
                  : "border-line opacity-60 hover:opacity-100"
              }`}
            >
              <ProductArt product={product} view="pack" className="h-full w-full" />
              <span className="absolute inset-x-0 bottom-0 bg-ink/80 py-0.5 text-center text-[9px] font-medium text-white">
                Vector
              </span>
            </button>
          </div>

          {viewMode === "photo" && currentPhoto?.label ? (
            <p className="text-xs text-muted">
              {currentPhoto.label} &bull; {currentPhoto.alt}
            </p>
          ) : null}
        </div>
      ) : (
        /* Fallback for products without photos */
        <div className="mt-4">
          <div className="grid grid-cols-4 gap-3">
            {productViews.map((view) => (
              <button
                key={view}
                type="button"
                onClick={() => {
                  setViewMode("art");
                  setActiveArtView(view);
                }}
                aria-label={viewLabels[view]}
                aria-pressed={activeArtView === view}
                className={`overflow-hidden rounded-lg border bg-white transition-all duration-200 hover:-translate-y-0.5 ${
                  activeArtView === view ? "border-brand ring-1 ring-brand" : "border-line"
                }`}
              >
                <ProductArt product={product} view={view} className="aspect-square w-full" />
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-muted">{viewLabels[activeArtView]}</p>
        </div>
      )}
    </div>
  );
}
