import { useState, useEffect } from "react";
import { Menu, X, ChevronRight } from "lucide-react";
import { useLocation } from "wouter";
import logoImg from "@assets/logo-1536x490_1775673942787_1775756810014.png";
import type { QuizFlow } from "@/components/QuizModal";

interface HeaderProps {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  transparent?: boolean;
  onOpenModal?: (flow: QuizFlow) => void;
}

const navLinks = [
  { label: "Sobre nós", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "Contato", href: "#contato" },
  { label: "Aplicativos", href: "#aplicativos" },
  { label: "Área do Cliente", href: "https://vip.acessorias.com/contabilidadedellarettiltda", external: true },
];

export default function Header({ menuOpen, setMenuOpen, transparent = true, onOpenModal }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [, navigate] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNav = (href: string, external?: boolean) => {
    setMenuOpen(false);
    if (external || href.startsWith("http")) {
      window.open(href, "_blank", "noopener,noreferrer");
    } else if (href.startsWith("#") && href.length > 1) {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/");
        setTimeout(() => {
          const el2 = document.querySelector(href);
          if (el2) el2.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
    } else {
      navigate(href);
    }
  };

  const isTransparentMode = transparent && !scrolled;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || !transparent ? "glass-header py-3 shadow-sm" : "py-5"
        }`}
        style={isTransparentMode ? {
          background: "linear-gradient(to bottom, rgba(31,61,43,0.85) 0%, rgba(31,61,43,0.3) 100%)",
        } : undefined}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <button onClick={() => navigate("/")} className="flex items-center flex-shrink-0">
              <img
                src={logoImg}
                alt="Contabilidade Dellaretti"
                className="h-8 w-auto object-contain"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </button>

            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href, link.external)}
                  className="text-white/85 hover:text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-200"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <button
                onClick={() => { setMenuOpen(false); onOpenModal?.("abrir"); }}
                className="font-bold rounded-xl text-white transition-all duration-200 shadow-sm text-xs px-3 py-2 sm:text-sm sm:px-5 sm:py-2.5 hidden sm:block"
                style={{ background: "#2e6b4d" }}
              >
                ABRA SUA EMPRESA
              </button>
              <button
                onClick={() => { setMenuOpen(false); onOpenModal?.("trocar"); }}
                className="font-bold rounded-xl text-white border-2 border-white/50 hover:bg-white/10 hover:border-white/70 transition-all duration-200 text-xs px-3 py-2 sm:text-sm sm:px-5 sm:py-2.5"
              >
                TROQUE DE CONTADOR
              </button>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-all"
                aria-label="Menu"
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-40 mobile-menu pt-20 px-4 pb-8 flex flex-col lg:hidden overflow-y-auto">
          <nav className="flex flex-col gap-1 mt-4">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href, link.external)}
                className="flex items-center justify-between text-white/90 hover:text-white text-base font-medium px-4 py-4 rounded-xl hover:bg-white/10 transition-all border-b border-white/10 last:border-0"
              >
                {link.label}
                <ChevronRight size={16} className="text-white/40" />
              </button>
            ))}
          </nav>
          <div className="mt-auto flex flex-col gap-3 pt-6 border-t border-white/10">
            <button
              onClick={() => { setMenuOpen(false); onOpenModal?.("abrir"); }}
              className="w-full py-3.5 rounded-xl text-white font-bold text-sm transition-all"
              style={{ background: "#2e6b4d" }}
            >
              ABRA SUA EMPRESA
            </button>
            <button
              onClick={() => { setMenuOpen(false); onOpenModal?.("trocar"); }}
              className="w-full py-3.5 rounded-xl text-white border-2 border-white/40 font-bold text-sm hover:bg-white/10 transition-all"
            >
              TROQUE DE CONTADOR
            </button>
          </div>
        </div>
      )}
    </>
  );
}
