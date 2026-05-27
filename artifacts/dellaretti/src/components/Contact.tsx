import { useState } from "react";
import { Send } from "lucide-react";

interface FormData {
  nome: string;
  email: string;
  telefone: string;
  ramo: string;
  ramoDescricao: string;
  faturamentoAnual: string;
  regimeTributario: string;
}

interface FormErrors {
  nome?: string;
  email?: string;
  telefone?: string;
  ramo?: string;
  ramoDescricao?: string;
  faturamentoAnual?: string;
  regimeTributario?: string;
}

function formatPhone(v: string) {
  return v.replace(/\D/g, "").slice(0, 11)
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2");
}

const ramoOptions = [
  "Comércio", "Serviços", "Posto de Combustível", "Indústria",
  "Tecnologia", "Saúde", "Construção Civil", "Agronegócio", "Outro",
];

const faturamentoOptions = [
  "Até R$ 81.000/ano (MEI)", "Até R$ 120.000/ano", "Até R$ 240.000/ano",
  "Até R$ 480.000/ano", "Até R$ 1.200.000/ano", "Acima de R$ 1.200.000/ano",
];

const regimeTributarioOptions = [
  "Simples Nacional", "Lucro Presumido", "Lucro Real", "MEI", "Não sei",
];

const WHATSAPP_NUMBER = "553732228889";

function validateEmail(e: string) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e); }

const emptyForm: FormData = {
  nome: "", email: "", telefone: "", ramo: "", ramoDescricao: "",
  faturamentoAnual: "", regimeTributario: "",
};

function buildWhatsAppMessage(form: FormData): string {
  const ramoFinal = form.ramo === "Outro" && form.ramoDescricao
    ? `Outro: ${form.ramoDescricao}` : form.ramo;
  return encodeURIComponent([
    "Olá! Preenchi o formulário do site e gostaria de falar com um especialista.",
    "",
    `👤 *Nome:* ${form.nome}`,
    `📧 *E-mail:* ${form.email}`,
    `📱 *Telefone:* ${form.telefone}`,
    `🏢 *Ramo de Atuação:* ${ramoFinal}`,
    `💰 *Faturamento Anual:* ${form.faturamentoAnual}`,
    `📋 *Regime Tributário:* ${form.regimeTributario}`,
  ].join("\n"));
}

