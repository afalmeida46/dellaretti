import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import PlansSection from "@/components/PlansSection";

const reasons = [
  "Atendimento humanizado e ágil",
  "Tecnologia e sistemas modernos",
  "Mais de 50 anos de experiência no mercado",
  "Abertura de empresa grátis incluída",
  "Transição sem burocracia e sem sair de casa",
];

export default function TroqueDeContadorPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [, navigate] = useLocation();
  const [fromForm, setFromForm] = useState(false);
  const [leadName, setLeadName] = useState("");

  useEffect(() => {
    document.title = "Troque de Contador | Contabilidade Dellaretti";
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
        className="pt-28 pb-20 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #183025 0%, #1f3d2b 50%, #2e6b4d 100%)" }}
      >
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm font-medium mb-8 transition-colors"
          >
            <ArrowLeft size={16} />
            Voltar ao site
          </button>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)" }}>
                <span className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse" />
                <span className="text-white/90 text-sm font-medium">Migração simples e sem burocracia</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-6">
                Troque de contador
                <br />
                <span style={{ color: "#86c9a0" }}>sem complicação</span>
              </h1>
              <p className="text-white/70 text-lg leading-relaxed mb-8">
                Migre para a Dellaretti com toda a segurança. Nossa equipe cuida 
                de todo o processo de transição, sem interromper a gestão da sua empresa.
              </p>
              <div className="space-y-3">
                {reasons.map((r) => (
                  <div key={r} className="flex items-center gap-3">
                    <CheckCircle2 size={18} className="flex-shrink-0" style={{ color: "#86c9a0" }} />
                    <span className="text-white/85 text-sm font-medium">{r}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden lg:block">
              <div
                className="rounded-3xl p-8 space-y-4"
                style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}
              >
                <h3 className="text-white font-bold text-lg">Como funciona a migração?</h3>
                {[
                  { n: "01", t: "Escolha seu plano", d: "Selecione o plano ideal para o seu negócio." },
                  { n: "02", t: "Fale com nossa equipe", d: "Entre em contato e iniciamos o processo sem burocracia." },
                  { n: "03", t: "Transferência de documentos", d: "Nossa equipe solicita tudo ao seu contador anterior." },
                  { n: "04", t: "Pronto! Você está na Dellaretti", d: "Gestão contábil completa do seu negócio." },
                ].map((step) => (
                  <div key={step.n} className="flex gap-4 items-start">
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-white font-black text-xs"
                      style={{ background: "#2e6b4d" }}
                    >
                      {step.n}
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">{step.t}</p>
                      <p className="text-white/55 text-xs mt-0.5">{step.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 60L1440 60L1440 30C1200 60 960 0 720 30C480 60 240 0 0 30L0 60Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Plans */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
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
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-[#1f3d2b] mb-3">Escolha seu plano</h2>
            <p className="text-gray-500">Os mesmos benefícios, com preços para o seu tipo de negócio.</p>
          </div>
          <PlansSection />
        </div>
      </section>

      <Footer />
      <WhatsAppFAB />
    </div>
  );
}
