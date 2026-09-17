"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { localePath, type Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/config";

type Slide = {
  src: string;
  alt: string;
  badge: { en: string; hi: string };
  title: { en: string; hi: string };
  subtitle: { en: string; hi: string };
  ctaPrimary: { label: { en: string; hi: string }; href: string };
  ctaSecondary: { label: { en: string; hi: string }; href: string };
};

const slides: Slide[] = [
  {
    src: "/assets/Slide 1.jpg",
    alt: "Sri Kanth Agarbatti & Dhoop Complete Product Range",
    badge: { en: "Sri Kanth Collection", hi: "श्री कण्ठ संग्रह" },
    title: {
      en: "Aapki Har Pooja Ka Saathi",
      hi: "आपकी हर पूजा का साथी",
    },
    subtitle: {
      en: "Pure incense sticks, fragrant dhoop & natural mosquito repellents crafted for divine worship.",
      hi: "शुद्ध अगरबत्ती, सुगंधित धूप एवं प्राकृतिक रिपेलेंट — हर भारतीय घर की पूजा के लिए समर्पित।",
    },
    ctaPrimary: {
      label: { en: "Explore Products", hi: "उत्पाद देखें" },
      href: "/shop",
    },
    ctaSecondary: {
      label: { en: "Become a Dealer", hi: "डीलर बनें" },
      href: "/dealership",
    },
  },
  {
    src: "/assets/Slide 2.jpg",
    alt: "Sri Kanth 3-in-1 Premium Agarbatti with Lord Shiva",
    badge: { en: "Bestseller Trio", hi: "लोकप्रिय तिकड़ी" },
    title: {
      en: "Sri Kanth 3-In-1 Premium Agarbatti",
      hi: "श्री कण्ठ ३-इन-१ प्रीमियम अगरबत्ती",
    },
    subtitle: {
      en: "Three timeless devotional aromas in one pack to elevate morning & evening prayers.",
      hi: "तीन पावन सुगंधों का अनुपम संगम — सुबह और शाम की आरती और ध्यान के लिए आदर्श।",
    },
    ctaPrimary: {
      label: { en: "View 3-in-1 Pack", hi: "३-इन-१ पैक देखें" },
      href: "/shop/srikanth-3-in-1",
    },
    ctaSecondary: {
      label: { en: "All Agarbatti", hi: "सभी अगरबत्तियाँ" },
      href: "/shop",
    },
  },
  {
    src: "/assets/Slide 9.jpg",
    alt: "Neelkanth 4-in-1 Sugandhit Puja Agarbatti Kedarnath Shrine",
    badge: { en: "Sacred Edition", hi: "पावन केदारनाथ संस्करण" },
    title: {
      en: "Neelkanth 4-In-1 Sugandhit Agarbatti",
      hi: "नीलकंठ ४-इन-१ सुगंधित अगरबत्ती",
    },
    subtitle: {
      en: "Infused with pure Guggul, Loban and Himalayan forest herbs for authentic temple worship.",
      hi: "पवित्र गुग्गुल, लोबान और दुर्लभ वनौषधियों से सुवासित — मंदिर और हवन जैसी पावन अनुभूति।",
    },
    ctaPrimary: {
      label: { en: "Discover Neelkanth", hi: "नीलकंठ खरीदें" },
      href: "/shop/neelkanth",
    },
    ctaSecondary: {
      label: { en: "Wholesale Enquiry", hi: "थोक पूछताछ" },
      href: "/bulk-order",
    },
  },
  {
    src: "/assets/Slide 5.jpg",
    alt: "Sri Kanth Puja Dhoop Sticks Airtight Glass Jars",
    badge: { en: "Premium Glass Jars", hi: "प्रीमियम काँच जार" },
    title: {
      en: "Puja Dhoop Sticks — Golden Lid Jars",
      hi: "पूजा धूप स्टिक्स — स्वर्ण ढक्कन जार",
    },
    subtitle: {
      en: "Airtight luxury jars preserving aroma in 6 pure notes: Chandan, Guggal, Loban, Mogra, Rose & Lavender.",
      hi: "चंदन, गुग्गुल, लोबान, मोगरा, गुलाब और लैवेंडर — लंबे समय तक ताज़ा महक बनाए रखने वाले जार।",
    },
    ctaPrimary: {
      label: { en: "Shop Dhoop Jars", hi: "धूप जार खरीदें" },
      href: "/shop/srikanth-puja-dhoop-jar",
    },
    ctaSecondary: {
      label: { en: "Browse All Dhoop", hi: "सभी धूप उत्पाद" },
      href: "/shop",
    },
  },
  {
    src: "/assets/Slide 6.jpg",
    alt: "Sri Kanth Wholesale Dhoop Boxes & Master Cartons",
    badge: { en: "Wholesale & Bulk", hi: "थोक एवं कार्टन आपूर्ति" },
    title: {
      en: "Direct Manufacturer Supply & Cartons",
      hi: "निर्माता से सीधे थोक एवं मास्टर कार्टन",
    },
    subtitle: {
      en: "Attractive retail packaging and reliable bulk shipments across India for retailers & distributors.",
      hi: "खुदरा विक्रेताओं और वितरकों के लिए संपूर्ण भारत में विश्वसनीय थोक आपूर्ति और सर्वोत्तम मार्जिन।",
    },
    ctaPrimary: {
      label: { en: "Bulk Orders", hi: "थोक ऑर्डर करें" },
      href: "/bulk-order",
    },
    ctaSecondary: {
      label: { en: "Distributor Network", hi: "डीलरशिप नेटवर्क" },
      href: "/dealership",
    },
  },
  {
    src: "/assets/Slide 8.jpg",
    alt: "Total Out Natural Mosquito Repellent Sticks",
    badge: { en: "100% Eco-Friendly", hi: "१००% प्राकृतिक" },
    title: {
      en: "Total Out — No Mosquitoes!",
      hi: "टोटल आउट — नो मॉस्किटो!",
    },
    subtitle: {
      en: "Natural citronella and lemongrass sticks ensuring peaceful, smoke-safe protection for your family.",
      hi: "कठोर रसायनों से मुक्त, प्राकृतिक सिट्रोनेला और लेमनग्रास से बच्चों व बड़ों के लिए सुरक्षित सुरक्षा।",
    },
    ctaPrimary: {
      label: { en: "Buy Total Out", hi: "टोटल आउट खरीदें" },
      href: "/shop/total-out",
    },
    ctaSecondary: {
      label: { en: "Dealership Details", hi: "डीलरशिप विवरण" },
      href: "/dealership",
    },
  },
];

