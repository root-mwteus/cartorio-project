"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Phone, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

const navLinks = [
  { label: "Serviços", href: "/#servicos" },
  { label: "Prazos", href: "/#prazos" },
  { label: "Contato", href: "/#contato" },
  { label: "Emolumentos", href: "/emolumentos" },
  { label: "Dúvidas", href: "/faq" },
  { label: "Sobre", href: "/sobre" },
];

const mobileOnlyLinks = [
  { label: "Início", href: "/#inicio" },
  { label: "Agendar visita", href: "/agendar" },
  { label: "Enviar documentos", href: "/enviar-documentos" },
  { label: "Ouvidoria", href: "/ouvidoria" },
  { label: "Aviso de Privacidade", href: "/privacidade" },
];

function sectionIdFromHref(href: string) {
  return href.startsWith("/#") ? href.replace("/#", "") : null;
}

export function SiteHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const sections = ["inicio", "servicos", "prazos", "contato"]
      .map((id) => document.getElementById(id))
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

  const isActive = (href: string) => {
    const section = sectionIdFromHref(href);
    return section ? pathname === "/" && activeSection === section : pathname === href;
  };

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-paper">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link href="/#inicio" className="flex min-h-11 min-w-0 items-center gap-2.5">
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
            <span className="font-serif text-base font-medium text-foreground">
              {siteConfig.tradeName}
            </span>
            <span className="text-xs tabular-nums text-muted-foreground">
              CNS {siteConfig.cns}
              <span className="hidden sm:inline">, {siteConfig.address.city}/{siteConfig.address.state}</span>
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Navegação principal">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative py-2 text-sm font-medium transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:origin-left after:bg-wine after:transition-transform after:duration-200 hover:text-foreground",
                  active ? "text-foreground after:scale-x-100" : "text-muted-foreground after:scale-x-0 hover:after:scale-x-100",
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
            className="h-11 w-11 rounded-sm px-0 sm:h-10 sm:w-auto sm:gap-2 sm:px-4 sm:text-sm"
            render={
              <Link href="/#contato">
                <Phone className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only sm:not-sr-only">Contato</span>
              </Link>
            }
          />

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:text-foreground lg:hidden"
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
          className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-rule bg-paper px-4 py-3 sm:px-6 lg:hidden"
        >
          <ul className="flex flex-col">
            {[...mobileOnlyLinks.slice(0, 1), ...navLinks, ...mobileOnlyLinks.slice(1)].map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.href} className="border-b border-rule last:border-b-0">
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "block py-3.5 font-serif text-xl hover:text-foreground",
                      active ? "italic text-foreground" : "text-ink-muted",
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
