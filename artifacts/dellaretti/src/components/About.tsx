import { Award } from "lucide-react";

export default function About() {
  return (
    <section id="sobre" className="py-14 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="relative order-2 lg:order-1">
            <div
              className="relative rounded-3xl overflow-hidden"
              style={{ minHeight: "320px", height: "clamp(320px, 50vw, 480px)" }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(135deg, #1f3d2b 0%, #2e6b4d 100%)",
                }}
              />
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `repeating-linear-gradient(45deg, rgba(255,255,255,0.1) 0px, rgba(255,255,255,0.1) 1px, transparent 1px, transparent 40px)`,
                }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-20 h-20 rounded-2xl bg-white/15 flex items-center justify-center mb-6 border border-white/20">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" fill="white" opacity="0.9"/>
                    <path d="M9 22V12h6v10" fill="rgba(255,255,255,0.5)"/>
                  </svg>
                </div>
                <h3 className="text-white font-black text-3xl mb-2">50+</h3>
                <p className="text-white/70 font-medium">Anos de Tradição</p>
                <div className="mt-8 w-full max-w-xs flex flex-col gap-3">
                  <div className="flex gap-3 justify-center">
                    {[
                      { n: "500+", l: "Clientes" },
                      { n: "23+", l: "Anos de Consultoria Sênior" },
                    ].map((item) => (
                      <div
                        key={item.n}
                        className="flex-1 rounded-2xl p-4 text-center"
                        style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)" }}
                      >
                        <div className="text-white font-black text-xl">{item.n}</div>
                        <div className="text-white/65 text-xs mt-0.5">{item.l}</div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center">
                    <div
                      className="w-1/2 rounded-2xl p-4 text-center"
                      style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)" }}
                    >
                      <div className="text-white font-black text-xl">100%</div>
                      <div className="text-white/65 text-xs mt-0.5">Comprometimento</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 hidden lg:block">
              <div className="glass-card rounded-2xl p-5 shadow-xl border border-[#1f3d2b]/10" style={{ maxWidth: "220px" }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#1f3d2b]/10 flex items-center justify-center flex-shrink-0">
                    <Award size={18} className="text-[#1f3d2b]" />
                  </div>
                  <div>
                    <p className="text-[#1f3d2b] font-bold text-sm">Referência no mercado</p>
                    <p className="text-[#1f3d2b]/60 text-xs mt-0.5">Divinópolis - MG</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 space-y-6">
            <div>
              <span className="inline-block text-[#2e6b4d] text-sm font-bold tracking-wider uppercase mb-3">
                Quem somos
              </span>
              <h2 className="text-4xl lg:text-5xl font-black text-[#1f3d2b] leading-tight">
                Meio Século de Lastro:
                <br />
                <span className="text-[#2e6b4d]">O Peso da Nossa Assinatura</span>
              </h2>
            </div>

            <p className="text-gray-600 text-lg leading-relaxed">
              Com 50 anos de operação ininterrupta, nós atravessamos todas as crises e reformas fiscais do Brasil.
              Não somos aventureiros testando modelos contábeis com o seu patrimônio.
            </p>

            <p className="text-gray-600 text-base leading-relaxed">
              Colocar seu CNPJ sob o nosso guarda-chuva significa{" "}
              <strong className="text-[#1f3d2b]">blindar sua empresa com o peso institucional de meio século</strong>{" "}
              perante o Fisco, guiado por uma consultoria sênior com mais de{" "}
              <strong className="text-[#1f3d2b]">23 anos na linha de frente da engenharia tributária</strong>.
            </p>

            <div className="pt-4">
              <button
                onClick={() => {
                  const el = document.querySelector("#servicos");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-white transition-all duration-200 hover:-translate-y-0.5"
                style={{ background: "#2e6b4d" }}
              >
                Conheça nossos pilares
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
