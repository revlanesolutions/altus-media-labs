import Link from "next/link";
export function Brand() {
  return (
    <Link
      href="/"
      className="inline-flex shrink-0 items-center gap-3 text-foreground no-underline max-xs:gap-2"
      aria-label="Altus Media Labs home"
    >
      <svg className="size-8 shrink-0" viewBox="0 0 32 32" aria-hidden="true">
        <rect width="32" height="32" rx="9" fill="#2b59d1" />
        <path
          d="M8 24 15 8h3l7 16h-4l-1.5-4H13l-1.5 4Zm6.2-7h4.1l-2.05-5Z"
          fill="#fff"
        />
      </svg>
      <span className="font-display text-[22px] leading-none tracking-[-0.03em] md:text-[24px] max-xs:text-[20px]">
        Altus Media Labs
      </span>
    </Link>
  );
}
