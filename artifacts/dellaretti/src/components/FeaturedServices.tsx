import { AlertTriangle, TrendingDown, Shield, Clock, Target } from "lucide-react";

function PillarItem({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-2xl" style={{ background: "rgba(255,255,255,0.07)" }}>
      <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center text-white flex-shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-white font-bold text-sm">{title}</p>
        <p className="text-white/65 text-xs mt-0.5 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

export default function FeaturedServices() {
  return (
    <section className="py-16 sm:py-20" style={{ background: "#f5f9f7" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* Seção 2 — Postos de Combustíveis */}
        <div className="grid lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-xl border border-[#1f3d2b]/10">
          <div
            className="relative p-8 sm:p-10 flex flex-col justify-center"
            style={{ background: "linear-gradient(135deg, #1f3d2b 0%, #2e6b4d 100%)" }}
          >
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `radial-gradient(circle at 25% 30%, rgba(255,255,255,0.45) 0%, transparent 55%)`,
              }}
            />
            <div className="relative z-10">
              <span
                className="inline-block text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full mb-5 text-white/80"
                style={{ background: "rgba(255,255,255,0.12)" }}
              >
                Setor de Combustíveis
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white mb-4 leading-tight">
                Engenharia Tributária para Postos de Combustíveis e Lojas de Conveniência
              </h3>
              <p className="text-white/70 text-sm leading-relaxed mb-6">
                O setor de combustíveis não perdoa amadorismo. Um erro na apuração de ICMS-ST ou do
                PIS/COFINS monofásico significa dinheiro deixado na mesa ou risco iminente de autuação
                pela ANP e SEFAZ.
              </p>
              <p className="text-white/60 text-sm font-medium mb-6">
                Nós não fazemos apenas a "contabilidade" do seu posto. Nós aplicamos{" "}
                <strong className="text-white/90">inteligência fiscal contínua</strong> para garantir:
              </p>
              <div className="space-y-3">
                <PillarItem
                  icon={<Shield size={18} />}
                  title="Risco Zero"
                  desc="Conformidade total com ANP, SEFAZ e controle rigoroso da DCP."
                />
                <PillarItem
                  icon={<TrendingDown size={18} />}
                  title="Recuperação de Margem"
                  desc="Parametrização cirúrgica de ST e produtos monofásicos para você pagar o mínimo legal possível."
                />
                <PillarItem
                  icon={<Target size={18} />}
                  title="Blindagem Trabalhista"
                  desc="Gestão estratégica da folha de frentistas e operadores para mitigar passivos."
                />
              </div>
            </div>
          </div>
          <div className="bg-white p-8 sm:p-10 flex flex-col justify-center">
            <div className="space-y-5">
              <div
                className="rounded-2xl p-6 border-l-4"
                style={{ background: "rgba(46,107,77,0.05)", borderLeftColor: "#2e6b4d" }}
              >
                <p className="text-[#1f3d2b] font-black text-lg mb-2">Por que nos escolher?</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Dominamos toda a complexidade fiscal e tributária do setor de combustíveis.
                  Nossa equipe conhece cada detalhe da legislação — desde a DCP até a apuração de
                  ICMS-ST sobre cada produto.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { v: "Zero", l: "Risco de autuação" },
                  { v: "100%", l: "Compliance ANP/SEFAZ" },
                  { v: "ST", l: "Parametrização cirúrgica" },
                  { v: "DCP", l: "Controle rigoroso" },
                ].map((item) => (
                  <div
                    key={item.l}
                    className="rounded-2xl p-4 text-center border border-[#1f3d2b]/08"
                    style={{ background: "#f5f9f7" }}
                  >
                    <div className="text-[#1f3d2b] font-black text-xl">{item.v}</div>
                    <div className="text-gray-500 text-xs mt-0.5">{item.l}</div>
                  </div>
                ))}
              </div>
              <a
                href="https://wa.me/553732228889?text=Ol%C3%A1%2C%20tenho%20interesse%20em%20engenharia%20tribut%C3%A1ria%20para%20posto%20de%20combust%C3%ADvel."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-2 px-6 py-3.5 rounded-2xl font-bold text-white text-sm transition-all hover:-translate-y-0.5"
                style={{ background: "linear-gradient(135deg, #1f3d2b, #2e6b4d)" }}
              >
                Fale com um especialista
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Seção 3 — Advisory de Transição / Reforma Tributária */}
        <div className="grid lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-xl border border-[#1f3d2b]/10">
          <div className="bg-white p-8 sm:p-10 order-2 lg:order-1 flex flex-col justify-center">
            <div className="space-y-5">
              <div
                className="rounded-2xl p-6 border-l-4"
                style={{ background: "rgba(46,107,77,0.05)", borderLeftColor: "#2e6b4d" }}
              >
                <p className="text-[#1f3d2b] font-black text-lg mb-2">O que entregamos:</p>
                <div className="space-y-3 mt-3">
                  <div className="flex items-start gap-3">
                    <Clock size={16} className="text-[#2e6b4d] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[#1f3d2b] font-bold text-sm">Simulação em Tempo Real</p>
                      <p className="text-gray-600 text-xs leading-relaxed">Veja hoje exatamente quanto você pagará de imposto nos próximos 5 anos.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Target size={16} className="text-[#2e6b4d] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[#1f3d2b] font-bold text-sm">Adaptação de Holdings</p>
                      <p className="text-gray-600 text-xs leading-relaxed">Identificação de ineficiências nas suas estruturas atuais antes que o imposto suba e os créditos sejam perdidos.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="rounded-2xl p-5"
                style={{ background: "rgba(31,61,43,0.04)", border: "1px solid rgba(31,61,43,0.08)" }}
              >
                <p className="text-[#1f3d2b] text-sm font-semibold italic leading-relaxed">
                  "Ajuste sua rota hoje para não quebrar no futuro."
                </p>
              </div>
              <a
                href="https://wa.me/553732228889?text=Ol%C3%A1%2C%20quero%20saber%20sobre%20advisory%20para%20a%20Reforma%20Tribut%C3%A1ria."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-white text-sm transition-all hover:-translate-y-0.5"
                style={{ background: "linear-gradient(135deg, #1f3d2b, #2e6b4d)" }}
              >
                Agendar simulação
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          </div>
          <div
            className="relative p-8 sm:p-10 flex flex-col justify-center order-1 lg:order-2"
            style={{ background: "linear-gradient(135deg, #1f3d2b 0%, #2e6b4d 100%)" }}
          >
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `radial-gradient(circle at 70% 30%, rgba(255,255,255,0.45) 0%, transparent 55%)`,
              }}
            />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center">
                  <AlertTriangle size={22} className="text-white" />
                </div>
                <span className="text-xs font-bold tracking-wider uppercase text-white/80">
                  Reforma Tributária
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white mb-4 leading-tight">
                Advisory de Transição: A Nova Reforma Tributária (CBS/IBS) vai esmagar quem não se preparar.
              </h3>
              <p className="text-white/70 text-sm leading-relaxed mb-5">
                Não espere 2027 chegar para descobrir que sua margem desapareceu. Nossa equipe analisa
                os mais de <strong className="text-white/90">400 artigos da nova lei</strong> cruzando com
                os arquivos XML e o histórico contábil da sua empresa.
              </p>
              <div
                className="rounded-2xl p-4"
                style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)" }}
              >
                <p className="text-white/80 text-sm font-medium">
                  Previsibilidade financeira para os próximos <strong className="text-white">5 anos</strong>,
                  garantindo a sobrevivência e adaptação do seu negócio durante a maior mudança tributária do país.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
