"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/lib/cart";
import { setLang, useLang, useT } from "@/lib/i18n";
import { mainNav } from "@/lib/site";
import { Logo } from "./brand";
import { IconCart, IconClose, IconGrid, IconHelp, IconHome, IconMenu, IconSliders } from "./icons";

export function Header() {
  const [open, setOpen] = useState(false);
  const items = useCart();
  const t = useT();
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      <div className="container-page flex h-16 items-center gap-4 lg:h-[4.5rem]">
        <Link href="/" className="shrink-0 rounded-md" aria-label="Retail Branding — home" onClick={close}>
          <Logo eager />
        </Link>

        <nav aria-label="Main" className="ml-4 hidden flex-1 xl:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="whitespace-nowrap rounded-md px-2.5 py-2 text-[15px] font-semibold text-ink hover:bg-navy-50 hover:text-navy"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <LangToggle />
          <Link
            href="/cart"
            // Below md the cart lives in the bottom navigation.
            className="relative hidden size-11 items-center justify-center rounded-full text-navy hover:bg-navy-50 md:inline-flex"
            aria-label={`${t("cart")}, ${items.length} item${items.length === 1 ? "" : "s"}`}
          >
            <IconCart width={22} height={22} />
            {items.length > 0 && (
              <span className="absolute right-0.5 top-0.5 grid min-w-5 place-items-center rounded-full bg-yellow px-1 text-xs font-extrabold text-navy-900">
                {items.length}
              </span>
            )}
          </Link>
          <Link href="/quote" className="btn btn-primary hidden md:inline-flex">
            {t("requestQuote")}
          </Link>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full text-navy hover:bg-navy-50 xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <IconClose width={24} height={24} /> : <IconMenu width={24} height={24} />}
            <span className="sr-only">{t("menu")}</span>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-white xl:hidden"
      >
        <nav aria-label="Mobile" className="container-page py-4">
          <ul className="grid gap-1">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={close}
                  className="block rounded-lg px-3 py-3 text-lg font-semibold text-ink hover:bg-navy-50"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <Link href="/customize" onClick={close} className="btn btn-secondary">
              {t("customizeGetPrice")}
            </Link>
            <Link href="/quote" onClick={close} className="btn btn-primary">
              {t("requestQuote")}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

function LangToggle() {
  const lang = useLang();
  return (
    <div role="group" aria-label="Language" className="flex rounded-full border border-line p-0.5 text-sm font-bold">
      <button
        type="button"
        onClick={() => setLang("bn")}
        aria-pressed={lang === "bn"}
        lang="bn"
        className={`min-h-9 rounded-full px-2.5 ${lang === "bn" ? "bg-navy text-white" : "text-navy"}`}
      >
        বাংলা
      </button>
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        className={`min-h-9 rounded-full px-2.5 ${lang === "en" ? "bg-navy text-white" : "text-navy"}`}
      >
        EN
      </button>
    </div>
  );
}

export function MobileBottomNav() {
  const t = useT();
  const items = useCart();
  const links = [
    { href: "/", label: t("home"), Icon: IconHome },
    { href: "/products", label: t("categories"), Icon: IconGrid },
    { href: "/customize", label: t("customize"), Icon: IconSliders },
    { href: "/cart", label: t("cart"), Icon: IconCart, badge: items.length },
    { href: "/contact", label: t("help"), Icon: IconHelp },
  ];
  return (
    <nav
      aria-label="Quick links"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      <ul className="grid grid-cols-5">
        {links.map(({ href, label, Icon, badge }) => (
          <li key={href}>
            <Link href={href} className="relative flex min-h-14 flex-col items-center justify-center gap-0.5 text-[11px] font-semibold text-navy">
              <Icon width={22} height={22} />
              <span className="leading-none">{label}</span>
              {!!badge && (
                <span className="absolute right-[calc(50%-1.25rem)] top-1.5 grid min-w-4 place-items-center rounded-full bg-yellow px-1 text-[10px] font-extrabold text-navy-900">
                  {badge}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
