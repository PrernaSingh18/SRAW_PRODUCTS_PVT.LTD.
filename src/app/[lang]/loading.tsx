import { lang } from "next/root-params";
import { IncenseLoader } from "@/components/incense-loader";
import { getDictionary, resolveLocale } from "@/lib/i18n";

export default async function Loading() {
  const dict = getDictionary(resolveLocale(await lang()));
  return (
    <div className="container-page py-28">
      <IncenseLoader
        label={dict.loader.default}
        labelAccent={dict.loader.defaultAccent}
      />
    </div>
  );
}
