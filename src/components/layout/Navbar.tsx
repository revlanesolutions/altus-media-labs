"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import type { ServiceOption } from "@/data/content-types";
import { Brand } from "@/components/site/Brand";
const links = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
];

function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

function isScrolled() {
  return window.scrollY > 24;
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
  const blendsWithHero = pathname === "/" && !scrolled && !mobile;
  const background = mobile
    ? "border-border bg-background"
    : scrolled
      ? "border-border bg-background/80 backdrop-blur-md"
      : blendsWithHero
        ? "border-transparent bg-transparent"
        : "border-border bg-background";
  const toggle = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  const disclosure = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
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
    panel.current?.querySelector<HTMLElement>("a")?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobile(false);
        toggle.current?.focus();
      }
      if (e.key === "Tab") {
        const nodes = [
          ...Array.from(
            header.current?.querySelectorAll<HTMLElement>("a,button") ?? [],
          ),
          ...Array.from(
            panel.current?.querySelectorAll<HTMLElement>("a,button") ?? [],
          ),
        ].filter((node) => node.getClientRects().length > 0);
        const first = nodes[0],
          last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
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
  return (
    <>
      <nav
        ref={header}
        className={`fixed inset-x-0 top-0 z-50 h-[76px] border-b transition-colors duration-200 md:h-[88px] ${background}`}
        aria-label="Main navigation"
      >
        <div className="site-container flex h-full items-center justify-between gap-4 wide:gap-6">
          <Brand />
          <div className="hidden items-center gap-[14px] lg:flex wide:gap-6">
            <div
              className="relative flex items-center gap-0.5"
              ref={desktop}
              onPointerLeave={(e) => {
                if (
                  e.pointerType === "mouse" &&
                  !e.currentTarget.contains(document.activeElement)
                )
                  setDropdown(false);
              }}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node))
                  setDropdown(false);
              }}
            >
              <Link
                href="/services"
                className="inline-flex min-h-11 items-center border-b-2 border-transparent text-[16px] text-graphite no-underline hover:text-primary hover:border-primary aria-[current=page]:text-primary aria-[current=page]:border-primary"
                aria-current={active("/services") ? "page" : undefined}
                onPointerEnter={(e) => {
                  if (e.pointerType === "mouse") setDropdown(true);
                }}
                onClick={close}
              >
                Services
              </Link>
              <button
                ref={disclosure}
                className="inline-flex size-6 items-center justify-center rounded-[50%] hover:bg-blue-soft"
                aria-label="Explore services"
                aria-expanded={dropdown}
                aria-controls="services-menu"
                onClick={() => setDropdown(!dropdown)}
              >
                <ChevronDown size={16} />
              </button>
              {dropdown && (
                <div
                  id="services-menu"
                  className="absolute top-full -left-6 w-[310px] rounded-[16px] border border-border bg-card p-3 shadow-[0_8px_24px_var(--color-shadow)]"
                >
                  {services.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      className="block rounded-[8px] p-3 text-[16px] no-underline hover:bg-blue-soft"
                      onClick={close}
                    >
                      {s.shortTitle}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            {links.slice(1).map((l) => (
              <Link
                className="inline-flex min-h-11 items-center border-b-2 border-transparent text-[16px] text-graphite no-underline hover:text-primary hover:border-primary aria-[current=page]:text-primary aria-[current=page]:border-primary"
                key={l.href}
                href={l.href}
                aria-current={active(l.href) ? "page" : undefined}
                onClick={close}
              >
                {l.label}
              </Link>
            ))}

            <Link
              href="/contact"
              className="button button-primary hidden lg:inline-flex"
            >
              Start a project <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>

          <button
            ref={toggle}
            className="inline-flex size-11 items-center justify-center rounded-[50%] hover:bg-blue-soft lg:hidden"
            onClick={() => setMobile(!mobile)}
            aria-label={mobile ? "Close menu" : "Open menu"}
            aria-expanded={mobile}
            aria-controls="mobile-menu"
          >
            {mobile ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>
      {mobile && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 top-[76px] bottom-0 z-[49] overflow-y-auto overscroll-contain bg-background p-6 md:top-[88px]"
          ref={panel}
        >
          <nav aria-label="Mobile navigation">
            {links.map((l) => (
              <div key={l.href}>
                <Link
                  className="flex min-h-11 items-center border-b-2 border-transparent py-2.5 text-[22px] text-graphite no-underline hover:text-primary aria-[current=page]:text-primary"
                  href={l.href}
                  aria-current={active(l.href) ? "page" : undefined}
                  onClick={close}
                >
                  {l.label}
                </Link>
                {l.href === "/services" && (
                  <div className="border-l border-border pt-2 pb-4 pl-5">
                    {services.map((s) => (
                      <Link
                        key={s.slug}
                        href={`/services/${s.slug}`}
                        className="flex min-h-11 items-center text-[16px] no-underline"
                        onClick={close}
                      >
                        {s.shortTitle}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link
              href="/contact"
              className="button button-primary mt-6"
              onClick={close}
            >
              Start a project <ArrowRight size={16} />
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
