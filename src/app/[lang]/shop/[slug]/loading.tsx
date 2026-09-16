import { lang } from "next/root-params";
import { IncenseLoader } from "@/components/incense-loader";
import { getDictionary, resolveLocale } from "@/lib/i18n";

export default async function ProductLoading() {
  const dict = getDictionary(resolveLocale(await lang()));
  return (
    <div className="container-page grid gap-12 py-16 lg:grid-cols-2">
      <div className="rounded-card border border-line bg-sand">
        <IncenseLoader
          label={dict.loader.product}
          labelAccent={dict.loader.productAccent}
        />
      </div>
      <div className="space-y-4">
        <div className="h-3 w-24 animate-pulse rounded bg-line" />
        <div className="h-9 w-56 animate-pulse rounded bg-line" />
        <div className="h-3 w-40 animate-pulse rounded bg-line" />
        <div className="h-24 w-full animate-pulse rounded bg-line" />
        <div className="h-12 w-full animate-pulse rounded-lg bg-line" />
      </div>
    </div>
  );
}
