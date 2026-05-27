import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import PlansSection from "@/components/PlansSection";

export default function AbraSuaEmpresaPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [, navigate] = useLocation();
  const [fromForm, setFromForm] = useState(false);
  const [leadName, setLeadName] = useState("");

  useEffect(() => {
    document.title = "Abra sua Empresa | Contabilidade Dellaretti";
    window.scrollTo({ top: 0, behavior: "smooth" });
    const params = new URLSearchParams(window.location.search);
    if (params.get("from") === "form") {
      setFromForm(true);
      try {
        const lead = JSON.parse(sessionStorage.getItem("dellaretti:lead") || "{}");
        if (lead.nome) setLeadName(String(lead.nome).split(" ")[0]);
      } catch {}
    }
  }, []);

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} transparent={false} />

      {/* Hero banner */}
      <section
        className="pt-24 sm:pt-28 pb-20 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1f3d2b 0%, #183025 40%, #2e6b4d 100%)" }}
      >
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Back button - left aligned */}
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm font-medium mb-8 transition-colors"
          >
            <ArrowLeft size={16} />
            Voltar ao site
          </button>

          {/* Badge + title - centered */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)" }}>
              <span className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse" />
              <span className="text-white/90 text-sm font-medium">Abertura de Empresa Gratuita</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-6">
              Abra sua empresa com
              <br />
              <span style={{ color: "#86c9a0" }}>quem entende de negócios</span>
            </h1>
            <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Da abertura do CNPJ até a gestão contábil completa. Escolha o plano ideal
              para sua empresa e comece agora, sem sair de casa.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 60L1440 60L1440 30C1200 60 960 0 720 30C480 60 240 0 0 30L0 60Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Plans */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {fromForm && (
            <div
              className="mb-10 rounded-2xl p-5 sm:p-6 flex items-start gap-4 max-w-3xl mx-auto"
              style={{ background: "rgba(46,107,77,0.08)", border: "1px solid rgba(46,107,77,0.25)" }}
            >
              <CheckCircle2 size={28} className="flex-shrink-0 mt-0.5" style={{ color: "#2e6b4d" }} />
              <div>
                <p className="text-[#1f3d2b] font-bold text-base sm:text-lg">
                  {leadName ? `Tudo certo, ${leadName}!` : "Tudo certo!"} Recebemos seus dados.
                </p>
                <p className="text-gray-600 text-sm mt-1">
                  Agora escolha o plano ideal para sua empresa abaixo e clique em <strong>CONTRATAR</strong> para finalizar a compra.
                </p>
              </div>
            </div>
          )}
          <PlansSection />
        </div>
      </section>

      <Footer />
      <WhatsAppFAB />
    </div>
  );
}
