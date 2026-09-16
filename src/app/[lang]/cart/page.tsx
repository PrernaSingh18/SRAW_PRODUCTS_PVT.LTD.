import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CartView } from "@/components/cart-view";
import { getDictionary } from "@/lib/i18n";
import { isLocale } from "@/lib/i18n/config";

type Params = PageProps<"/[lang]/cart">;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return { title: getDictionary(lang).cart.title };
}

export default async function CartPage({ params }: Params) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return <CartView locale={lang} dict={getDictionary(lang)} />;
}
