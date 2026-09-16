import { lang } from "next/root-params";
import { IncenseLoader, ProductCardSkeleton } from "@/components/incense-loader";
import { getDictionary, resolveLocale } from "@/lib/i18n";

export default async function ShopLoading() {
  const dict = getDictionary(resolveLocale(await lang()));
  return (
    <div className="container-page py-14">
      <IncenseLoader label={dict.loader.shop} labelAccent={dict.loader.shopAccent} />
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
