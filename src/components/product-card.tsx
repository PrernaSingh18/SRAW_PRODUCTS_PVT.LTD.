"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
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
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLElement>(null);

  const href = localePath(locale, `/shop/${product.slug}`);
  const names = productNames(product, locale);
  const isHi = locale === "hi";

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    // Calculate subtle realistic 3D angles
    setTilt({ x: -(y * 7), y: x * 7 });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <article
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-4px)`
          : "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)",
        transition: isHovered
          ? "transform 0.1s cubic-bezier(0.2, 0, 0, 1)"
          : "transform 0.4s cubic-bezier(0.2, 0, 0, 1), box-shadow 0.4s ease-out",
        transformStyle: "preserve-3d",
      }}
      className="group flex flex-col overflow-hidden rounded-card border border-line bg-white transition-all duration-300 hover:border-brand/40 hover:shadow-[0_24px_50px_-24px_rgba(28,16,48,0.4)]"
    >
      <Link
        href={href}
        className="relative block overflow-hidden bg-[#faf7f2]"
        style={{ transform: "translateZ(10px)" }}
      >
        {product.image ? (
          <div className="relative aspect-square w-full overflow-hidden flex items-center justify-center p-3">
            <Image
              src={product.image}
              alt={`${names.primary} ${product.subtitle}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-contain p-3 transition-transform duration-500 ease-out group-hover:scale-105"
            />
          </div>
        ) : (
          <ProductArt
            product={product}
            className="aspect-square w-full transition-transform duration-500 ease-out group-hover:scale-[1.06]"
          />
        )}

        {product.badge ? (
          <span
            className="absolute left-3 top-3 z-10 rounded-full bg-ink px-3 py-1 text-[11px] font-semibold tracking-wider text-white uppercase shadow-sm"
            style={{ transform: "translateZ(20px)" }}
          >
            {product.badge}
          </span>
        ) : null}
        <span className="pointer-events-none absolute inset-x-0 bottom-0 z-10 translate-y-full bg-ink/85 py-2.5 text-center text-xs font-semibold tracking-[0.14em] text-white uppercase transition-transform duration-300 group-hover:translate-y-0">
          {dict.common.viewDetails}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5" style={{ transform: "translateZ(15px)" }}>
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

        {product.notes && product.notes.length > 0 ? (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {product.notes.slice(0, 3).map((note) => (
              <span
                key={note}
                className="rounded-md border border-line bg-sand/60 px-2 py-0.5 text-[11px] font-medium text-ink-soft transition-colors group-hover:border-brand/30 group-hover:bg-brand-soft/50"
              >
                {note}
              </span>
            ))}
          </div>
        ) : null}

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
