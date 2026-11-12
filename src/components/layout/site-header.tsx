"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, MessageCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";
import { generalMessage, whatsappLink } from "@/lib/whatsapp";
import { ExpedienteStatus } from "@/components/sections/expediente-status";

const navLinks = [
  { label: "Assuntos", href: "/#assuntos" },
  { label: "Serviços", href: "/#servicos" },
  { label: "Certidões", href: "/#prazos" },
  { label: "Como funciona", href: "/#como-funciona" },
  { label: "Onde estamos", href: "/#contato" },
];

const mobileOnlyLinks = [
  { label: "Início", href: "/#inicio" },
  { label: "Emolumentos", href: "/emolumentos" },
  { label: "Dúvidas frequentes", href: "/faq" },
  { label: "Sobre a serventia", href: "/sobre" },
  { label: "Ouvidoria", href: "/ouvidoria" },
  { label: "Aviso de Privacidade", href: "/privacidade" },
];

const sectionIds = ["inicio", "assuntos", "servicos", "prazos", "como-funciona", "contato"];

function sectionIdFromHref(href: string) {
  return href.startsWith("/#") ? href.replace("/#", "") : null;
}

export function SiteHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const sections = sectionIds
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
    <header className="sticky top-0 z-50 bg-wine-deep font-grotesk text-paper">
      <div className="hidden h-9 items-center justify-between border-b border-gold/25 px-5 text-[0.95rem] font-bold sm:flex sm:px-8 lg:px-16">
        <ExpedienteStatus tone="dark" className="font-sans" />
        <p className="flex gap-7 tabular-nums text-paper/75">
          <span>CNS {siteConfig.cns}</span>
          <span>
            {siteConfig.address.city}/{siteConfig.address.state}
          </span>
          <a href={`tel:+55${siteConfig.phoneDisplay.replace(/\D/g, "")}`} className="text-paper hover:text-gold">
            {siteConfig.phoneDisplay}
          </a>
        </p>
      </div>

      <div className="flex h-18 items-center justify-between gap-3 border-b border-gold/25 px-5 sm:px-8 lg:px-16">
        <Link href="/#inicio" className="flex min-h-11 min-w-0 items-center gap-3">
          <Image src="/logo-icon-v3.png" alt="" width={38} height={38} priority className="h-9.5 w-9.5 shrink-0 object-contain" />
          <span className="truncate text-[1.6rem] font-extrabold leading-none tracking-[-0.01em]">
            {siteConfig.tradeName}
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Navegação principal">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative py-2 text-xl font-bold transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:origin-left after:bg-gold after:transition-transform after:duration-200 hover:text-paper",
                  active ? "text-paper after:scale-x-100" : "text-paper/75 after:scale-x-0 hover:after:scale-x-100",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-1">
          <a
            href={whatsappLink(generalMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-sm border border-gold px-3 text-xl font-extrabold text-gold transition-colors hover:bg-gold hover:text-wine-deep sm:px-5"
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            <span className="sr-only sm:not-sr-only">Falar no WhatsApp</span>
            <span className="sr-only"> (abre em nova aba)</span>
          </a>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-sm text-paper/80 transition-colors hover:text-paper lg:hidden"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            {isMenuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Navegação principal mobile"
          className="max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-b border-gold/25 bg-wine-deep px-5 py-3 sm:px-8 lg:hidden"
        >
          <ul className="flex flex-col">
            {[...mobileOnlyLinks.slice(0, 1), ...navLinks, ...mobileOnlyLinks.slice(1)].map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.href} className="border-b border-gold/20 last:border-b-0">
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn("block py-3.5 text-[1.7rem] font-extrabold leading-none", active ? "text-gold" : "text-paper/85 hover:text-paper")}
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
