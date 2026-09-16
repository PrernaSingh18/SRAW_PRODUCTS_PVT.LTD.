import type { Product } from "@/lib/products";

export const productViews = ["pack", "burning", "sticks", "carton"] as const;
export type ProductView = (typeof productViews)[number];

type Props = {
  product: Product;
  view?: ProductView;
  className?: string;
  large?: boolean;
};

function initialsOf(name: string) {
  return name
    .replace(/[^a-zA-Z ]/g, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}

/** Flat SVG stand-in for pack photography, tinted per product. */
export function ProductArt({ product, view = "pack", className = "", large = false }: Props) {
  const { base, accent, label } = product.colors;
  const initials = initialsOf(product.name);

  return (
    <svg
      viewBox="0 0 320 320"
      role="img"
      aria-label={`${product.name} ${product.subtitle}`}
      className={className}
    >
      <rect width="320" height="320" fill={accent} />

      {view === "pack" ? (
        <>
          <circle cx="160" cy="132" r="86" fill="#ffffff" opacity="0.55" />
          <g stroke={base} strokeWidth="3" strokeLinecap="round" opacity="0.55" fill="none">
            <path className="smoke-curl" d="M133 74c-14-16 12-26 0-44" />
            <path className="smoke-curl" d="M160 64c-16-18 14-30 0-50" />
            <path className="smoke-curl" d="M187 74c-14-16 12-26 0-44" />
          </g>

          <rect x="104" y="96" width="112" height="176" rx="8" fill={base} />
          <rect x="104" y="96" width="112" height="176" rx="8" fill="#000" opacity="0.08" />
          <rect x="112" y="104" width="96" height="160" rx="5" fill={base} />
          <rect x="112" y="146" width="96" height="46" fill="#fdfbf7" />
          <text
            x="160"
            y="170"
            textAnchor="middle"
            fontSize="20"
            fontWeight="800"
            fill={label}
            fontFamily="inherit"
          >
            {initials}
          </text>
          <text
            className="font-hindi"
            x="160"
            y="186"
            textAnchor="middle"
            fontSize="12"
            fontWeight="600"
            fill={base}
            textLength={Math.min(84, product.nameHi.length * 9)}
            lengthAdjust="spacingAndGlyphs"
          >
            {product.nameHi}
          </text>
          <rect x="126" y="122" width="68" height="6" rx="3" fill="#fdfbf7" opacity="0.85" />
          <rect x="138" y="210" width="44" height="4" rx="2" fill="#fdfbf7" opacity="0.6" />
          <rect x="132" y="222" width="56" height="4" rx="2" fill="#fdfbf7" opacity="0.4" />

          {large ? (
            <>
              <g stroke={label} strokeWidth="4" strokeLinecap="round">
                <path d="M232 272V186" />
                <path d="M248 272V204" />
                <path d="M264 272V222" />
              </g>
              <circle className="ember-dot" cx="232" cy="182" r="4" fill="#d6440d" />
              <g fill={label} opacity="0.5">
                <circle className="ash-fleck" cx="232" cy="190" r="1.8" />
                <circle className="ash-fleck" cx="249" cy="208" r="1.6" />
                <circle className="ash-fleck" cx="264" cy="226" r="1.4" />
              </g>
            </>
          ) : null}
        </>
      ) : null}

      {view === "burning" ? (
        <>
          <circle cx="160" cy="150" r="96" fill="#ffffff" opacity="0.5" />
          <g stroke={base} strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.6">
            <path className="smoke-curl" d="M160 132c-20-20 18-32 0-54" />
            <path className="smoke-curl" d="M160 118c-18-18 16-30 0-50" />
            <path className="smoke-curl" d="M160 146c-19-19 17-31 0-52" />
          </g>
          <rect x="157" y="136" width="6" height="94" rx="3" fill={label} />
          <circle className="ember-dot" cx="160" cy="136" r="4.5" fill="#d6440d" />
          <path
            d="M112 230h96l-11 24a6 6 0 0 1-5.4 3.4h-63.2a6 6 0 0 1-5.4-3.4z"
            fill={base}
          />
          <rect x="106" y="221" width="108" height="12" rx="6" fill={label} />
          <g fill={label} opacity="0.45">
            <circle className="ash-fleck" cx="160" cy="150" r="2" />
            <circle className="ash-fleck" cx="152" cy="168" r="1.6" />
            <circle className="ash-fleck" cx="168" cy="184" r="1.4" />
          </g>
        </>
      ) : null}

      {view === "sticks" ? (
        <>
          <circle cx="160" cy="160" r="98" fill="#ffffff" opacity="0.5" />
          <g stroke={label} strokeWidth="5" strokeLinecap="round">
            <path d="M92 258 118 78" />
            <path d="M118 262 134 74" />
            <path d="M146 264 152 72" />
            <path d="M174 264 168 72" />
            <path d="M202 262 186 74" />
            <path d="M228 258 202 78" />
          </g>
          <g stroke={base} strokeWidth="7" strokeLinecap="round">
            <path d="M104 178 118 78" />
            <path d="M126 176 134 74" />
            <path d="M149 174 152 72" />
            <path d="M171 174 168 72" />
            <path d="M194 176 186 74" />
            <path d="M216 178 202 78" />
          </g>
          <rect x="84" y="236" width="152" height="44" rx="10" fill={base} />
          <rect x="96" y="250" width="128" height="6" rx="3" fill="#fdfbf7" opacity="0.8" />
          <text
            className="font-hindi"
            x="160"
            y="272"
            textAnchor="middle"
            fontSize="14"
            fontWeight="600"
            fill="#fdfbf7"
            opacity="0.95"
          >
            {product.nameHi}
          </text>
        </>
      ) : null}

      {view === "carton" ? (
        <>
          <circle cx="160" cy="150" r="94" fill="#ffffff" opacity="0.45" />
          <g>
            <rect x="66" y="176" width="90" height="82" rx="6" fill={base} />
            <rect x="66" y="176" width="90" height="82" rx="6" fill="#000" opacity="0.1" />
            <rect x="164" y="176" width="90" height="82" rx="6" fill={base} />
            <rect x="115" y="92" width="90" height="82" rx="6" fill={base} />
            <rect x="115" y="92" width="90" height="82" rx="6" fill="#fff" opacity="0.08" />
          </g>
          <g fill="#fdfbf7" opacity="0.9">
            <rect x="78" y="208" width="66" height="8" rx="4" />
            <rect x="176" y="208" width="66" height="8" rx="4" />
            <rect x="127" y="124" width="66" height="8" rx="4" />
          </g>
          <g fill="#fdfbf7" opacity="0.55">
            <rect x="78" y="226" width="42" height="5" rx="2.5" />
            <rect x="176" y="226" width="42" height="5" rx="2.5" />
            <rect x="127" y="142" width="42" height="5" rx="2.5" />
          </g>
          <text
            x="160"
            y="286"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill={label}
            fontFamily="inherit"
          >
            WHOLESALE CARTON
          </text>
        </>
      ) : null}

      <rect x="0" y="272" width="320" height="48" fill={base} opacity="0.12" />
    </svg>
  );
}
