"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/cart-provider";
import { formatINR, products, type Product } from "@/lib/products";
import { localePath, type Dictionary } from "@/lib/i18n";
import { productNames } from "@/lib/i18n/products-hi";
import type { Locale } from "@/lib/i18n/config";

type Ritual = {
  id: string;
  icon: string;
  title: { en: string; hi: string };
  subtitle: { en: string; hi: string };
  productSlug: string;
  pairingSlug: string;
  aromaNotes: { en: string[]; hi: string[] };
  intensity: number; // 1 to 5
  intensityLabel: { en: string; hi: string };
  burnTime: { en: string; hi: string };
  idealTime: { en: string; hi: string };
  ritualTip: { en: string; hi: string };
};

const rituals: Ritual[] = [
  {
    id: "morning-aarti",
    icon: "🌅",
    title: {
      en: "Morning Aarti & Daily Puja",
      hi: "सुबह की आरती एवं दैनिक पूजा",
    },
    subtitle: {
      en: "Awaken your home temple with sacred florals, pure chandan, and positive morning vibrations.",
      hi: "पवित्र पुष्पों, शुद्ध चंदन और सकारात्मक ऊर्जा के साथ अपने गृह मंदिर को सुवासित करें।",
    },
    productSlug: "srikanth-3-in-1",
    pairingSlug: "srikanth-puja-dhoop-jar",
    aromaNotes: {
      en: ["Mysore Sandalwood", "Rose Petals", "Pure Camphor", "Temple Mogra"],
      hi: ["मैसूर चंदन", "गुलाब की पंखुड़ियाँ", "शुद्ध कपूर", "मंदिर मोगरा"],
    },
    intensity: 4,
    intensityLabel: { en: "Uplifting & Radiant", hi: "उमंग और पावनता" },
    burnTime: { en: "45–50 Mins", hi: "४५–५० मिनट" },
    idealTime: { en: "Brahma Muhurta & Sunrise (6:00 AM – 9:00 AM)", hi: "ब्रह्म मुहूर्त एवं सूर्योदय" },
    ritualTip: {
      en: "Light 1 stick alongside your morning diya to purify airflow and sustain long-lasting floral freshness.",
      hi: "सुबह के दीपक के साथ १ अगरबत्ती जलाएँ, जिससे घर में सकारात्मकता और ताज़गी बनी रहे।",
    },
  },
  {
    id: "meditation-peace",
    icon: "🧘",
    title: {
      en: "Meditation, Yoga & Stress Relief",
      hi: "ध्यान, योग एवं मानसिक शांति",
    },
    subtitle: {
      en: "Calm mental chatter and deepen spiritual focus with authentic Himalayan Guggul and resins.",
      hi: "पवित्र हिमालयन गुग्गुल और देवदार सुगंध से चित्त शांत कर गहरी ध्यान साधना में लीन हों।",
    },
    productSlug: "neelkanth",
    pairingSlug: "srikanth-dhoop-pouch",
    aromaNotes: {
      en: ["Sacred Guggul", "Temple Loban", "Himalayan Herbs", "Soft Kasturi"],
      hi: ["पवित्र गुग्गुल", "मंदिर लोबान", "हिमालयी जड़ी-बूटियाँ", "कस्तूरी"],
    },
    intensity: 4,
    intensityLabel: { en: "Deep & Meditative", hi: "गहरा और एकाग्रतावर्धक" },
    burnTime: { en: "50+ Mins", hi: "५०+ मिनट" },
    idealTime: { en: "Pranayama, Meditation & Silent Hours", hi: "प्राणायाम, ध्यान व एकांत समय" },
    ritualTip: {
      en: "The slow resin smolder of Neelkanth clears mental fatigue and replicates sacred Kedarnath temple sanctums.",
      hi: "नीलकंठ की लोबान सुगंध थकान दूर करती है और पावन केदारनाथ धाम जैसी अनुभूति देती है।",
    },
  },
  {
    id: "temple-sandhya",
    icon: "🛕",
    title: {
      en: "Evening Sandhya & Mandir Aarti",
      hi: "संध्या वंदन एवं देवालय आरती",
    },
    subtitle: {
      en: "Airtight luxury glass jars preserving rich natural temple fragrance for soulful evening devotion.",
      hi: "स्वर्ण ढक्कन वाले काँच जार में सुरक्षित पारंपरिक धूप, जो शाम की संध्या आरती को दिव्य बनाती है।",
    },
    productSlug: "srikanth-puja-dhoop-jar",
    pairingSlug: "srikanth-premium",
    aromaNotes: {
      en: ["Royal Chandan", "Natural Samagri", "Sweet Loban", "Fresh Lavender"],
      hi: ["शाही चंदन", "प्राकृतिक सामग्री", "मीठा लोबान", "लैवेंडर"],
    },
    intensity: 5,
    intensityLabel: { en: "Rich & Long-Lasting", hi: "गाढ़ा एवं चिरस्थायी" },
    burnTime: { en: "40–45 Mins", hi: "४०–४५ मिनट" },
    idealTime: { en: "Sunset Sandhya Aarti (6:00 PM – 8:00 PM)", hi: "सायंकालीन संध्या आरती" },
    ritualTip: {
      en: "Our thick Puja Dhoop sticks produce continuous fragrant plumes that disperse lingering cooking odors.",
      hi: "मोटी धूप स्टिक्स लगातार सुगंध फैलाती हैं और घर के वातावरण को पूरी तरह शुद्ध करती हैं।",
    },
  },
  {
    id: "natural-mosquito",
    icon: "🌿",
    title: {
      en: "Mosquito Protection & Freshness",
      hi: "मच्छर-मुक्त वातावरण एवं ताज़गी",
    },
    subtitle: {
      en: "100% natural citronella and organic lemongrass sticks for smoke-safe outdoor and indoor protection.",
      hi: "कठोर रसायनों से रहित, शुद्ध सिट्रोनेला और लेमनग्रास से बच्चों व परिवार के लिए सुरक्षित कवच।",
    },
    productSlug: "total-out",
    pairingSlug: "srikanth-citronella",
    aromaNotes: {
      en: ["Citronella Essential Oil", "Organic Lemongrass", "Neem Extracts", "Eucalyptus"],
      hi: ["सिट्रोनेला तेल", "ऑर्गेनिक लेमनग्रास", "नीम सत", "यूकेलिप्टस"],
    },
    intensity: 3,
    intensityLabel: { en: "Crisp & Herbal", hi: "ताज़ा और हर्बल" },
    burnTime: { en: "60+ Mins", hi: "६०+ मिनट" },
    idealTime: { en: "Dusk, Balconies, Verandahs & Living Rooms", hi: "शाम के समय, बालकनी व बैठक" },
    ritualTip: {
      en: "Non-toxic and charcoal-free, Total Out allows children to study and elders to relax peacefully without bites.",
      hi: "धुआँ-रहित और सुरक्षित, जिससे बच्चे बिना मच्छरों की चिंता के पढ़ाई और खेल सकें।",
    },
  },
  {
    id: "hawan-festivals",
    icon: "✨",
    title: {
      en: "Hawan, Navratri & Auspicious Days",
      hi: "हवन, नवरात्रि एवं शुभ अनुष्ठान",
    },
    subtitle: {
      en: "Pure cow ghee extracts, traditional Vedic samagri, and Guggal crafted for sacred rituals.",
      hi: "वैदिक हवन सामग्री, शुद्ध गुग्गुल और पावन वनौषधियों का मिश्रण — विशेष पूजा-पाठ हेतु।",
    },
    productSlug: "srikanth-dhoop-pouch",
    pairingSlug: "neelkanth",
    aromaNotes: {
      en: ["Vedic Samagri", "Pure Guggul Resin", "Camphor Flakes", "Cardamom Wood"],
      hi: ["वैदिक सामग्री", "शुद्ध गुग्गुल", "कपूर", "इलायची काष्ठ"],
    },
    intensity: 5,
    intensityLabel: { en: "Sacred Temple Fire", hi: "हवन अग्नि सदृश" },
    burnTime: { en: "45 Mins", hi: "४५ मिनट" },
    idealTime: { en: "Festivals, Griha Pravesh & Purnima Puja", hi: "त्योहार, गृह प्रवेश व पूर्णिमा" },
    ritualTip: {
      en: "Replaces raw charcoal smoke with balanced, medicinal dhoop smoke celebrated in ancient Ayurveda.",
      hi: "आयुर्वेदिक पद्धति से निर्मित, जो वातावरण से नकारात्मक शक्तियों को दूर कर सात्विकता लाती है।",
    },
  },
];

