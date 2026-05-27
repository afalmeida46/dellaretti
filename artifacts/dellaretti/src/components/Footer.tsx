import { MapPin, Phone, Mail } from "lucide-react";
import { useLocation } from "wouter";
import logoImg from "@assets/logo-1536x490_1775673942787_1775756810014.png";

const navLinks = [
  { label: "Sobre Nós", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "Contato", href: "#contato" },
  { label: "Aplicativos", href: "#aplicativos" },
];

export default function Footer() {
  const [, navigate] = useLocation();

  const handleNav = (href: string) => {
    if (href.startsWith("#")) {
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

  return (
    <footer style={{ background: "#1f3d2b" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-5 lg:col-span-1">
            <button onClick={() => navigate("/")} className="block">
              <img
                src={logoImg}
                alt="Contabilidade Dellaretti"
                className="h-10 w-auto object-contain"
                style={{ filter: "brightness(0) invert(1)", opacity: 0.9 }}
              />
            </button>
            <p className="text-white/55 text-sm leading-relaxed">
              Mais de 50 anos de expertise contábil ao seu lado,
              com soluções modernas e atendimento personalizado.
            </p>
            <div className="space-y-2.5">
              <div className="flex items-start gap-2.5">
                <MapPin size={14} className="text-white/40 mt-0.5 flex-shrink-0" />
                <p className="text-white/55 text-xs leading-relaxed">
                  R. Minas Gerais 1142<br />
                  Centro, Divinópolis - MG<br />
                  CEP 35500-066
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={14} className="text-white/40 flex-shrink-0" />
                <a href="tel:+553732228889" className="text-white/55 text-xs hover:text-white/80 transition-colors">
                  (37) 3222-8889
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail size={14} className="text-white/40 flex-shrink-0 mt-0.5" />
                <a href="mailto:contato@contabilidadedellaretti.com.br" className="text-white/55 text-xs hover:text-white/80 transition-colors break-all">
                  contato@contabilidadedellaretti.com.br
                </a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold text-sm mb-5 tracking-wide">Links Úteis</h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNav(link.href)}
                    className="text-white/55 text-sm hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#2e6b4d] group-hover:bg-white transition-colors" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-sm mb-5 tracking-wide">Outros Links</h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => navigate("/politica-de-privacidade")}
                  className="text-white/55 text-sm hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 rounded-full bg-[#2e6b4d] group-hover:bg-white transition-colors" />
                  Política de Privacidade
                </button>
              </li>
              <li>
                <a
                  href="https://vip.acessorias.com/contabilidadedellarettiltda"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/55 text-sm hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 rounded-full bg-[#2e6b4d] group-hover:bg-white transition-colors" />
                  Área do Cliente
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-sm mb-5 tracking-wide">Nossas Redes Sociais</h3>
            <p className="text-white/55 text-xs leading-relaxed mb-5">
              Acompanhe-nos através das nossas redes sociais e fique por dentro de tudo o que acontece
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/contabilidadedellaretti"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all"
                aria-label="Facebook"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/contabilidadedellaretti"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all"
                aria-label="Instagram"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-xs text-center sm:text-left">
            © Copyright 2024 — Todos os direitos reservados.{" "}
            <span className="text-white/60 font-semibold">Contabilidade Dellaretti Ltda.</span>
          </p>
          <p className="text-white/30 text-xs text-center sm:text-right">
            CNPJ: 04.853.832/0001-01
          </p>
        </div>
      </div>
    </footer>
  );
}
