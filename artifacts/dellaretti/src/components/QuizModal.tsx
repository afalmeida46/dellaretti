import { useState } from "react";
import { useLocation } from "wouter";
import { X, ChevronLeft } from "lucide-react";

export type QuizFlow = "abrir" | "trocar";

interface QuizModalProps {
  open: boolean;
  onClose: () => void;
  flow: QuizFlow;
}

type Step = "estado" | "formulario";

const PHONE = "553732228889";

function ProgressBar({ step }: { step: Step }) {
  const pct = step === "estado" ? 33 : 66;
  return (
    <div className="h-1.5 w-full rounded-full overflow-hidden" style={{ background: "rgba(46,107,77,0.15)" }}>
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{ width: `${pct}%`, background: "linear-gradient(90deg, #2e6b4d, #4ade80)" }}
      />
    </div>
  );
}

const faturamentoOptions = [
  "Até R$ 81.000/ano (MEI)",
  "Até R$ 120.000/ano",
  "Até R$ 240.000/ano",
  "Até R$ 480.000/ano",
  "Até R$ 1.200.000/ano",
  "Acima de R$ 1.200.000/ano",
];

const faturamentoAnualOptions = [
  "Até R$ 81.000",
  "Até R$ 120.000",
  "Até R$ 240.000",
  "Até R$ 480.000",
  "Até R$ 1.200.000",
  "Acima de R$ 1.200.000",
];

const regimeTributarioOptions = [
  "Simples Nacional",
  "Lucro Presumido",
  "Lucro Real",
  "MEI",
  "Não sei",
];

const tempoEmpresaOptions = [
  "Menos de 1 ano",
  "1 a 3 anos",
  "3 a 5 anos",
  "5 a 10 anos",
  "Mais de 10 anos",
];

const ramoOptions = [
  "Comércio",
  "Serviços",
  "Posto de Combustível",
  "Indústria",
  "Tecnologia",
  "Saúde",
  "Construção Civil",
  "Agronegócio",
  "Outro",
];

interface AbrirForm {
  nome: string;
  telefone: string;
  email: string;
  ramo: string;
  previsaoFaturamento: string;
  regimeTributario: string;
}

interface TrocarForm {
  nome: string;
  telefone: string;
  email: string;
  ramo: string;
  funcionarios: string;
  faturamentoAnual: string;
  regimeTributario: string;
  tempoEmpresa: string;
}

const inputClass =
  "w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-[#1f3d2b] placeholder-gray-400 text-sm outline-none transition-all focus:ring-2 focus:ring-[#2e6b4d]/20 focus:border-[#2e6b4d]";

const selectClass =
  "w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-[#1f3d2b] text-sm outline-none transition-all focus:ring-2 focus:ring-[#2e6b4d]/20 focus:border-[#2e6b4d] cursor-pointer";

function Label({ children }: { children: React.ReactNode }) {
  return <label className="block text-[#1f3d2b] font-semibold text-xs mb-1.5 uppercase tracking-wide">{children}</label>;
}

