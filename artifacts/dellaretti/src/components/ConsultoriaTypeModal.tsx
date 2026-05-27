import { useEffect } from "react";
import { useLocation } from "wouter";
import { X, Store, Briefcase, Sparkles, ChevronRight } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

const PERSONALIZADO_WHATSAPP =
  "https://wa.me/553732228889?text=Ol%C3%A1%2C%20tenho%20interesse%20no%20Plano%20Personalizado%20de%20Contabilidade%20da%20Dellaretti%20para%20a%20minha%20empresa.%20Gostaria%20de%20receber%20uma%20proposta%20sob%20medida.";

type Option = {
  id: string;
  icon: typeof Store;
  title: string;
  desc: string;
  cta: string;
  href: string;
  external?: boolean;
};

const options: Option[] = [
  {
    id: "comercio",
    icon: Store,
    title: "Empresa de Comércio",
    desc: "Para quem vende produtos: lojas, atacado, varejo, e-commerce.",
    cta: "Ver planos de Comércio",
    href: "/pagamento?type=comercio",
  },
  {
    id: "servico",
    icon: Briefcase,
    title: "Empresa de Serviço",
    desc: "Para clínicas, agências, consultórios, profissionais liberais e prestadores.",
    cta: "Ver planos de Serviço",
    href: "/pagamento?type=servico",
  },
  {
    id: "personalizado",
    icon: Sparkles,
    title: "Plano Personalizado para Grandes Empresas",
    desc: "Para operações que não se encaixam nos planos padrão — grandes empresas, grupos empresariais e patrimônios relevantes. Proposta sob medida.",
    cta: "Solicitar proposta",
    href: PERSONALIZADO_WHATSAPP,
    external: true,
  },
];

export default function ConsultoriaTypeModal({ open, onClose }: Props) {
  const [, navigate] = useLocation();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  function go(opt: Option) {
    onClose();
    if (opt.external) {
      window.open(opt.href, "_blank", "noopener,noreferrer");
    } else {
      navigate(opt.href);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
      style={{ background: "rgba(15, 30, 22, 0.55)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="flex items-start justify-between p-6 sm:p-8 border-b border-gray-100"
          style={{ background: "linear-gradient(135deg, rgba(46,107,77,0.06), rgba(46,107,77,0.02))" }}
        >
          <div>
            <span
              className="inline-block text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full mb-2"
              style={{ background: "rgba(46,107,77,0.12)", color: "#2e6b4d" }}
            >
              Consultoria Estratégica
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1f3d2b] leading-tight">
              Qual é o seu negócio?
            </h2>
            <p className="text-gray-500 text-sm mt-1.5">
              Escolha o tipo para ver os planos com valores.
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-[#1f3d2b] transition-all flex-shrink-0"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 sm:p-8 grid gap-4">
          {options.map((opt) => {
            const Icon = opt.icon;
            return (
              <button
                key={opt.id}
                onClick={() => go(opt)}
                className="group flex items-center gap-4 sm:gap-5 text-left p-5 sm:p-6 rounded-2xl border-2 border-gray-100 hover:border-[#2e6b4d] hover:shadow-md transition-all bg-white"
              >
                <div
                  className="lg-icon-light w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all group-hover:scale-105"
                >
                  <Icon size={26} style={{ color: "#2e6b4d" }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-black text-[#1f3d2b] text-base sm:text-lg leading-tight">
                    {opt.title}
                  </div>
                  <p className="text-gray-500 text-sm mt-1 leading-relaxed">
                    {opt.desc}
                  </p>
                  <span
                    className="inline-flex items-center gap-1 mt-2 text-xs font-bold uppercase tracking-wide"
                    style={{ color: "#2e6b4d" }}
                  >
                    {opt.cta}
                    <ChevronRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="px-6 sm:px-8 pb-6 sm:pb-8 text-center">
          <p className="text-xs text-gray-400">
            Pagamento 100% seguro via PagBank · SSL criptografado
          </p>
        </div>
      </div>
    </div>
  );
}
