"use client";

import { useState } from "react";
import type { Locale } from "@/lib/i18n/config";

type ReviewCategory = "all" | "temple" | "wholesale" | "family";

type Review = {
  id: string;
  category: "temple" | "wholesale" | "family";
  name: string;
  role: { en: string; hi: string };
  location: { en: string; hi: string };
  badge: { en: string; hi: string };
  quote: { en: string; hi: string };
  rating: number;
  likes: number;
};

const reviews: Review[] = [
  {
    id: "rev-1",
    category: "wholesale",
    name: "Ramesh Gupta",
    role: { en: "Pooja Samagri Retailer", hi: "पूजा सामग्री विक्रेता" },
    location: { en: "Patna, Bihar", hi: "पटना, बिहार" },
    badge: { en: "Wholesale Partner", hi: "थोक विक्रेता" },
    quote: {
      en: "We stock Srikanth Chandan & 3-in-1 in all four of our stores. The smoke is non-irritating, burns cleanly for 45 minutes, and customers repeatedly ask for the ₹25 packs.",
      hi: "हम अपनी चारों दुकानों में श्रीकंठ चंदन और ३-इन-१ रखते हैं। इसका धुआँ आँखों में नहीं चुभता और ग्राहक बार-बार ₹२५ वाले पैक की मांग करते हैं।",
    },
    rating: 5,
    likes: 42,
  },
  {
    id: "rev-2",
    category: "temple",
    name: "Sunita Devi & Pandit Ji",
    role: { en: "Temple Trust & Daily Aarti", hi: "मंदिर समिति एवं दैनिक आरती" },
    location: { en: "Vishnupad Marg, Gaya", hi: "विष्णुपद मार्ग, गया" },
    badge: { en: "Daily Temple User", hi: "दैनिक मंदिर सेवा" },
    quote: {
      en: "The Puja Dhoop Jars have exceptional airtight freshness. The Guggal and Loban aroma lingers across the temple courtyard long after evening aarti concludes.",
      hi: "स्वर्ण ढक्कन वाले धूप जार की महक बहुत ताज़ा रहती है। शाम की संध्या आरती के बाद भी मंदिर परिसर में गुग्गुल और लोबान की पावन सुगंध घंटों छाई रहती है।",
    },
    rating: 5,
    likes: 67,
  },
  {
    id: "rev-3",
    category: "wholesale",
    name: "Md. Arshad",
    role: { en: "Regional FMCG Distributor", hi: "क्षेत्रीय वितरक" },
    location: { en: "Ranchi, Jharkhand", hi: "राँची, झारखंड" },
    badge: { en: "Master Distributor", hi: "प्रमुख वितरक" },
    quote: {
      en: "Dispatch from SRAW Products has never missed a deadline in 2 years. Their wholesale master cartons arrive in pristine condition with attractive retail display outers.",
      hi: "एसआरएडब्ल्यू से दो वर्षों में एक बार भी आपूर्ति में देरी नहीं हुई। मास्टर कार्टन की पैकिंग बहुत मजबूत है और खुदरा दुकानों पर डिस्प्ले बहुत आकर्षक दिखता है।",
    },
    rating: 5,
    likes: 38,
  },
  {
    id: "rev-4",
    category: "family",
    name: "Anuradha Sharma",
    role: { en: "Homemaker", hi: "गृहणी" },
    location: { en: "Varanasi, UP", hi: "वाराणसी, उत्तर प्रदेश" },
    badge: { en: "Verified Buyer", hi: "सत्यापित ग्राहक" },
    quote: {
      en: "Total Out has been a life saver for our ground-floor verandah. Natural citronella smell is refreshing, and the kids can do their homework peacefully without mosquito bites.",
      hi: "टोटल आउट हमारे बरामदे के लिए वरदान साबित हुआ है। सिट्रोनेला की खुशबू बहुत ताज़ा है और बच्चे बिना मच्छरों के आराम से पढ़ाई कर पाते हैं।",
    },
    rating: 5,
    likes: 54,
  },
  {
    id: "rev-5",
    category: "temple",
    name: "Acharya Vidyadhar",
    role: { en: "Vedic Yagya & Hawan Purohit", hi: "वैदिक यज्ञ एवं हवन पुरोहित" },
    location: { en: "Prayagraj, UP", hi: "प्रयागराज, उत्तर प्रदेश" },
    badge: { en: "Vedic Scholar", hi: "वैदिक आचार्य" },
    quote: {
      en: "Neelkanth 4-in-1 has authentic Kedarnath temple resins. It creates the serene atmosphere necessary for deep Vedic mantra chanting and meditation.",
      hi: "नीलकंठ ४-इन-१ में वास्तविक केदारनाथ लोबान व गुग्गुल की महक है। मंत्रोच्चार और साधना के लिए यह सर्वोत्तम सात्विक वातावरण बनाता है।",
    },
    rating: 5,
    likes: 79,
  },
  {
    id: "rev-6",
    category: "family",
    name: "Pooja & Vikram Singhal",
    role: { en: "Morning Pooja Devotees", hi: "दैनिक पूजा श्रद्धालु" },
    location: { en: "Jaipur, Rajasthan", hi: "जयपुर, राजस्थान" },
    badge: { en: "Verified Buyer", hi: "सत्यापित ग्राहक" },
    quote: {
      en: "The 3-in-1 Shiva box brings three different divine smells so our morning prayer feels fresh every day. Truly pure and 100% charcoal free!",
      hi: "३-इन-१ शिव बॉक्स में तीन अलग-अलग सुगंधें हैं, जिससे हर दिन की पूजा में नयापन रहता है। बिना कोयले की शुद्ध अगरबत्ती है!",
    },
    rating: 5,
    likes: 31,
  },
];