export default function QuizModal({ open, onClose, flow }: QuizModalProps) {
  const [, navigate] = useLocation();
  const [step, setStep] = useState<Step>("estado");
  const [estado, setEstado] = useState<"mg" | "outros" | null>(null);
  const [loading, setLoading] = useState(false);

  const [abrirForm, setAbrirForm] = useState<AbrirForm>({
    nome: "", telefone: "", email: "", ramo: "", previsaoFaturamento: "", regimeTributario: "",
  });
  const [trocarForm, setTrocarForm] = useState<TrocarForm>({
    nome: "", telefone: "", email: "", ramo: "", funcionarios: "", faturamentoAnual: "", regimeTributario: "", tempoEmpresa: "",
  });

  if (!open) return null;

  function handleClose() {
    onClose();
    setTimeout(() => {
      setStep("estado");
      setEstado(null);
      setLoading(false);
    }, 300);
  }

  function handleSelectEstado(sel: "mg" | "outros") {
    setEstado(sel);
    setStep("formulario");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const payload =
      flow === "abrir"
        ? { tipo: "Abrir Empresa", estado, nome: abrirForm.nome, telefone: abrirForm.telefone, email: abrirForm.email, ramo: abrirForm.ramo, previsaoFaturamento: abrirForm.previsaoFaturamento, regimeTributario: abrirForm.regimeTributario }
        : { tipo: "Trocar de Contador", estado, ...trocarForm };

    try {
      const { API_BASE: apiBase } = await import("@/lib/api");
      await fetch(`${apiBase}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch {}

    try {
      const leadInfo = flow === "abrir"
        ? {
            tipo: "Abrir Empresa",
            nome: abrirForm.nome,
            email: abrirForm.email,
            telefone: abrirForm.telefone,
            cpf: abrirForm.cpf,
            ramo: abrirForm.ramo,
          }
        : {
            tipo: "Trocar de Contador",
            nome: trocarForm.nome,
            email: trocarForm.email,
            telefone: trocarForm.telefone,
            ramo: trocarForm.ramo,
          };
      sessionStorage.setItem("dellaretti:lead", JSON.stringify(leadInfo));
    } catch {}

    setLoading(false);
    onClose();
    setTimeout(() => {
      setStep("estado");
      setEstado(null);
      navigate(flow === "abrir" ? "/abra-sua-empresa?from=form" : "/troque-de-contador?from=form");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 200);
  }

  const title = flow === "abrir" ? "Abrir minha empresa" : "Trocar de contador";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div
        className="relative w-full rounded-3xl overflow-hidden shadow-2xl"
        style={{
          background: "#f0f4f1",
          maxHeight: "92vh",
          overflowY: "auto",
          maxWidth: 640,
        }}
      >
        <div className="p-0.5">
          <ProgressBar step={step} />
        </div>

        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-all hover:bg-black/10 z-10"
          style={{ color: "#333" }}
        >
          <X size={18} />
        </button>

        {/* STEP 1 - Estado */}
        {step === "estado" && (
          <div className="p-8 sm:p-10">
            <div className="mb-8">
              <span
                className="inline-block text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full mb-3"
                style={{ background: "rgba(46,107,77,0.1)", color: "#2e6b4d" }}
              >
                {title}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-800 mb-2">Em qual estado você está?</h2>
              <p className="text-gray-500 text-sm">Selecione para continuarmos com o seu cadastro.</p>
            </div>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => handleSelectEstado("mg")}
                className="w-full py-4 px-8 rounded-2xl font-bold text-white text-sm tracking-wide transition-all hover:opacity-90 hover:-translate-y-0.5"
                style={{ background: "linear-gradient(135deg, #1f3d2b, #2e6b4d)" }}
              >
                MINAS GERAIS
              </button>
              <button
                onClick={() => handleSelectEstado("outros")}
                className="w-full py-4 px-8 rounded-2xl font-bold text-white text-sm tracking-wide transition-all hover:opacity-90 hover:-translate-y-0.5"
                style={{ background: "linear-gradient(135deg, #2e6b4d, #3d8f65)" }}
              >
                OUTROS ESTADOS
              </button>
              <a
                href={`https://wa.me/${PHONE}?text=Ol%C3%A1%2C%20quero%20saber%20mais%20sobre%20contabilidade.`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-center text-[#2e6b4d] font-semibold text-sm hover:underline mt-2"
              >
                Ainda ficou na dúvida? Entre em contato.
              </a>
            </div>
          </div>
        )}

        {/* STEP 2 - Formulário */}
        {step === "formulario" && (
          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <button
                onClick={() => setStep("estado")}
                className="flex items-center gap-1 text-[#2e6b4d] font-semibold text-sm hover:opacity-80"
              >
                <ChevronLeft size={18} /> Voltar
              </button>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-gray-800">{title}</h2>
                <p className="text-gray-400 text-xs mt-0.5">
                  {estado === "mg" ? "Minas Gerais" : "Outros Estados"} · Preencha o formulário abaixo
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {flow === "abrir" ? (
                <>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label>Nome completo *</Label>
                      <input
                        required
                        type="text"
                        placeholder="Seu nome"
                        value={abrirForm.nome}
                        onChange={(e) => setAbrirForm((f) => ({ ...f, nome: e.target.value }))}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <Label>Telefone / WhatsApp *</Label>
                      <input
                        required
                        type="tel"
                        placeholder="(37) 99999-9999"
                        value={abrirForm.telefone}
                        onChange={(e) => setAbrirForm((f) => ({ ...f, telefone: e.target.value }))}
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>E-mail *</Label>
                    <input
                      required
                      type="email"
                      placeholder="seu@email.com"
                      value={abrirForm.email}
                      onChange={(e) => setAbrirForm((f) => ({ ...f, email: e.target.value }))}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <Label>Ramo de Atuação *</Label>
                    <select
                      required
                      value={abrirForm.ramo}
                      onChange={(e) => setAbrirForm((f) => ({ ...f, ramo: e.target.value }))}
                      className={selectClass}
                    >
                      <option value="">Selecione...</option>
                      {ramoOptions.map((r) => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label>Previsão de Faturamento Anual *</Label>
                      <select
                        required
                        value={abrirForm.previsaoFaturamento}
                        onChange={(e) => setAbrirForm((f) => ({ ...f, previsaoFaturamento: e.target.value }))}
                        className={selectClass}
                      >
                        <option value="">Selecione...</option>
                        {faturamentoOptions.map((r) => <option key={r} value={r}>{r}</option>)}
                      </select>
                    </div>
                    <div>
                      <Label>Regime Tributário Pretendido *</Label>
                      <select
                        required
                        value={abrirForm.regimeTributario}
                        onChange={(e) => setAbrirForm((f) => ({ ...f, regimeTributario: e.target.value }))}
                        className={selectClass}
                      >
                        <option value="">Selecione...</option>
                        {regimeTributarioOptions.map((r) => <option key={r} value={r}>{r}</option>)}
                      </select>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label>Nome completo *</Label>
                      <input
                        required
                        type="text"
                        placeholder="Seu nome"
                        value={trocarForm.nome}
                        onChange={(e) => setTrocarForm((f) => ({ ...f, nome: e.target.value }))}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <Label>Telefone / WhatsApp *</Label>
                      <input
                        required
                        type="tel"
                        placeholder="(37) 99999-9999"
                        value={trocarForm.telefone}
                        onChange={(e) => setTrocarForm((f) => ({ ...f, telefone: e.target.value }))}
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>E-mail *</Label>
                    <input
                      required
                      type="email"
                      placeholder="seu@email.com"
                      value={trocarForm.email}
                      onChange={(e) => setTrocarForm((f) => ({ ...f, email: e.target.value }))}
                      className={inputClass}
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label>Ramo de Atuação *</Label>
                      <select
                        required
                        value={trocarForm.ramo}
                        onChange={(e) => setTrocarForm((f) => ({ ...f, ramo: e.target.value }))}
                        className={selectClass}
                      >
                        <option value="">Selecione...</option>
                        {ramoOptions.map((r) => <option key={r} value={r}>{r}</option>)}
                      </select>
                    </div>
                    <div>
                      <Label>Número de Funcionários *</Label>
                      <select
                        required
                        value={trocarForm.funcionarios}
                        onChange={(e) => setTrocarForm((f) => ({ ...f, funcionarios: e.target.value }))}
                        className={selectClass}
                      >
                        <option value="">Selecione...</option>
                        {["Nenhum (só sócios)", "1 a 3", "4 a 10", "11 a 30", "Mais de 30"].map((r) => (
                          <option key={r} value={r}>{r}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label>Faturamento Anual (últimos 12 meses) *</Label>
                      <select
                        required
                        value={trocarForm.faturamentoAnual}
                        onChange={(e) => setTrocarForm((f) => ({ ...f, faturamentoAnual: e.target.value }))}
                        className={selectClass}
                      >
                        <option value="">Selecione...</option>
                        {faturamentoAnualOptions.map((r) => <option key={r} value={r}>{r}</option>)}
                      </select>
                    </div>
                    <div>
                      <Label>Regime Tributário *</Label>
                      <select
                        required
                        value={trocarForm.regimeTributario}
                        onChange={(e) => setTrocarForm((f) => ({ ...f, regimeTributario: e.target.value }))}
                        className={selectClass}
                      >
                        <option value="">Selecione...</option>
                        {regimeTributarioOptions.map((r) => <option key={r} value={r}>{r}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <Label>Tempo de Empresa *</Label>
                    <select
                      required
                      value={trocarForm.tempoEmpresa}
                      onChange={(e) => setTrocarForm((f) => ({ ...f, tempoEmpresa: e.target.value }))}
                      className={selectClass}
                    >
                      <option value="">Selecione...</option>
                      {tempoEmpresaOptions.map((r) => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
                </>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-2xl text-white font-bold text-base flex items-center justify-center gap-2.5 transition-all hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                style={{ background: "linear-gradient(135deg, #1f3d2b, #2e6b4d)" }}
              >
                {loading ? (
                  <svg className="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"/>
                    <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                ) : (
                  <>Ver planos e preços →</>
                )}
              </button>
              <p className="text-center text-gray-400 text-xs">Suas informações são seguras e protegidas pela LGPD.</p>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
