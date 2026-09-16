export function IncenseLoader({
  label,
  labelAccent,
}: {
  label: string;
  labelAccent?: string;
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center justify-center gap-3 py-10"
    >
      <svg viewBox="0 0 120 150" className="h-36 w-28" aria-hidden="true">
        <g
          stroke="var(--color-muted)"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.6"
        >
          <path className="smoke-curl" d="M60 58c-16-16 14-26 0-44" />
          <path className="smoke-curl" d="M60 48c-14-14 12-24 0-40" />
          <path className="smoke-curl" d="M60 66c-15-15 13-25 0-42" />
        </g>

        <rect x="58" y="62" width="4" height="58" rx="2" fill="var(--color-ink)" />
        <circle className="ember-dot" cx="60" cy="62" r="4" fill="var(--color-brand)" />

        <path
          d="M34 120h52l-6 14a4 4 0 0 1-3.6 2.4H43.6A4 4 0 0 1 40 134z"
          fill="var(--color-brand)"
        />
        <rect x="30" y="114" width="60" height="7" rx="3.5" fill="var(--color-ink)" />
      </svg>

      <p className="text-sm font-medium text-muted">{label}</p>
      {labelAccent ? (
        <p className="font-hindi text-sm text-brand">{labelAccent}</p>
      ) : null}
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-card border border-line bg-white">
      <div className="aspect-square w-full animate-pulse bg-clay" />
      <div className="space-y-3 p-5">
        <div className="h-2.5 w-20 animate-pulse rounded bg-line" />
        <div className="h-4 w-32 animate-pulse rounded bg-line" />
        <div className="h-3 w-full animate-pulse rounded bg-line" />
        <div className="h-9 w-full animate-pulse rounded-lg bg-line" />
      </div>
    </div>
  );
}
