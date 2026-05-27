import { Search, TrendingUp, Users } from "lucide-react";

const pilares = [
  {
    icon: <Search size={32} />,
    title: "Auditoria e Compliance Fiscal",
    tag: "Compliance",
    desc: "Monitoramento contínuo para economia de impostos e compliance absoluto. Identificamos riscos antes que virem autuações e oportunidades que sua contabilidade atual está deixando passar.",
    gradient: "from-[#1f3d2b] to-[#2e6b4d]",
  },
  {
    icon: <TrendingUp size={32} />,
    title: "Planejamento Tributário Agressivo (e Legal)",
    tag: "Planejamento Tributário",
    desc: "Maximização de lucros via Lucro Real e Presumido. Nossa abordagem vai além do básico — arquitetamos sua estrutura tributária para que você pague o mínimo legal possível, com total segurança perante o fisco.",
    gradient: "from-[#2e6b4d] to-[#3d8f65]",
  },
  {
    icon: <Users size={32} />,
    title: "Gestão Estratégica de DP",
    tag: "Departamento Pessoal",
    desc: "Mitigação de riscos trabalhistas por desconhecimento da legislação. Gerenciamos sua folha e obrigações trabalhistas com foco em prevenção de passivos e otimização de custos com pessoal.",
    gradient: "from-[#183025] to-[#1f3d2b]",
  },
];

export default function Services() {
  const scrollToContact = () => {
    const el = document.querySelector("#contato");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="servicos" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block text-[#2e6b4d] text-sm font-bold tracking-wider uppercase mb-3">
            Como Operamos
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-[#1f3d2b] mb-4">
            Nossos Pilares de Atuação<br className="hidden sm:block" /> e Gestão de Risco
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Não entregamos "pacotes contábeis". Entregamos{" "}
            <strong className="text-[#1f3d2b]">soluções de alto impacto</strong> para o seu negócio.
          </p>
        </div>

        <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-8">
          {pilares.map((pilar, i) => (
            <div key={i} className="service-card group cursor-pointer flex flex-col">
              <div
                className={`h-2 w-full rounded-t-2xl bg-gradient-to-r ${pilar.gradient}`}
              />
              <div className="p-8 space-y-5 flex flex-col flex-1">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-white"
                  style={{ background: `linear-gradient(135deg, #1f3d2b, #2e6b4d)` }}
                >
                  {pilar.icon}
                </div>

                <span
                  className="inline-block text-xs font-semibold px-3 py-1 rounded-full w-fit"
                  style={{ background: "rgba(31,61,43,0.08)", color: "#1f3d2b" }}
                >
                  {pilar.tag}
                </span>

                <h3 className="text-[#1f3d2b] font-black text-xl leading-tight">{pilar.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed flex-1">{pilar.desc}</p>

                <button
                  onClick={scrollToContact}
                  className="inline-flex items-center gap-1.5 text-[#2e6b4d] font-semibold text-sm hover:gap-2.5 transition-all duration-200 group-hover:text-[#1f3d2b] mt-auto"
                >
                  Solicitar diagnóstico
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div
            className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 rounded-3xl"
            style={{ background: "rgba(31,61,43,0.04)", border: "1px solid rgba(31,61,43,0.08)" }}
          >
            <div className="text-left">
              <p className="text-[#1f3d2b] font-bold">Pronto para parar de pagar impostos a mais?</p>
              <p className="text-gray-500 text-sm">Fale com nossa equipe e solicite seu diagnóstico gratuito.</p>
            </div>
            <div className="flex gap-3">
              <a
                href="https://wa.me/553732228889"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-white font-semibold text-sm transition-all hover:-translate-y-0.5"
                style={{ background: "#25D366" }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WHATSAPP
              </a>
              <button
                onClick={scrollToContact}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all hover:-translate-y-0.5 border"
                style={{ borderColor: "#1f3d2b", color: "#1f3d2b" }}
              >
                FORMULÁRIO
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
