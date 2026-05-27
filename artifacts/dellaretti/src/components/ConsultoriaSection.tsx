import { Shield, DollarSign, Users } from "lucide-react";

const pilares = [
  {
    icon: <DollarSign size={20} />,
    title: "Economia Real",
    desc: "Redução drástica da carga tributária na transmissão de bens e prevenção de ITBI desnecessário.",
  },
  {
    icon: <Users size={20} />,
    title: "Segurança Sucessória",
    desc: "Planejamento robusto com usufruto e gestão de participações, garantindo que o seu legado passe para as próximas gerações sem conflitos e sem dilapidação pelo Estado.",
  },
  {
    icon: <Shield size={20} />,
    title: "Blindagem Total",
    desc: "Arquiteturas jurídicas e societárias impenetráveis para proteger os ativos da sua família e da sua empresa contra credores e riscos operacionais.",
  },
];

export default function ConsultoriaSection() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left — Text */}
          <div className="space-y-6">
            <div>
              <span
                className="inline-block text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full mb-4"
                style={{ background: "rgba(46,107,77,0.1)", color: "#2e6b4d" }}
              >
                Proteção de Legado
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1f3d2b] leading-tight mb-4">
                Blindagem Patrimonial,<br />
                <span className="text-[#2e6b4d]">Holding e Sucessão</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Construir patrimônio leva uma vida. Perdê-lo por falta de estrutura jurídica é trágico.
              </p>
            </div>

            <p className="text-gray-500 text-base leading-relaxed">
              Implementamos <strong className="text-[#1f3d2b]">arquiteturas jurídicas e societárias impenetráveis</strong> para
              proteger os ativos da sua família e da sua empresa contra credores e riscos operacionais.
            </p>

            <div className="space-y-4">
              {pilares.map((p, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-2xl border border-[#1f3d2b]/08" style={{ background: "#f5f9f7" }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0" style={{ background: "linear-gradient(135deg, #1f3d2b, #2e6b4d)" }}>
                    {p.icon}
                  </div>
                  <div>
                    <p className="text-[#1f3d2b] font-bold text-sm">{p.title}</p>
                    <p className="text-gray-500 text-sm mt-0.5 leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="https://wa.me/553732228889?text=Ol%C3%A1%2C%20tenho%20interesse%20em%20blindagem%20patrimonial%20e%20holding."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-white text-base transition-all hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg, #1f3d2b, #2e6b4d)" }}
            >
              Proteger meu patrimônio
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>

          {/* Right — Visual */}
          <div
            className="relative rounded-3xl overflow-hidden p-8 sm:p-10"
            style={{ background: "linear-gradient(135deg, #1f3d2b 0%, #2e6b4d 100%)", minHeight: 420 }}
          >
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `repeating-linear-gradient(45deg, rgba(255,255,255,0.1) 0px, rgba(255,255,255,0.1) 1px, transparent 1px, transparent 40px)`,
              }}
            />
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <div className="w-16 h-16 rounded-2xl bg-white/15 flex items-center justify-center mb-6 border border-white/20">
                  <Shield size={32} className="text-white" />
                </div>
                <h3 className="text-white font-black text-2xl mb-3 leading-tight">
                  Proteja o legado da sua família agora.
                </h3>
                <p className="text-white/65 text-sm leading-relaxed">
                  Construir patrimônio é difícil — perdê-lo por falta de estrutura é trágico.
                  Nossa equipe implementa a proteção que sua família merece.
                </p>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  { n: "Holding", l: "Familiar ou Empresarial" },
                  { n: "Sucessão", l: "Com segurança jurídica" },
                  { n: "ITBI", l: "Prevenção e economia" },
                  { n: "100%", l: "Proteção patrimonial" },
                ].map((item) => (
                  <div
                    key={item.l}
                    className="rounded-2xl p-4 text-center"
                    style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)" }}
                  >
                    <div className="text-white font-black text-base">{item.n}</div>
                    <div className="text-white/65 text-xs mt-0.5">{item.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
