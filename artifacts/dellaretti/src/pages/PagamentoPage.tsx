import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Lock, CheckCircle2, ChevronLeft, AlertCircle, Loader2, ExternalLink } from "lucide-react";
import { PlanCard, ConsultoriaCard, comercioPlans, servicoPlans } from "@/components/PlansSection";

const plans = [
  { id: "essencial-comercio", name: "Essencial Comércio", price: 43200, label: "R$ 432/mês", type: "comercio" },
  { id: "plus-comercio",      name: "Plus Comércio",      price: 81000, label: "R$ 810/mês", type: "comercio" },
  { id: "essencial-servico",  name: "Essencial Serviço",  price: 27400, label: "R$ 274/mês", type: "servico" },
  { id: "plus-servico",       name: "Plus Serviço",       price: 45000, label: "R$ 450/mês", type: "servico" },
  { id: "consultoria",        name: "Plano Personalizado", price: 500000, label: "R$ 5.000 (único)", type: "consultoria" },
];

type Step = "plan" | "form" | "redirect" | "success" | "error";

function formatCPF(v: string) {
  return v.replace(/\D/g, "").slice(0, 11)
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}
function formatPhone(v: string) {
  return v.replace(/\D/g, "").slice(0, 11)
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2");
}

function StepBar({ step }: { step: Step }) {
  const stepIndex = step === "plan" ? 0 : step === "form" ? 1 : 2;
  const labels = ["Plano", "Dados", "Pagamento"];
  return (
    <div className="flex items-center gap-2">
      {labels.map((label, i) => (
        <div key={label} className="flex items-center gap-2">
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${i <= stepIndex ? "text-white" : "text-gray-400 bg-gray-200"}`}
            style={i <= stepIndex ? { background: "#2e6b4d" } : {}}
          >
            {i < stepIndex ? <CheckCircle2 size={14} /> : i + 1}
          </div>
          <span className={`text-xs font-medium ${i <= stepIndex ? "text-[#2e6b4d]" : "text-gray-400"}`}>{label}</span>
          {i < 2 && <div className={`w-8 h-0.5 ${i < stepIndex ? "bg-[#2e6b4d]" : "bg-gray-200"}`} />}
        </div>
      ))}
    </div>
  );
}

export default function PagamentoPage() {
  const [, navigate] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [step, setStep] = useState<Step>("plan");
  const [selectedPlan, setSelectedPlan] = useState(plans[0]);
  const [planType, setPlanType] = useState<"todos" | "comercio" | "servico" | "consultoria">("todos");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [paymentUrl, setPaymentUrl] = useState("");
  const [sandbox, setSandbox] = useState(false);

  const [form, setForm] = useState({ name: "", email: "", cpf: "", phone: "" });

  const visiblePlans = planType === "todos" ? plans : plans.filter((p) => p.type === planType);

  useEffect(() => {
    document.title = "Pagamento | Contabilidade Dellaretti";
    const params = new URLSearchParams(window.location.search);

    // Handle return from PagBank
    const status = params.get("pagamento");
    if (status === "sucesso") { setStep("success"); return; }
    if (status === "cancelado") { setError("O pagamento foi cancelado. Tente novamente."); }

    const planParam = params.get("plan");
    const typeParam = params.get("type");
    if (planParam) {
      const found = plans.find((p) => p.id === planParam || p.id.startsWith(planParam));
      if (found) {
        setSelectedPlan(found);
        if (planParam === "consultoria") { setPlanType("consultoria"); setStep("form"); }
        else { setStep("form"); }
      }
    } else if (typeParam === "comercio" || typeParam === "servico") {
      setPlanType(typeParam);
      const first = plans.find((p) => p.type === typeParam);
      if (first) setSelectedPlan(first);
    }

    // Pre-fill from session lead data
    try {
      const lead = JSON.parse(sessionStorage.getItem("dellaretti:lead") || "{}");
      if (lead && (lead.nome || lead.email)) {
        setForm((f) => ({
          ...f,
          name: lead.nome || f.name,
          email: lead.email || f.email,
          phone: lead.telefone ? formatPhone(String(lead.telefone)) : f.phone,
          cpf: lead.cpf ? formatCPF(String(lead.cpf)) : f.cpf,
        }));
      }
    } catch {}
  }, []);

  function handleChange(field: string, value: string) {
    setError("");
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!form.name.trim()) return setError("Informe seu nome completo.");
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return setError("Informe um e-mail válido.");
    if ((form.cpf || "").replace(/\D/g, "").length < 11) return setError("Informe um CPF válido (11 dígitos).");
    if ((form.phone || "").replace(/\D/g, "").length < 10) return setError("Informe um telefone com DDD.");

    setLoading(true);

    try {
      const { API_BASE: apiBase } = await import("@/lib/api");

      // Build redirect URL back to our page
      const origin = window.location.origin;
      const redirectUrl = `${origin}/pagamento?pagamento=sucesso`;

      const res = await fetch(`${apiBase}/api/pagamento/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan: selectedPlan,
          name: form.name,
          email: form.email,
          cpf: form.cpf.replace(/\D/g, ""),
          phone: form.phone.replace(/\D/g, ""),
          redirectUrl,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erro ao criar pagamento. Tente novamente.");
        setLoading(false);
        return;
      }

      setPaymentUrl(data.paymentUrl);
      setSandbox(data.sandbox || false);
      setStep("redirect");
    } catch {
      setError("Erro de conexão. Verifique sua internet e tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  const planPrice = (selectedPlan.price / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  const isConsultoria = selectedPlan.id === "consultoria";

  return (
    <div className="min-h-screen bg-gray-50">
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <main className="pt-24 pb-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">

          {/* Top nav */}
          {step !== "success" && step !== "redirect" && (
            <div className="flex items-center gap-3 mb-8">
              {step === "form" && (
                <button
                  onClick={() => setStep("plan")}
                  className="flex items-center gap-1 text-[#2e6b4d] font-semibold text-sm hover:opacity-80 transition-opacity"
                >
                  <ChevronLeft size={18} /> Voltar
                </button>
              )}
              <div className="ml-auto">
                <StepBar step={step} />
              </div>
            </div>
          )}

          {/* ── STEP 1: Escolha o plano ── */}
          {step === "plan" && (
            <div>
              <h1 className="text-3xl font-black text-[#1f3d2b] mb-2 text-center">Escolha seu plano</h1>
              <p className="text-gray-500 mb-8 text-center text-sm">
                {planType === "comercio" && "Planos para empresas de comércio — assinatura mensal recorrente"}
                {planType === "servico" && "Planos para empresas de serviço — assinatura mensal recorrente"}
                {planType === "consultoria" && "Pacote de consultoria estratégica — pagamento único"}
                {planType === "todos" && "Selecione o plano ideal para sua empresa"}
              </p>

              {error && (
                <div className="flex items-center gap-2 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm mb-6">
                  <AlertCircle size={16} className="flex-shrink-0" />
                  {error}
                </div>
              )}

              {(planType === "todos" || planType === "comercio") && (
                <div className="mb-10">
                  {planType === "todos" && <h3 className="text-xs font-bold uppercase tracking-wider text-[#2e6b4d] mb-4 text-center">Empresas de Comércio</h3>}
                  <div className="grid sm:grid-cols-2 gap-6 items-start">
                    {comercioPlans.map((card) => (
                      <PlanCard key={card.id} plan={card} onSelect={() => {
                        const found = plans.find((p) => p.id === `${card.id.replace("comercio-", "")}-comercio`);
                        if (found) { setSelectedPlan(found); setStep("form"); }
                      }} />
                    ))}
                  </div>
                </div>
              )}

              {(planType === "todos" || planType === "servico") && (
                <div className="mb-10">
                  {planType === "todos" && <h3 className="text-xs font-bold uppercase tracking-wider text-[#2e6b4d] mb-4 text-center">Empresas de Serviço</h3>}
                  <div className="grid sm:grid-cols-2 gap-6 items-start">
                    {servicoPlans.map((card) => (
                      <PlanCard key={card.id} plan={card} onSelect={() => {
                        const found = plans.find((p) => p.id === `${card.id.replace("servico-", "")}-servico`);
                        if (found) { setSelectedPlan(found); setStep("form"); }
                      }} />
                    ))}
                  </div>
                </div>
              )}

              {(planType === "todos" || planType === "consultoria") && (
                <div>
                  {planType === "todos" && <h3 className="text-xs font-bold uppercase tracking-wider text-[#2e6b4d] mb-4 text-center">Consultoria Estratégica</h3>}
                  <ConsultoriaCard onSelect={() => {
                    const found = plans.find((p) => p.id === "consultoria");
                    if (found) { setSelectedPlan(found); setStep("form"); }
                  }} />
                </div>
              )}
            </div>
          )}

          {/* ── STEP 2: Dados do cliente ── */}
          {step === "form" && (
            <form onSubmit={handleSubmit} noValidate>
              <h1 className="text-3xl font-black text-[#1f3d2b] mb-1">Seus dados</h1>
              <p className="text-gray-500 mb-8 text-sm">
                {selectedPlan.name} · <strong>{planPrice}</strong>{isConsultoria ? " (único)" : "/mês"}
              </p>

              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 space-y-5">

                {/* Resumo do plano */}
                <div className="flex items-center justify-between p-4 rounded-2xl" style={{ background: "rgba(46,107,77,0.06)", border: "1px solid rgba(46,107,77,0.12)" }}>
                  <div>
                    <p className="text-[#1f3d2b] font-bold text-sm">{selectedPlan.name}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{isConsultoria ? "Pagamento único" : "Assinatura mensal recorrente"}</p>
                  </div>
                  <p className="text-[#1f3d2b] font-black text-lg">{planPrice}</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-gray-700">Nome completo *</label>
                    <input type="text" required value={form.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      placeholder="Seu nome completo"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#2e6b4d] transition-colors" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-gray-700">E-mail *</label>
                    <input type="email" required value={form.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      placeholder="seu@email.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#2e6b4d] transition-colors" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-gray-700">CPF *</label>
                    <input type="text" required value={form.cpf}
                      onChange={(e) => handleChange("cpf", formatCPF(e.target.value))}
                      placeholder="000.000.000-00"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#2e6b4d] transition-colors" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-gray-700">Telefone *</label>
                    <input type="tel" required value={form.phone}
                      onChange={(e) => handleChange("phone", formatPhone(e.target.value))}
                      placeholder="(37) 99999-9999"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#2e6b4d] transition-colors" />
                  </div>
                </div>

                {error && (
                  <div className="flex items-center gap-2 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm">
                    <AlertCircle size={16} className="flex-shrink-0" />
                    {error}
                  </div>
                )}

                <button type="submit" disabled={loading}
                  className="w-full py-4 rounded-2xl font-bold text-white text-base transition-all hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2"
                  style={{ background: "linear-gradient(135deg, #1f3d2b, #2e6b4d)" }}>
                  {loading ? (
                    <><Loader2 size={18} className="animate-spin" /> Criando pagamento...</>
                  ) : (
                    <><Lock size={16} /> Ir para pagamento seguro</>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 text-xs text-gray-400 pt-1">
                  <Lock size={12} />
                  <span>Pagamento 100% seguro processado pelo PagBank · SSL criptografado</span>
                </div>
              </div>
            </form>
          )}

          {/* ── STEP 3: Redirecionar para PagBank ── */}
          {step === "redirect" && (
            <div className="text-center py-8">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ background: "rgba(46,107,77,0.1)" }}>
                <ExternalLink size={36} style={{ color: "#2e6b4d" }} />
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-[#1f3d2b] mb-3">
                Tudo pronto! Siga para o pagamento
              </h1>
              <p className="text-gray-500 mb-3 max-w-sm mx-auto text-sm leading-relaxed">
                Você será direcionado para o ambiente seguro do <strong>PagBank</strong> para concluir o pagamento de <strong>{planPrice}</strong>.
              </p>
              <p className="text-gray-400 text-xs mb-8">
                Aceita <strong>Pix</strong>, <strong>Cartão de Crédito</strong> e <strong>Boleto Bancário</strong>
              </p>

              {sandbox && (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-6" style={{ background: "rgba(245,158,11,0.1)", color: "#d97706", border: "1px solid rgba(245,158,11,0.2)" }}>
                  🧪 Ambiente de testes (sandbox) — nenhum valor real será cobrado
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={paymentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-white text-base transition-all hover:-translate-y-0.5"
                  style={{ background: "linear-gradient(135deg, #1f3d2b, #2e6b4d)" }}
                >
                  <Lock size={16} />
                  Pagar {planPrice} agora
                  <ExternalLink size={15} />
                </a>
              </div>

              <button
                onClick={() => setStep("form")}
                className="block mx-auto mt-4 text-sm text-gray-400 hover:text-gray-600 transition-colors"
              >
                ← Voltar e alterar dados
              </button>

              <div className="mt-8 flex items-center justify-center gap-2 text-xs text-gray-400">
                <Lock size={12} />
                <span>Ambiente seguro PagBank · SSL · Seus dados estão protegidos</span>
              </div>
            </div>
          )}

          {/* ── STEP 4: Sucesso (retorno do PagBank) ── */}
          {step === "success" && (
            <div className="text-center py-12">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ background: "rgba(46,107,77,0.1)" }}>
                <CheckCircle2 size={40} style={{ color: "#2e6b4d" }} />
              </div>
              <h1 className="text-3xl font-black text-[#1f3d2b] mb-3">Pagamento realizado!</h1>
              <p className="text-gray-500 mb-8 max-w-sm mx-auto">
                Obrigado! Seu pagamento foi processado com sucesso. Em breve nossa equipe entrará em contato para dar continuidade ao seu atendimento.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={`https://wa.me/553732228889?text=${encodeURIComponent("Olá! Acabei de realizar o pagamento pelo site e gostaria de confirmar com a equipe.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-bold text-white text-sm transition-all hover:-translate-y-0.5"
                  style={{ background: "#25D366" }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Confirmar com a equipe
                </a>
                <button
                  onClick={() => navigate("/")}
                  className="px-6 py-3 rounded-2xl font-bold text-[#2e6b4d] text-sm border-2 border-[#2e6b4d] hover:bg-[#2e6b4d] hover:text-white transition-all"
                >
                  Voltar ao início
                </button>
              </div>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
