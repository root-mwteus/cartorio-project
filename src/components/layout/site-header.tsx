"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/#inicio" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center">
            <Image
              src="/logo-icon-v3.png"
              alt=""
              width={36}
              height={36}
              priority
              className="h-full w-full object-contain"
            />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-serif text-sm font-semibold text-foreground">
              Registro de Imóveis de Bom Conselho
            </span>
            <span className="text-xs text-muted-foreground">
              CNS 074864 — Bom Conselho/PE
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

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground transition-colors hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background md:hidden"
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

        <Button
          size="sm"
          nativeButton={false}
          className="hidden h-9 px-4 sm:inline-flex"
          render={
            <Link href="/#contato">
              <Phone className="h-4 w-4" aria-hidden="true" />
              Fale conosco
            </Link>
          }
        />
      </div>

      {isMenuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Navegação principal mobile"
          className="border-t border-border bg-background px-4 py-4 md:hidden"
        >
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => {
              const isActive = activeSection === sectionIdFromHref(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "block text-sm font-medium hover:text-foreground",
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