export function TestimonialsInteractive({
  locale,
  title,
}: {
  locale: Locale;
  title: string;
}) {
  const [activeCategory, setActiveCategory] = useState<ReviewCategory>("all");
  const [likesMap, setLikesMap] = useState<Record<string, number>>({});
  const [likedByUser, setLikedByUser] = useState<Record<string, boolean>>({});

  const isHi = locale === "hi";

  const categories: { id: ReviewCategory; label: { en: string; hi: string }; icon: string }[] = [
    { id: "all", label: { en: "All Testimonials", hi: "सभी अनुभव" }, icon: "🌟" },
    { id: "temple", label: { en: "Temples & Pujaris", hi: "मंदिर एवं पुजारी" }, icon: "🛕" },
    { id: "wholesale", label: { en: "Retailers & Wholesale", hi: "दुकानदार एवं वितरक" }, icon: "📦" },
    { id: "family", label: { en: "Homes & Families", hi: "गृहस्थ एवं परिवार" }, icon: "🏡" },
  ];

  const filtered =
    activeCategory === "all"
      ? reviews
      : reviews.filter((r) => r.category === activeCategory);

  const toggleLike = (id: string, defaultLikes: number) => {
    const isLiked = likedByUser[id];
    setLikedByUser((prev) => ({ ...prev, [id]: !isLiked }));
    setLikesMap((prev) => {
      const current = prev[id] ?? defaultLikes;
      return { ...prev, [id]: isLiked ? current - 1 : current + 1 };
    });
  };

  return (
    <section className="border-y border-line bg-clay py-20">
      <div className="container-page">
        {/* Title and Intro */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-brand-soft/80 px-3.5 py-1 text-xs font-semibold tracking-wider text-brand uppercase">
              <span>★ 4.9 / 5</span>
              <span>· {isHi ? "भरोसेमंद अनुभव" : "Customer Voices"}</span>
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl text-ink">
              {title}
            </h2>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const isActive = cat.id === activeCategory;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  aria-pressed={isActive}
                  className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 active:scale-95 ${
                    isActive
                      ? "bg-brand text-white shadow-sm shadow-brand/30 scale-105"
                      : "border border-line bg-white text-ink-soft hover:border-brand/40 hover:text-ink"
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span className={isHi ? "font-hindi" : ""}>{cat.label[locale]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => {
            const currentLikes = likesMap[item.id] ?? item.likes;
            const hasLiked = !!likedByUser[item.id];

            return (
              <figure
                key={item.id}
                className="group flex flex-col justify-between rounded-card border border-line bg-white p-7 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-md animate-rise"
              >
                <div>
                  <div className="flex items-center justify-between">
                    {/* 5 Stars */}
                    <div className="flex items-center text-gold text-sm tracking-wider">
                      {"★".repeat(item.rating)}
                    </div>

                    {/* Trust Badge */}
                    <span className="rounded-full bg-sand px-2.5 py-0.5 text-[10px] font-semibold text-brand tracking-wider uppercase border border-line">
                      {item.badge[locale]}
                    </span>
                  </div>

                  <blockquote className="mt-4 text-sm leading-relaxed text-ink-soft">
                    “{item.quote[locale]}”
                  </blockquote>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-line pt-4 text-xs">
                  <figcaption>
                    <span className="font-bold text-ink block">{item.name}</span>
                    <span className="text-muted text-[11px] block">
                      {item.role[locale]} · {item.location[locale]}
                    </span>
                  </figcaption>

                  {/* Interactive Like / Helpful Button */}
                  <button
                    type="button"
                    onClick={() => toggleLike(item.id, item.likes)}
                    title={hasLiked ? "Unlike" : "Mark as helpful"}
                    aria-label={`Helpful review, count ${currentLikes}`}
                    className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 transition-all active:scale-90 ${
                      hasLiked
                        ? "border-brand bg-brand-soft text-brand font-semibold"
                        : "border-line text-muted hover:border-brand/40 hover:text-ink"
                    }`}
                  >
                    <span>{hasLiked ? "❤️" : "🤍"}</span>
                    <span className="font-mono text-[11px]">{currentLikes}</span>
                  </button>
                </div>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}