export function FragranceFinder({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const [selectedRitualId, setSelectedRitualId] = useState("morning-aarti");
  const [addedSlug, setAddedSlug] = useState<string | null>(null);
  const { add } = useCart();

  const isHi = locale === "hi";
  const ritual = rituals.find((r) => r.id === selectedRitualId) || rituals[0];

  const mainProduct: Product | undefined = products.find((p) => p.slug === ritual.productSlug);
  const pairingProduct: Product | undefined = products.find((p) => p.slug === ritual.pairingSlug);

  const mainNames = mainProduct ? productNames(mainProduct, locale) : null;
  const pairingNames = pairingProduct ? productNames(pairingProduct, locale) : null;

  function handleQuickAdd(p: Product) {
    const variant = p.variants[0];
    add({
      slug: p.slug,
      name: `${p.name} — ${p.subtitle}`,
      variant: `${variant.label} (${formatINR(variant.price)})`,
      price: variant.price,
    });
    setAddedSlug(p.slug);
    window.setTimeout(() => setAddedSlug(null), 1600);
  }

  return (
    <section className="border-y border-line bg-gradient-to-b from-white via-sand/40 to-sand py-20">
      <div className="container-page">
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-soft/70 px-3.5 py-1 text-xs font-semibold tracking-wider text-brand uppercase">
            <span>✨</span>
            {isHi ? "पूजा एवं सुगंध चयनकर्ता" : "Interactive Ritual Matcher"}
          </span>

          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl text-ink">
            {isHi ? "अपनी पूजा और मुहूर्त के अनुसार सुगंध चुनें" : "Find Your Divine Fragrance Match"}
          </h2>

          <p className="mt-3 text-sm text-ink-soft sm:text-base">
            {isHi
              ? "दैनिक आरती, ध्यान, या संध्या वंदन — अपनी आवश्यकता पर क्लिक करें और शुद्धतम अगरबत्ती व धूप का चयन करें।"
              : "Select your daily devotional moment or household need to discover the ideal natural incense crafted for your prayer."}
          </p>
        </div>

        {/* Interactive Ritual Selection Tabs */}
        <div className="mt-10 flex items-center justify-start md:justify-center gap-2.5 overflow-x-auto pb-3 pt-1 scrollbar-none">
          {rituals.map((r) => {
            const isSelected = r.id === selectedRitualId;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => setSelectedRitualId(r.id)}
                aria-pressed={isSelected}
                className={`flex items-center gap-2.5 rounded-xl border px-4 py-3 text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 active:scale-95 ${
                  isSelected
                    ? "border-brand bg-brand text-white shadow-md shadow-brand/25 scale-[1.02]"
                    : "border-line bg-white text-ink-soft hover:border-brand/50 hover:bg-brand-soft/30"
                }`}
              >
                <span className="text-base sm:text-lg">{r.icon}</span>
                <span className={isHi ? "font-hindi" : ""}>{r.title[locale]}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Ritual & Product Recommendation Showcase */}
        {mainProduct && mainNames && (
          <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-stretch animate-rise">
            {/* Primary Product Card */}
            <div className="flex flex-col justify-between rounded-card border border-brand/25 bg-white p-6 sm:p-8 shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="grid sm:grid-cols-[180px_1fr] gap-6 items-center">
                {/* Product Image Preview */}
                <div className="relative aspect-square w-full sm:w-[180px] overflow-hidden rounded-xl border border-line bg-[#faf7f2] p-3 mx-auto">
                  <Image
                    src={mainProduct.image || "/assets/Slide 1.jpg"}
                    alt={mainNames.primary}
                    fill
                    sizes="(max-width: 640px) 100vw, 200px"
                    className="object-contain p-2 transition-transform duration-500 hover:scale-105"
                  />
                  {mainProduct.badge && (
                    <span className="absolute top-2 left-2 rounded-full bg-brand px-2 py-0.5 text-[10px] font-bold text-white uppercase">
                      {mainProduct.badge}
                    </span>
                  )}
                </div>

                {/* Details */}
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-brand tracking-wider uppercase">
                    <span>{ritual.icon}</span>
                    <span>{isHi ? "सर्वश्रेष्ठ अनुशंसा" : "Top Recommendation"}</span>
                  </div>

                  <h3 className={`mt-1 font-display text-xl sm:text-2xl font-bold text-ink ${isHi ? "font-hindi" : ""}`}>
                    <Link
                      href={localePath(locale, `/shop/${mainProduct.slug}`)}
                      className="hover:text-brand transition-colors"
                    >
                      {mainNames.primary}
                    </Link>
                  </h3>
                  <p className={`text-xs text-muted ${isHi ? "" : "font-hindi"}`}>
                    {mainNames.secondary} · {mainProduct.subtitle}
                  </p>

                  <p className="mt-3 text-xs sm:text-sm text-ink-soft leading-relaxed">
                    {ritual.subtitle[locale]}
                  </p>

                  {/* Aroma Notes Pills */}
                  <div className="mt-4">
                    <span className="text-[11px] font-semibold tracking-wider text-muted uppercase block mb-1.5">
                      {isHi ? "सुगंध एवं घटक:" : "Natural Aroma Notes:"}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {ritual.aromaNotes[locale].map((note) => (
                        <span
                          key={note}
                          className="rounded-md border border-line bg-sand/80 px-2.5 py-1 text-xs font-medium text-ink-soft"
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Ritual Specs Grid */}
              <div className="mt-6 grid grid-cols-3 gap-3 border-t border-line pt-5 text-center">
                <div className="rounded-lg bg-sand/60 p-2.5">
                  <span className="block text-[10px] uppercase tracking-wider text-muted">
                    {isHi ? "प्रज्वलन समय" : "Burn Duration"}
                  </span>
                  <span className="mt-0.5 block text-xs sm:text-sm font-semibold text-ink">
                    ⏱️ {ritual.burnTime[locale]}
                  </span>
                </div>
                <div className="rounded-lg bg-sand/60 p-2.5">
                  <span className="block text-[10px] uppercase tracking-wider text-muted">
                    {isHi ? "सुगंध तीव्रता" : "Intensity"}
                  </span>
                  <div className="mt-1 flex items-center justify-center gap-1">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <span
                        key={level}
                        className={`h-2 w-2 rounded-full ${
                          level <= ritual.intensity ? "bg-amber-500" : "bg-line"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] text-ink-soft mt-0.5 block truncate">
                    {ritual.intensityLabel[locale]}
                  </span>
                </div>
                <div className="rounded-lg bg-sand/60 p-2.5">
                  <span className="block text-[10px] uppercase tracking-wider text-muted">
                    {isHi ? "प्रमाणन" : "Purity"}
                  </span>
                  <span className="mt-0.5 block text-xs sm:text-sm font-semibold text-leaf">
                    ✓ 100% Charcoal-Free
                  </span>
                </div>
              </div>

              {/* Price & Action Row */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
                <div>
                  <span className="text-xs text-muted block">{dict.common.from}</span>
                  <span className="text-xl font-bold text-ink">
                    {formatINR(mainProduct.variants[0].price)}
                  </span>
                  <span className="text-xs text-muted ml-1.5">
                    ({mainProduct.variants[0].label})
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={localePath(locale, `/shop/${mainProduct.slug}`)}
                    className="rounded-lg border border-line px-4 py-2.5 text-xs sm:text-sm font-semibold text-ink transition-colors hover:border-ink"
                  >
                    {dict.common.viewDetails}
                  </Link>

                  <button
                    type="button"
                    onClick={() => handleQuickAdd(mainProduct)}
                    className={`rounded-lg px-5 py-2.5 text-xs sm:text-sm font-semibold text-white transition-all active:scale-95 shadow-sm ${
                      addedSlug === mainProduct.slug
                        ? "bg-leaf shadow-leaf/30"
                        : "bg-brand hover:bg-brand-dark shadow-brand/30"
                    }`}
                  >
                    {addedSlug === mainProduct.slug
                      ? `${dict.common.added} ✓`
                      : `${dict.common.addToCart}`}
                  </button>
                </div>
              </div>
            </div>

            {/* Companion Pairing & Vedic Tip Side Card */}
            <div className="flex flex-col justify-between gap-6 rounded-card border border-line bg-sand/70 p-6 sm:p-8">
              {/* Devotional Ritual Tip */}
              <div className="rounded-xl border border-line/80 bg-white p-5 shadow-2xs">
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 uppercase tracking-wider">
                  <span>💡</span>
                  <span>{isHi ? "वैदिक पूजा सुझाव" : "Devotional Ritual Guide"}</span>
                </div>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-ink-soft">
                  “{ritual.ritualTip[locale]}”
                </p>
                <div className="mt-3 text-[11px] text-muted flex items-center gap-1.5">
                  <span>🕒 {isHi ? "उत्तम समय:" : "Best Ritual Hours:"}</span>
                  <span className="font-medium text-ink">{ritual.idealTime[locale]}</span>
                </div>
              </div>

              {/* Companion Product Recommendation */}
              {pairingProduct && pairingNames && (
                <div className="rounded-xl border border-line/80 bg-white p-5 shadow-2xs">
                  <span className="text-[11px] font-semibold text-brand tracking-wider uppercase block">
                    {isHi ? "दिव्य जुगलबंदी (पवित्र संगम)" : "Harmonious Pairing"}
                  </span>
                  <div className="mt-3 flex items-center gap-4">
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-line bg-[#faf7f2] p-1">
                      <Image
                        src={pairingProduct.image || "/assets/Slide 5.jpg"}
                        alt={pairingNames.primary}
                        fill
                        sizes="64px"
                        className="object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-ink truncate">
                        {pairingNames.primary}
                      </h4>
                      <p className="text-xs text-muted truncate">{pairingProduct.subtitle}</p>
                      <p className="mt-1 text-xs font-semibold text-brand">
                        {formatINR(pairingProduct.variants[0].price)}
                      </p>
                    </div>
                    <div className="shrink-0">
                      <button
                        type="button"
                        onClick={() => handleQuickAdd(pairingProduct)}
                        className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                          addedSlug === pairingProduct.slug
                            ? "bg-leaf text-white"
                            : "border border-brand text-brand hover:bg-brand hover:text-white"
                        }`}
                      >
                        {addedSlug === pairingProduct.slug ? "✓" : "+ Add"}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Purity Guarantee Trust Badge */}
              <div className="flex items-center justify-between rounded-xl bg-ink text-white px-5 py-4 text-xs">
                <div>
                  <p className="font-semibold text-amber-300">
                    {isHi ? "श्री कण्ठ १००% शुद्धता गारंटी" : "Sri Kanth 100% Purity Oath"}
                  </p>
                  <p className="text-[11px] text-white/75 mt-0.5">
                    {isHi ? "रसायन-मुक्त, शुद्ध प्राकृतिक गोंद व जड़ी-बूटियाँ" : "No harmful toxic binders, safe for kids & temples."}
                  </p>
                </div>
                <span className="text-xl">🪔</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