export default function Contact() {
  const [form, setForm] = useState<FormData>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [sentForm, setSentForm] = useState<FormData>(emptyForm);

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.nome.trim() || form.nome.trim().length < 2) e.nome = "Nome deve ter ao menos 2 caracteres.";
    if (!form.email.trim() || !validateEmail(form.email)) e.email = "Informe um e-mail válido.";
    if (!form.telefone.trim() || form.telefone.replace(/\D/g, "").length < 10) e.telefone = "Informe um telefone válido com DDD.";
    if (!form.ramo) e.ramo = "Selecione o ramo de atuação.";
    if (form.ramo === "Outro" && !form.ramoDescricao.trim()) e.ramoDescricao = "Descreva o ramo de atuação.";
    if (!form.faturamentoAnual) e.faturamentoAnual = "Selecione o faturamento anual.";
    if (!form.regimeTributario) e.regimeTributario = "Selecione o regime tributário.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = ev.target;
    const next = name === "telefone" ? formatPhone(value) : value;
    setForm((p) => ({ ...p, [name]: next }));
    if (errors[name as keyof FormErrors]) setErrors((p) => ({ ...p, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const { API_BASE: apiBase } = await import("@/lib/api");
      await fetch(`${apiBase}/api/contato`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } catch {}
    setLoading(false);
    setSentForm({ ...form });
    setSent(true);
    setForm(emptyForm);
  };

  const inputCls = (field: keyof FormErrors) =>
    `w-full px-4 py-3 rounded-xl border text-[#1f3d2b] placeholder-gray-400 text-sm outline-none transition-all focus:ring-2 focus:ring-[#2e6b4d]/20 focus:border-[#2e6b4d] ${
      errors[field] ? "border-red-400 bg-red-50" : "border-gray-200 bg-white hover:border-gray-300"
    }`;

  const selectCls = (field: keyof FormErrors) =>
    `w-full px-4 py-3 rounded-xl border text-[#1f3d2b] text-sm outline-none transition-all focus:ring-2 focus:ring-[#2e6b4d]/20 focus:border-[#2e6b4d] cursor-pointer bg-white ${
      errors[field] ? "border-red-400 bg-red-50" : "border-gray-200 hover:border-gray-300"
    }`;

  return (
    <section id="contato" className="py-12 sm:py-20" style={{ background: "linear-gradient(180deg, #ffffff 0%, #f5f9f7 100%)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <span className="inline-block text-[#2e6b4d] text-sm font-bold tracking-wider uppercase mb-3">Fale conosco</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1f3d2b] mb-3">Entre em contato</h2>
          <p className="text-gray-500 text-base sm:text-lg">Nossa equipe está pronta para atendê-lo com excelência.</p>
        </div>

        {/* Formulário centralizado */}
        <div className="max-w-2xl mx-auto">
          <div>
            {sent ? (
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-[#1f3d2b]/08 flex flex-col items-center justify-center text-center" style={{ minHeight: 420 }}>
                <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4" style={{ background: "rgba(46,107,77,0.1)" }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2e6b4d" strokeWidth="2.5">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                </div>
                <h3 className="text-xl font-black text-[#1f3d2b] mb-2">Dados recebidos!</h3>
                <p className="text-gray-500 text-sm mb-4 max-w-sm">
                  Seus dados foram salvos. Clique abaixo para enviar a mensagem diretamente para nosso time via WhatsApp — já está pronta!
                </p>
                <div className="w-full mb-5 rounded-2xl p-4 text-left text-xs text-gray-600 space-y-1.5"
                  style={{ background: "#f5f9f7", border: "1px solid rgba(46,107,77,0.15)" }}>
                  <p><strong>Nome:</strong> {sentForm.nome}</p>
                  <p><strong>E-mail:</strong> {sentForm.email}</p>
                  <p><strong>Telefone:</strong> {sentForm.telefone}</p>
                  <p><strong>Ramo:</strong> {sentForm.ramo === "Outro" ? `Outro: ${sentForm.ramoDescricao}` : sentForm.ramo}</p>
                  <p><strong>Faturamento:</strong> {sentForm.faturamentoAnual}</p>
                  <p><strong>Regime Tributário:</strong> {sentForm.regimeTributario}</p>
                </div>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${buildWhatsAppMessage(sentForm)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-xl font-bold text-white text-sm flex items-center justify-center gap-2.5 transition-all hover:-translate-y-0.5 mb-3"
                  style={{ background: "#25D366" }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Enviar para os especialistas via WhatsApp
                </a>
                <button onClick={() => setSent(false)} className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
                  Preencher novamente
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate
                className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-[#1f3d2b]/08 space-y-4">
                <div>
                  <h3 className="text-[#1f3d2b] font-black text-lg sm:text-xl mb-1">Envie seus dados para nosso time de especialistas</h3>
                  <p className="text-gray-400 text-xs">Nossa equipe responderá em até 24 horas úteis.</p>
                </div>

                <div>
                  <label className="block text-[#1f3d2b] font-semibold text-sm mb-1.5">Nome *</label>
                  <input type="text" name="nome" value={form.nome} onChange={handleChange}
                    placeholder="Seu nome completo" className={inputCls("nome")} autoComplete="name" />
                  {errors.nome && <p className="mt-1 text-red-500 text-xs">{errors.nome}</p>}
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#1f3d2b] font-semibold text-sm mb-1.5">Email *</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange}
                      placeholder="seu@email.com" className={inputCls("email")} autoComplete="email" />
                    {errors.email && <p className="mt-1 text-red-500 text-xs">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-[#1f3d2b] font-semibold text-sm mb-1.5">Telefone / WhatsApp *</label>
                    <input type="tel" name="telefone" value={form.telefone} onChange={handleChange}
                      placeholder="(37) 99999-9999" className={inputCls("telefone")} autoComplete="tel" inputMode="tel" />
                    {errors.telefone && <p className="mt-1 text-red-500 text-xs">{errors.telefone}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-[#1f3d2b] font-semibold text-sm mb-1.5">Ramo de Atuação *</label>
                  <select name="ramo" value={form.ramo} onChange={handleChange} className={selectCls("ramo")}>
                    <option value="">Selecione...</option>
                    {ramoOptions.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                  {errors.ramo && <p className="mt-1 text-red-500 text-xs">{errors.ramo}</p>}
                </div>

                {form.ramo === "Outro" && (
                  <div>
                    <label className="block text-[#1f3d2b] font-semibold text-sm mb-1.5">Descreva o ramo *</label>
                    <input type="text" name="ramoDescricao" value={form.ramoDescricao} onChange={handleChange}
                      placeholder="Ex: Escola de idiomas, Pet shop..." className={inputCls("ramoDescricao")} />
                    {errors.ramoDescricao && <p className="mt-1 text-red-500 text-xs">{errors.ramoDescricao}</p>}
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#1f3d2b] font-semibold text-sm mb-1.5">Faturamento Anual *</label>
                    <select name="faturamentoAnual" value={form.faturamentoAnual} onChange={handleChange} className={selectCls("faturamentoAnual")}>
                      <option value="">Selecione...</option>
                      {faturamentoOptions.map((r) => <option key={r} value={r}>{r}</option>)}
                    </select>
                    {errors.faturamentoAnual && <p className="mt-1 text-red-500 text-xs">{errors.faturamentoAnual}</p>}
                  </div>
                  <div>
                    <label className="block text-[#1f3d2b] font-semibold text-sm mb-1.5">Regime Tributário *</label>
                    <select name="regimeTributario" value={form.regimeTributario} onChange={handleChange} className={selectCls("regimeTributario")}>
                      <option value="">Selecione...</option>
                      {regimeTributarioOptions.map((r) => <option key={r} value={r}>{r}</option>)}
                    </select>
                    {errors.regimeTributario && <p className="mt-1 text-red-500 text-xs">{errors.regimeTributario}</p>}
                  </div>
                </div>

                <button type="submit" disabled={loading}
                  className="w-full py-3.5 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:translate-y-0"
                  style={{ background: "linear-gradient(135deg, #1f3d2b, #2e6b4d)" }}>
                  {loading ? (
                    <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"/>
                      <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                  ) : (
                    <><Send size={16} /> Enviar para os especialistas</>
                  )}
                </button>
                <p className="text-center text-gray-400 text-xs">Suas informações são protegidas conforme a LGPD.</p>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
