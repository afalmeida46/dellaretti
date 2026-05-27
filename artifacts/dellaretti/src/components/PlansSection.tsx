import { useState } from "react";
import { CheckCircle2, ChevronDown, Sparkles } from "lucide-react";

export const comercioPlans = [
  {
    id: "comercio-essencial",
    name: "ESSENCIAL",
    oldPrice: "R$616",
    price: "432",
    period: "/mês",
    highlight: false,
    features: [
      "Contabilidade completa",
      "Processo de abertura grátis e sem sair de casa*",
      "Atendimento via chat e e-mail das 7h às 17h",
      "Atendimento via WhatsApp das 7h às 17h",
      "Relatórios Movimentação de Conta",
      "Importação e Conciliação de Extrato",
      "Pró Labore dos Sócios",
      "Folha de Pagamento",
      "Faturamento Anual até 240.000,00",
      "Até 3 funcionários",
      "Simples nacional",
    ],
  },
  {
    id: "comercio-plus",
    name: "PLUS",
    oldPrice: "R$1.048",
    price: "810",
    period: "/mês",
    highlight: true,
    features: [
      "Contabilidade completa",
      "Processo de abertura grátis e sem sair de casa*",
      "Atendimento via chat e e-mail das 7h às 17h",
      "Atendimento via WhatsApp das 7h às 17h",
      "Relatórios Movimentação de Conta",
      "Importação e Conciliação de Extrato",
      "Pró Labore dos Sócios",
      "Folha de Pagamento",
      "Faturamento Anual até 480.000,00",
      "Até 5 funcionários",
      "Simples nacional",
    ],
  },
];

export const servicoPlans = [
  {
    id: "servico-essencial",
    name: "ESSENCIAL",
    oldPrice: "R$324",
    price: "274",
    period: "/mês",
    highlight: false,
    features: [
      "Contabilidade completa",
      "Processo de abertura grátis e sem sair de casa*",
      "Atendimento via chat e e-mail das 7h às 17h",
      "Atendimento via WhatsApp das 7h às 17h",
      "Relatórios Movimentação de Conta",
      "Importação e Conciliação de Extrato",
      "Pró Labore dos Sócios",
      "Folha de Pagamento",
      "Faturamento Anual até 180.000,00",
      "Até 3 funcionários",
      "Simples nacional",
    ],
  },
  {
    id: "servico-plus",
    name: "PLUS",
    oldPrice: "R$634",
    price: "450",
    period: "/mês",
    highlight: true,
    features: [
      "Contabilidade completa",
      "Processo de abertura grátis e sem sair de casa*",
      "Atendimento via chat e e-mail das 7h às 17h",
      "Atendimento via WhatsApp das 7h às 17h",
      "Relatórios Movimentação de Conta",
      "Importação e Conciliação de Extrato",
      "Pró Labore dos Sócios",
      "Folha de Pagamento",
      "Faturamento Anual até 290.000,00",
      "Até 5 funcionários",
      "Simples nacional | Lucro Presumido",
    ],
  },
];

const faqs = [
  {
    q: "O que está incluso na mensalidade?",
    a: "Todas as atividades e rotinas contábeis exigidas por lei estão inclusas na mensalidade. Confira a lista completa.",
  },
  {
    q: "O que faz o escritório de contabilidade de uma empresa?",
    a: "Além de abrir empresas, o contador é fundamental para manter o CNPJ regularizado. Por meio de análises financeiras e patrimoniais ele garante que a empresa fique em dia com as obrigações fiscais (relacionadas a impostos), contábeis (como balanços e demonstrações) e trabalhistas (como folha de pagamento e pró-labore) entre outras. O contador também é responsável por garantir que os valores declarados condizem com as entradas e saídas financeiras da empresa.",
  },
  {
    q: "O que é contabilidade online ou contador online?",
    a: "A contabilidade online ou digital é a versão tecnológica do escritório de contabilidade físico. Com praticidade e segurança, você pode manter em dia todas as suas obrigações fiscais, contábeis e trabalhistas em uma plataforma online. É uma forma acessível e simplificada de cuidar da rotina da empresa, sendo a melhor opção para quem não quer gastar muito tempo nem dinheiro com contabilidade.",
  },
  {
    q: "Qual é o valor cobrado por um escritório de contabilidade e pela Dellaretti?",
    a: "O valor de um escritório de contabilidade pode variar conforme a localização, tamanho e complexidade da empresa. Na Contabilidade Dellaretti o valor é de acordo com o formato do negócio. Nós unimos tecnologia e conhecimento contábil para democratizar o acesso a um serviço de contabilidade com qualidade e preço justo.",
  },
  {
    q: "Qual o valor que o contador cobra para abrir uma empresa?",
    a: "Um contador cobra, em média, de R$500,00 a R$1.500,00 para abrir uma empresa e isso varia de acordo com a localização e complexidade do negócio. Na Dellaretti a abertura de empresas é grátis.",
  },
];

