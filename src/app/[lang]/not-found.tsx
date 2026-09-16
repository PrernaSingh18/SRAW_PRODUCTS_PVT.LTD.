import Link from "next/link";
import { lang } from "next/root-params";
import { getDictionary, localePath, resolveLocale } from "@/lib/i18n";

export default async function NotFound() {
  const locale = resolveLocale(await lang());
  const dict = getDictionary(locale);

  return (
    <div className="container-page py-28 text-center">
      <p className="text-xs font-semibold tracking-[0.18em] text-brand uppercase">
        {dict.notFound.eyebrow}
      </p>
      <h1 className="mt-3 font-display text-4xl font-semibold">{dict.notFound.title}</h1>
      <p className="mx-auto mt-3 max-w-md text-sm text-ink-soft">{dict.notFound.body}</p>
      <Link
        href={localePath(locale, "/shop")}
        className="mt-8 inline-block rounded-lg bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
      >
        {dict.notFound.cta}
      </Link>
    </div>
  );
}
