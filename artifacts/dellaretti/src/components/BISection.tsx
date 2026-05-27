import { Fuel, BarChart3, FileCheck, ShieldCheck, Receipt, Users } from "lucide-react";

const features = [
  {
    icon: <Fuel size={22} />,
    title: "Contabilidade para Postos",
    desc: "Gestão contábil especializada no setor de combustíveis, com profundo conhecimento das exigências fiscais e tributárias para revendedores de combustível.",
  },
  {
    icon: <Receipt size={22} />,
    title: "Controle de Estoque e Nota Fiscal",
    desc: "Orientação completa na emissão de notas fiscais de combustíveis, controle de estoque de tanques e movimentação de produtos sujeitos à substituição tributária.",
  },
  {
    icon: <FileCheck size={22} />,
    title: "Obrigações ANP e SEFAZ",
    desc: "Suporte total nas obrigações junto à ANP, SEFAZ e demais órgãos reguladores, garantindo que seu posto esteja sempre em conformidade legal.",
  },
  {
    icon: <BarChart3 size={22} />,
    title: "Redução da Carga Tributária",
    desc: "Análise tributária aprofundada para identificar oportunidades legais de redução de impostos no regime do Simples Nacional ou Lucro Presumido.",
  },
  {
    icon: <ShieldCheck size={22} />,
    title: "Regularidade Fiscal Total",
    desc: "Mantemos seu CNPJ sempre regularizado perante Receita Federal, Estadual e Municipal, evitando multas e autuações fiscais.",
  },
  {
    icon: <Users size={22} />,
    title: "Folha de Pagamento e DP",
    desc: "Gestão completa da folha de pagamento, pró-labore dos sócios e todas as obrigações trabalhistas dos funcionários do seu posto.",
  },
];

export default function BISection() {
  return (
    <section id="postos" className="py-24" style={{ background: "linear-gradient(180deg, #f8faf9 0%, #ffffff 100%)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block text-[#2e6b4d] text-sm font-bold tracking-wider uppercase mb-3">
            Especialidade
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-[#1f3d2b] mb-4">
            Contabilidade para Postos de Gasolina
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Somos especialistas no segmento de combustíveis. Conhecemos cada detalhe das obrigações 
            fiscais, tributárias e regulatórias que envolvem a operação de um posto de gasolina.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative order-2 lg:order-1">
            <div
              className="rounded-3xl overflow-hidden shadow-2xl"
              style={{
                background: "linear-gradient(135deg, #1f3d2b 0%, #2e6b4d 60%, #3d8f65 100%)",
                minHeight: 360,
              }}
            >
              <div className="p-10 h-full flex flex-col justify-between" style={{ minHeight: 360 }}>
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center mb-6">
                    <Fuel size={30} className="text-white" />
                  </div>
                  <h3 className="text-white font-black text-2xl mb-3 leading-tight">
                    Por que escolher a Dellaretti para o seu posto?
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    Postos de gasolina possuem uma das cargas tributárias mais complexas do país. 
                    Entre ICMS-ST, PIS/COFINS monofásico, CIDE e as exigências da ANP, 
                    é essencial contar com uma contabilidade que realmente entende o seu negócio.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-8">
                  {[
                    { label: "+50 anos", sub: "de experiência" },
                    { label: "100%", sub: "online e digital" },
                    { label: "ANP", sub: "em conformidade" },
                    { label: "Suporte", sub: "especializado" },
                  ].map((stat, i) => (
                    <div key={i} className="bg-white/10 rounded-2xl p-4">
                      <p className="text-white font-black text-xl leading-none">{stat.label}</p>
                      <p className="text-white/60 text-xs mt-1">{stat.sub}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 order-1 lg:order-2">
            {features.map((feature, i) => (
              <div
                key={i}
                className="group rounded-2xl p-5 border border-transparent hover:border-[#1f3d2b]/10 transition-all duration-300"
                style={{ background: "white", boxShadow: "0 2px 12px rgba(31,61,43,0.06)" }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(31,61,43,0.08)" }}
                  >
                    <span className="text-[#1f3d2b]">{feature.icon}</span>
                  </div>
                  <div>
                    <h3 className="text-[#1f3d2b] font-bold text-base mb-1">{feature.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