export function PlanCard({ plan, onSelect }: { plan: typeof comercioPlans[0]; onSelect?: () => void }) {
  const ctaStyle = plan.highlight
    ? { background: "white", color: "#1f3d2b" }
    : { background: "#2e6b4d", color: "white" };

  // map card id to /pagamento plan slug
  const planParam = plan.id.replace("comercio-", "").replace("servico-", "");
  const typeParam = plan.id.startsWith("comercio") ? "comercio" : "servico";
  const ctaHref = `/pagamento?type=${typeParam}&plan=${planParam}-${typeParam}`;

  return (
    <div
      className={`relative rounded-3xl overflow-hidden transition-all duration-300 ${
        plan.highlight ? "shadow-2xl sm:scale-105" : "shadow-lg hover:shadow-xl"
      }`}
      style={{
        background: plan.highlight ? "linear-gradient(135deg, #1f3d2b, #2e6b4d)" : "white",
        border: plan.highlight ? "none" : "1px solid rgba(31,61,43,0.1)",
      }}
    >
      {plan.highlight && (
        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold">
          MAIS POPULAR
        </div>
      )}
      <div className="p-8">
        <h3 className={`text-2xl font-black mb-1 ${plan.highlight ? "text-white" : "text-[#1f3d2b]"}`}>
          {plan.name}
        </h3>
        <p className={`text-xs mb-4 ${plan.highlight ? "text-white/60" : "text-gray-400"}`}>
          a partir de <span className="line-through">{plan.oldPrice}</span> por
        </p>
        <div className="flex items-end gap-1 mb-6">
          <span className={`text-base font-bold ${plan.highlight ? "text-white/80" : "text-gray-500"}`}>R$</span>
          <span className={`text-6xl font-black leading-none ${plan.highlight ? "text-white" : "text-[#1f3d2b]"}`}>
            {plan.price}
          </span>
          <span className={`text-base pb-1 ${plan.highlight ? "text-white/70" : "text-gray-500"}`}>{plan.period}</span>
        </div>

        {onSelect ? (
          <button
            type="button"
            onClick={onSelect}
            className="block w-full py-3.5 rounded-2xl text-center font-bold text-base transition-all hover:-translate-y-0.5"
            style={ctaStyle}
          >
            CONTRATAR
          </button>
        ) : (
          <a
            href={ctaHref}
            className="block w-full py-3.5 rounded-2xl text-center font-bold text-base transition-all hover:-translate-y-0.5"
            style={ctaStyle}
          >
            CONTRATAR
          </a>
        )}

        <div className="mt-6 space-y-3">
          {plan.features.map((feat, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <CheckCircle2
                size={16}
                className="flex-shrink-0 mt-0.5"
                style={{ color: plan.highlight ? "#86c9a0" : "#2e6b4d" }}
              />
              <span className={`text-sm ${plan.highlight ? "text-white/80" : "text-gray-600"}`}>
                {feat}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-4"
      >
        <span className="text-[#1f3d2b] font-semibold text-sm pr-4">{q}</span>
        <ChevronDown
          size={18}
          className="flex-shrink-0 text-[#2e6b4d] transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>
      {open && (
        <p className="text-gray-500 text-sm leading-relaxed pb-5">{a}</p>
      )}
    </div>
  );
}

type Tab = "comercio" | "servico" | "outros";

function TabButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className="px-4 sm:px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 whitespace-nowrap"
      style={active
        ? { background: "#1f3d2b", color: "white", boxShadow: "0 4px 12px rgba(31,61,43,0.25)" }
        : { background: "transparent", color: "#1f3d2b" }
      }
    >
      {children}
    </button>
  );
}

const PERSONALIZADO_WHATSAPP =
  "https://wa.me/553732228889?text=Ol%C3%A1%2C%20tenho%20interesse%20no%20Plano%20Personalizado%20de%20Contabilidade%20da%20Dellaretti%20para%20a%20minha%20empresa.%20Gostaria%20de%20receber%20uma%20proposta%20sob%20medida.";

export function PersonalizadoCard({ onSelect }: { onSelect?: () => void } = {}) {
  // Benefícios baseados na Matriz CVBA — Engenharia Tributária + Reforma + Blindagem
  const topics = [
    "Engenharia tributária sênior (23 anos de mercado, Lucro Real e Presumido)",
    "Diagnóstico completo e arquitetura fiscal sob medida",
    "Domínio de setores especializados: postos, clínicas, indústria",
    "Advisory completo da Reforma Tributária (CBS/IBS)",
    "Simulações financeiras com XML e histórico contábil",
    "Identificação de ineficiências em Holdings antes da virada de 2027",
    "Criação e gestão de Holding patrimonial e familiar",
    "Planejamento sucessório com economia de ITBI e ITCMD",
    "Defesa robusta contra riscos trabalhistas e empresariais",
    "Consultor sênior dedicado e contato direto",
    "Plano contábil 100% sob medida — sem amarras a planos de prateleira",
    "Relatório executivo com plano de ação tributário e patrimonial",
  ];
  return (
    <div className="max-w-2xl mx-auto">
      <div
        className="relative rounded-3xl overflow-hidden shadow-2xl"
        style={{ background: "linear-gradient(135deg, #1f3d2b 0%, #2e6b4d 100%)" }}
      >
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
        <div className="lg-badge-dark absolute top-4 right-4 px-3 py-1 rounded-full text-white text-xs font-bold flex items-center gap-1.5">
          <Sparkles size={12} />
          SOB MEDIDA
        </div>
        <div className="relative p-8 sm:p-10">
          <h3 className="text-2xl sm:text-3xl font-black text-white mb-1 leading-tight">
            PLANO PERSONALIZADO
          </h3>
          <p className="text-white/70 text-xs mb-5 leading-relaxed">
            Para empresas que não se encaixam nos planos padrão — grandes operações,
            grupos empresariais e patrimônios relevantes.
          </p>

          <div className="flex items-end gap-2 mb-1">
            <span className="text-4xl sm:text-5xl font-black leading-none text-white">Sob consulta</span>
          </div>
          <p className="text-white/60 text-xs mb-6">Proposta sob medida em até 24h úteis</p>

          {onSelect ? (
            <button
              type="button"
              onClick={onSelect}
              className="block w-full py-3.5 rounded-2xl text-center font-bold text-base transition-all hover:-translate-y-0.5 mb-8"
              style={{ background: "white", color: "#1f3d2b" }}
            >
              SOLICITAR PROPOSTA
            </button>
          ) : (
            <a
              href={PERSONALIZADO_WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-3.5 rounded-2xl text-center font-bold text-base transition-all hover:-translate-y-0.5 mb-8"
              style={{ background: "white", color: "#1f3d2b" }}
            >
              SOLICITAR PROPOSTA
            </a>
          )}

          <p className="text-white/70 text-[11px] uppercase tracking-wider font-bold mb-3">
            O que está incluso (Matriz CVBA)
          </p>
          <div className="grid sm:grid-cols-2 gap-y-2.5 gap-x-4">
            {topics.map((b) => (
              <div key={b} className="flex items-start gap-2.5">
                <CheckCircle2 size={16} className="flex-shrink-0 mt-0.5" style={{ color: "#86c9a0" }} />
                <span className="text-white/85 text-sm">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Backward-compat export so any old imports don't break
export const ConsultoriaCard = PersonalizadoCard;

export default function PlansSection() {
  const [tab, setTab] = useState<Tab>("comercio");
  const plans = tab === "comercio" ? comercioPlans : tab === "servico" ? servicoPlans : null;

  return (
    <div>
      <div className="flex justify-center mb-12">
        <div className="inline-flex p-1 rounded-2xl gap-1 max-w-full overflow-x-auto" style={{ background: "rgba(31,61,43,0.08)" }}>
          <TabButton active={tab === "comercio"} onClick={() => setTab("comercio")}>
            EMPRESA DE COMÉRCIO
          </TabButton>
          <TabButton active={tab === "servico"} onClick={() => setTab("servico")}>
            EMPRESAS DE SERVIÇO
          </TabButton>
          <TabButton active={tab === "outros"} onClick={() => setTab("outros")}>
            CONTABILIDADE SOB DEMANDA
          </TabButton>
        </div>
      </div>

      {plans ? (
        <>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto items-start">
            {plans.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>

          <p className="text-center text-gray-400 text-xs mt-8 max-w-xl mx-auto">
            * Processo de Abertura Sujeito a Taxas da Região. Consulte pelo{" "}
            <a href="https://wa.me/553732228889" target="_blank" rel="noopener noreferrer"
              className="text-[#2e6b4d] font-semibold hover:underline">nosso atendimento</a>.
          </p>
        </>
      ) : (
        <ConsultoriaCard />
      )}

      <div className="mt-24 max-w-4xl mx-auto">
        <h2 className="text-4xl font-black text-[#1f3d2b] text-center mb-12">Perguntas frequentes</h2>
        <div className="grid md:grid-cols-2 gap-x-16">
          <div>
            {faqs.slice(0, 3).map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
          <div>
            {faqs.slice(3).map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
