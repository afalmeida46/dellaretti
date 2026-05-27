import { useEffect, useRef } from "react";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    el.classList.add("animate-fade-in");
  }, []);

  const scrollToContact = () => {
    const el = document.querySelector("#contato");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="inicio"
      className="relative flex flex-col justify-center pt-28 pb-40 min-h-[620px]"
      style={{
        background: "linear-gradient(135deg, #1f3d2b 0%, #183025 40%, #2e6b4d 100%)",
      }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 20%, rgba(255,255,255,0.15) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(255,255,255,0.08) 0%, transparent 50%)
            `,
          }}
        />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-white/3 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl space-y-8">
          <div ref={heroRef}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full counter-badge mb-6">
              <span className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse" />
              <span className="text-white/90 text-sm font-medium">Assessoria Empresarial Premium</span>
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-8"
              style={{ letterSpacing: "-0.01em" }}
            >
              Sua estrutura tributária atual está{" "}
              <span style={{ color: "#86c9a0" }}>drenando o lucro</span>{" "}
              da sua empresa?
            </h1>

            <button
              onClick={scrollToContact}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-base text-white transition-all duration-200 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 mb-8"
              style={{ background: "#2e6b4d" }}
            >
              Diagnóstico de Risco e Margem
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>

            <p className="text-white/75 text-base sm:text-lg leading-relaxed mb-2">
              A contabilidade tradicional foca em gerar guias de impostos. Nós focamos em{" "}
              <strong className="text-white/95">blindar o seu patrimônio</strong>, antecipar os impactos da
              Nova Reforma Tributária e recuperar a margem de lucro do seu negócio.
            </p>
            <p className="text-white/60 text-sm leading-relaxed">
              Consultoria Sênior com 23 anos de expertise e uma infraestrutura com mais de 50 anos de lastro no mercado.
              <br />
              <em className="text-white/50 text-xs">Apenas para empresas com faturamento acima de R$ 360.000/ano.</em>
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 80L1440 80L1440 40C1200 80 960 0 720 40C480 80 240 0 0 40L0 80Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
