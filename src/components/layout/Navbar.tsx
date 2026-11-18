"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Sparkles,
  Laptop,
  Palette,
  Share2,
  TrendingUp,
  Search,
} from "lucide-react";
import type { ServiceOption } from "@/data/content-types";
import { Brand } from "@/components/site/Brand";

const serviceIcons: Record<string, React.ReactNode> = {
  "ai-business-automation": <Sparkles size={18} className="text-primary" />,
  "web-development": <Laptop size={18} className="text-primary" />,
  "branding-design": <Palette size={18} className="text-primary" />,
  "social-media-management": <Share2 size={18} className="text-primary" />,
  "paid-marketing": <TrendingUp size={18} className="text-primary" />,
  "search-engine-optimization": <Search size={18} className="text-primary" />,
};

const links = [
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
];

function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

function isScrolled() {
  return window.scrollY > 16;
}

function serverScrollSnapshot() {
  return false;
}

export function Navbar({ services }: { services: ServiceOption[] }) {
  const pathname = usePathname() || "/";
  const [mobile, setMobile] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const scrolled = useSyncExternalStore(
    subscribeToScroll,
    isScrolled,
    serverScrollSnapshot,
  );

  const toggle = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  const disclosure = useRef<HTMLButtonElement>(null);
  const desktop = useRef<HTMLDivElement>(null);

  const active = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);
  const close = () => {
    setMobile(false);
    setDropdown(false);
  };

  useEffect(() => {
    if (!mobile) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const main = document.querySelector("main");
    const footer = document.querySelector("footer");
    main?.setAttribute("inert", "");
    footer?.setAttribute("inert", "");

    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobile(false);
        toggle.current?.focus();
      }
    };
    const resize = () => {
      if (window.innerWidth >= 1024) {
        setMobile(false);
      }
    };
    document.addEventListener("keydown", key);
    window.addEventListener("resize", resize);
    return () => {
      document.body.style.overflow = previous;
      main?.removeAttribute("inert");
      footer?.removeAttribute("inert");
      document.removeEventListener("keydown", key);
      window.removeEventListener("resize", resize);
    };
  }, [mobile]);

  useEffect(() => {
    if (!dropdown) return;
    const dismiss = (e: PointerEvent) => {
      if (!desktop.current?.contains(e.target as Node)) setDropdown(false);
    };
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDropdown(false);
        disclosure.current?.focus();
      }
    };
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      document.removeEventListener("keydown", key);
    };
  }, [dropdown]);

  const navBackground = scrolled
    ? "bg-white/95 backdrop-blur-md border-border/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)]"
    : "bg-white/80 backdrop-blur-sm border-border/60";

  return (
    <>
      <header
        ref={header}
        className={`fixed inset-x-0 top-0 z-50 h-[76px] border-b transition-all duration-200 md:h-[84px] ${navBackground}`}
        aria-label="Main navigation"
      >
        <div className="site-container flex h-full items-center justify-between gap-4">
          <Brand />

          {/* Desktop Navigation */}
          <nav
            aria-label="Desktop menu"
            className="hidden items-center gap-1 lg:flex xl:gap-2"
          >
            {/* Services Mega Dropdown */}
            <div
              className="relative"
              ref={desktop}
              onPointerLeave={(e) => {
                if (
                  e.pointerType === "mouse" &&
                  !e.currentTarget.contains(document.activeElement)
                ) {
                  setDropdown(false);
                }
              }}
            >
              <div className="flex items-center">
                <Link
                  href="/services"
                  className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-semibold transition-colors ${
                    active("/services")
                      ? "bg-blue-soft text-primary font-bold"
                      : "text-graphite hover:text-foreground hover:bg-muted"
                  }`}
                  onPointerEnter={(e) => {
                    if (e.pointerType === "mouse") setDropdown(true);
                  }}
                  onClick={close}
                >
                  Services
                  <ChevronDown
                    size={15}
                    className={`transition-transform duration-200 ${
                      dropdown ? "rotate-180 text-primary" : "text-smoke"
                    }`}
                  />
                </Link>
              </div>

              {dropdown && (
                <div
                  id="services-menu"
                  className="absolute top-full -left-12 mt-2 w-[480px] rounded-2xl border border-border/90 bg-white p-4 shadow-[0_16px_40px_-8px_rgba(15,23,42,0.12)] transition-all animate-in fade-in slide-in-from-top-2 duration-150"
                  onPointerLeave={() => setDropdown(false)}
                >
                  <div className="mb-2 px-3 pt-1">
                    <span className="text-xs font-bold tracking-wider uppercase text-smoke">
                      Our Disciplines
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {services.map((s) => (
                      <Link
                        key={s.slug}
                        href={`/services/${s.slug}`}
                        className="group flex flex-col gap-1 rounded-xl p-3 text-inherit no-underline transition-colors hover:bg-blue-soft"
                        onClick={close}
                      >
                        <div className="flex items-center gap-2">
                          <span className="shrink-0 transition-transform duration-150 group-hover:scale-110">
                            {serviceIcons[s.slug] || (
                              <Sparkles size={16} className="text-primary" />
                            )}
                          </span>
                          <span className="text-sm font-semibold text-foreground group-hover:text-primary leading-tight">
                            {s.shortTitle}
                          </span>
                        </div>
                        {s.tagline && (
                          <span className="text-xs text-smoke line-clamp-1 pl-6">
                            {s.tagline}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                  <div className="mt-3 border-t border-border/70 pt-3 px-3">
                    <Link
                      href="/services"
                      className="inline-flex items-center gap-2 text-xs font-semibold text-primary hover:underline"
                      onClick={close}
                    >
                      View all 6 service disciplines
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Standard Nav Links */}
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`inline-flex items-center rounded-full px-3.5 py-2 text-sm font-semibold transition-colors ${
                  active(l.href)
                    ? "bg-blue-soft text-primary font-bold"
                    : "text-graphite hover:text-foreground hover:bg-muted"
                }`}
                onClick={close}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Right Action */}
          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="/contact"
              className="button button-primary text-sm !min-h-[42px] !py-2 !px-5"
            >
              Start a project
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            ref={toggle}
            className="inline-flex size-10 items-center justify-center rounded-full border border-border/80 text-foreground transition-colors hover:bg-muted lg:hidden"
            onClick={() => setMobile(!mobile)}
            aria-label={mobile ? "Close menu" : "Open menu"}
            aria-expanded={mobile}
            aria-controls="mobile-menu"
          >
            {mobile ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobile && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 top-[76px] bottom-0 z-40 overflow-y-auto overscroll-contain bg-white p-6 md:top-[84px]"
        >
          <nav aria-label="Mobile navigation" className="flex flex-col gap-2">
            <div>
              <Link
                href="/services"
                className={`flex items-center justify-between rounded-xl p-3 text-lg font-semibold transition-colors ${
                  active("/services")
                    ? "bg-blue-soft text-primary font-bold"
                    : "text-foreground hover:bg-muted"
                }`}
                onClick={close}
              >
                Services
                <ArrowRight size={18} className="text-smoke" />
              </Link>
              <div className="my-2 ml-4 border-l-2 border-border/80 pl-4 space-y-1">
                {services.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className="block rounded-lg py-2 px-2 text-sm font-medium text-graphite hover:text-primary hover:bg-blue-soft transition-colors"
                    onClick={close}
                  >
                    {s.shortTitle}
                  </Link>
                ))}
              </div>
            </div>

            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`flex items-center justify-between rounded-xl p-3 text-lg font-semibold transition-colors ${
                  active(l.href)
                    ? "bg-blue-soft text-primary font-bold"
                    : "text-foreground hover:bg-muted"
                }`}
                onClick={close}
              >
                {l.label}
                <ArrowRight size={18} className="text-smoke" />
              </Link>
            ))}

            <div className="mt-6 border-t border-border pt-6">
              <Link
                href="/contact"
                className="button button-primary w-full"
                onClick={close}
              >
                Start a project
                <ArrowRight size={16} />
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