const slideTabs = [
  { en: "Full Collection", hi: "संपूर्ण संग्रह" },
  { en: "3-in-1 Shiva", hi: "३-इन-१ शिव" },
  { en: "Neelkanth Kedarnath", hi: "नीलकंठ केदारनाथ" },
  { en: "Glass Dhoop Jars", hi: "धूप जार" },
  { en: "Wholesale Cartons", hi: "थोक कार्टन" },
  { en: "Total Out Mosquito", hi: "टोटल आउट" },
];

export function HeroSlider({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prevSlide, nextSlide]);

  // Autoplay timer
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 6500);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide, current]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 45) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
    setTouchStartX(null);
  };

  const slide = slides[current];
  const isHi = lang === "hi";

  return (
    <div
      className="relative overflow-hidden bg-ink select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-roledescription="carousel"
      aria-label="Product Showcase Slider"
    >
      {/* Slide Images Container */}
      <div className="relative h-[530px] w-full sm:h-[600px] lg:h-[680px]">
        {slides.map((s, idx) => {
          const isActive = idx === current;
          return (
            <div
              key={s.src}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
              aria-hidden={!isActive}
            >
              <Image
                src={s.src}
                alt={s.alt}
                fill
                priority={idx === 0}
                sizes="100vw"
                className={`object-cover object-center transition-transform duration-[7000ms] ease-out ${
                  isActive ? "scale-105" : "scale-100"
                }`}
              />
              {/* Gradient overlay for readability and contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/45 to-ink/20 sm:bg-gradient-to-r sm:from-ink/90 sm:via-ink/50 sm:to-transparent" />
            </div>
          );
        })}

        {/* Floating Content Card on the active slide */}
        <div className="container-page relative z-20 flex h-full items-end pb-24 sm:items-center sm:pb-12">
          <div className="max-w-xl text-white animate-rise">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-black/45 px-3.5 py-1 text-xs font-semibold tracking-wider text-amber-300 uppercase backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
              {slide.badge[lang]}
            </div>

            <h1
              className={`mt-4 font-display text-3xl font-bold leading-tight drop-shadow-md sm:text-4xl lg:text-5xl ${
                isHi ? "font-hindi leading-[1.2]" : ""
              }`}
            >
              {slide.title[lang]}
            </h1>

            <p
              className={`mt-3 max-w-lg text-sm text-white/90 drop-shadow sm:text-base ${
                isHi ? "font-hindi" : ""
              }`}
            >
              {slide.subtitle[lang]}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href={localePath(lang, slide.ctaPrimary.href)}
                className="group inline-flex items-center gap-2 rounded-lg bg-brand px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/30 transition-all duration-200 hover:bg-brand-dark hover:scale-[1.02] active:scale-95"
              >
                <span>{slide.ctaPrimary.label[lang]}</span>
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </Link>
              <Link
                href={localePath(lang, slide.ctaSecondary.href)}
                className="rounded-lg border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition-all duration-200 hover:bg-white hover:text-ink hover:scale-[1.02] active:scale-95"
              >
                {slide.ctaSecondary.label[lang]}
              </Link>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          type="button"
          onClick={prevSlide}
          aria-label={dict.common.decreaseQty || "Previous slide"}
          className="absolute left-4 top-1/2 z-30 hidden -translate-y-1/2 rounded-full border border-white/30 bg-ink/60 p-3.5 text-white backdrop-blur-md transition-all duration-200 hover:bg-white hover:text-ink hover:scale-110 active:scale-95 sm:flex sm:items-center sm:justify-center"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          type="button"
          onClick={nextSlide}
          aria-label={dict.common.increaseQty || "Next slide"}
          className="absolute right-4 top-1/2 z-30 hidden -translate-y-1/2 rounded-full border border-white/30 bg-ink/60 p-3.5 text-white backdrop-blur-md transition-all duration-200 hover:bg-white hover:text-ink hover:scale-110 active:scale-95 sm:flex sm:items-center sm:justify-center"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Bottom Interactive Navigation & Progress Bar */}
        <div className="absolute bottom-0 inset-x-0 z-30 bg-gradient-to-t from-black/80 via-black/40 to-transparent pt-6 pb-4">
          <div className="container-page flex flex-col gap-3">
            {/* Interactive Pill Tabs */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
                {slides.map((s, idx) => {
                  const isActive = idx === current;
                  const tabLabel = slideTabs[idx]?.[lang] || `0${idx + 1}`;
                  return (
                    <button
                      key={s.src}
                      type="button"
                      onClick={() => setCurrent(idx)}
                      aria-label={`Go to slide ${idx + 1}`}
                      aria-current={isActive}
                      className={`relative flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
                        isActive
                          ? "bg-brand text-white shadow-md shadow-brand/40 scale-105"
                          : "bg-black/40 text-white/70 hover:bg-white/20 hover:text-white backdrop-blur-md"
                      }`}
                    >
                      <span className="font-mono text-[11px] opacity-75">0{idx + 1}</span>
                      <span className="hidden sm:inline">{tabLabel}</span>
                    </button>
                  );
                })}
              </div>

              {/* Pause/Play Toggle & Counter */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsPaused((prev) => !prev)}
                  title={isPaused ? "Play Autoplay" : "Pause Autoplay"}
                  aria-label={isPaused ? "Play" : "Pause"}
                  className="flex items-center gap-1.5 rounded-full border border-white/20 bg-black/40 px-2.5 py-1 text-xs text-white/80 backdrop-blur-md transition-colors hover:bg-white/20 hover:text-white"
                >
                  {isPaused ? (
                    <>
                      <svg className="h-3.5 w-3.5 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      <span className="hidden md:inline text-[11px]">Play</span>
                    </>
                  ) : (
                    <>
                      <svg className="h-3.5 w-3.5 text-white/80" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                      </svg>
                      <span className="hidden md:inline text-[11px]">Pause</span>
                    </>
                  )}
                </button>

                <div className="flex items-center gap-1.5 text-xs font-semibold tracking-widest text-white/80 bg-black/40 px-3 py-1 rounded-full backdrop-blur-md border border-white/20">
                  <span className="text-amber-300">0{current + 1}</span>
                  <span className="text-white/30">/</span>
                  <span>0{slides.length}</span>
                </div>
              </div>
            </div>

            {/* Active Slide Live Progress Indicator */}
            <div className="relative h-1 w-full overflow-hidden rounded-full bg-white/20">
              <div
                key={current + (isPaused ? "-paused" : "-playing")}
                className={`h-full bg-gradient-to-r from-amber-400 to-brand rounded-full transition-all ${
                  isPaused ? "w-0" : "animate-[progress_6.5s_linear]"
                }`}
                style={{
                  width: isPaused ? "100%" : undefined,
                  opacity: isPaused ? 0.4 : 1,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

