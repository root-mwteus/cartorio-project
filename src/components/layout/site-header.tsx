"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

const navLinks = [
  { label: "Início", href: "/#inicio" },
  { label: "Serviços", href: "/#servicos" },
  { label: "Prazos", href: "/#prazos" },
  { label: "Contato", href: "/#contato" },
];

function sectionIdFromHref(href: string) {
  return href.replace("/#", "");
}

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.getElementById(sectionIdFromHref(link.href)))
      .filter((section): section is HTMLElement => section !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) {
          setActiveSection(visible.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-paper/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link href="/#inicio" className="flex min-w-0 items-center gap-2.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center">
            <Image
              src="/logo-icon-v3.png"
              alt=""
              width={36}
              height={36}
              priority
              className="h-full w-full object-contain"
            />
          </span>
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="font-serif text-sm font-semibold text-foreground">
              <span className="lg:hidden">{siteConfig.tradeName}</span>
              <span className="hidden lg:inline">{siteConfig.name}</span>
            </span>
            <span className="text-xs text-muted-foreground">
              <span className="hidden lg:inline">{siteConfig.tradeName} · </span>CNS {siteConfig.cns} — {siteConfig.address.city}/{siteConfig.address.state}
            </span>
          </span>
        </Link>

        <nav
          className="hidden items-center gap-6 md:flex"
          aria-label="Navegação principal"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === sectionIdFromHref(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-foreground",
                  isActive ? "font-semibold text-foreground" : "text-muted-foreground",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-1">
          <Button
            size="sm"
            nativeButton={false}
            className="h-11 w-11 rounded-sm px-0 sm:h-9 sm:w-auto sm:px-4"
            render={
              <Link href="/#contato">
                <Phone className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only sm:not-sr-only">Fale conosco</span>
              </Link>
            }
          />

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background md:hidden"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Navegação principal mobile"
          className="border-t border-rule bg-paper px-4 py-3 md:hidden"
        >
          <ul className="flex flex-col">
            {navLinks.map((link) => {
              const isActive = activeSection === sectionIdFromHref(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "block py-3 text-sm font-medium hover:text-foreground",
                      isActive ? "font-semibold text-foreground" : "text-muted-foreground",
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}
