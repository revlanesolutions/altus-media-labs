import Link from "next/link";

export function Brand() {
  return (
    <Link
      href="/"
      className="group inline-flex shrink-0 items-center gap-3 text-foreground no-underline"
      aria-label="Altus Media Labs home"
    >
      <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-sm shadow-blue-500/25 transition-transform duration-200 group-hover:scale-105">
        <svg
          className="size-5 shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 2L3 20h18L12 2z" />
          <path d="M12 9v7" />
        </svg>
      </div>
      <div className="flex flex-col">
        <span className="font-display text-lg font-bold tracking-tight text-foreground leading-none">
          Altus Media Labs
        </span>
        <span className="mt-1 hidden text-[10px] font-semibold tracking-wider uppercase text-smoke sm:block">
          Growth & Automation Agency
        </span>
      </div>
    </Link>
  );
}
