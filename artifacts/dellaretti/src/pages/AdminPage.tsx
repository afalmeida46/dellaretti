import { useState, useEffect } from "react";
import { Search, LogOut, RefreshCw, Users, CreditCard, MessageSquare } from "lucide-react";
import { API_BASE } from "@/lib/api";

const ADMIN_TOKEN = "dellaretti@admin2024";

interface Lead {
  id: number;
  tipo: string;
  estado: string;
  nome: string;
  telefone: string;
  email: string;
  ramo: string;
  cpf?: string;
  nomeEmpresa?: string;
  previsaoFaturamento?: string;
  funcionarios?: string;
  faturamentoAnual?: string;
  regimeTributario?: string;
  tempoEmpresa?: string;
  createdAt: string;
}

interface Payment {
  id: string;
  createdAt: string;
  method: "credit" | "pix";
  status: string;
  planId: string;
  planName: string;
  planPrice: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerCpf: string;
  pagbankId?: string;
}

interface ContactMsg {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  ramo?: string;
  ramoDescricao?: string;
  faturamentoAnual?: string;
  regimeTributario?: string;
  assunto?: string;
  mensagem?: string;
  createdAt: string;
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
  } catch {
    return iso;
  }
}

function formatBRL(cents: number) {
  return (cents / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function statusBadge(status: string) {
  const s = status.toUpperCase();
  if (s === "PAID" || s === "AUTHORIZED" || s === "ACTIVE")
    return { bg: "rgba(46,107,77,0.12)", color: "#1f3d2b", label: "Pago" };
  if (s === "WAITING")
    return { bg: "rgba(245,158,11,0.12)", color: "#92400e", label: "Aguardando" };
  if (s === "PROCESSING")
    return { bg: "rgba(59,130,246,0.12)", color: "#1e40af", label: "Processando" };
  if (s === "ERROR" || s === "DECLINED" || s === "CANCELED" || s === "CANCELLED")
    return { bg: "rgba(239,68,68,0.12)", color: "#991b1b", label: s === "ERROR" ? "Erro" : "Recusado" };
  return { bg: "rgba(107,114,128,0.12)", color: "#374151", label: status };
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [tab, setTab] = useState<"leads" | "pagamentos" | "contatos">("leads");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [contacts, setContacts] = useState<ContactMsg[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"todos" | "Abrir Empresa" | "Trocar de Contador">("todos");

  function normalizeContact(c: any): ContactMsg {
    return {
      id: c.id,
      nome: c.nome,
      email: c.email,
      telefone: c.telefone,
      ramo: c.ramo,
      ramoDescricao: c.ramoDescricao ?? c.ramo_descricao,
      faturamentoAnual: c.faturamentoAnual ?? c.faturamento_anual,
      regimeTributario: c.regimeTributario ?? c.regime_tributario,
      assunto: c.assunto,
      mensagem: c.mensagem,
      createdAt: c.createdAt ?? c.created_at,
    };
  }

  function normalizeLead(l: any): Lead {
    return {
      id: l.id,
      tipo: l.tipo,
      estado: l.estado,
      nome: l.nome,
      telefone: l.telefone,
      email: l.email,
      ramo: l.ramo,
      cpf: l.cpf,
      nomeEmpresa: l.nomeEmpresa ?? l.nome_empresa,
      previsaoFaturamento: l.previsaoFaturamento ?? l.previsao_faturamento,
      funcionarios: l.funcionarios,
      faturamentoAnual: l.faturamentoAnual ?? l.faturamento_anual,
      regimeTributario: l.regimeTributario ?? l.regime_tributario,
      tempoEmpresa: l.tempoEmpresa ?? l.tempo_empresa,
      createdAt: l.createdAt ?? l.created_at,
    };
  }

  function normalizePayment(p: any): Payment {
    return {
      id: p.id,
      createdAt: p.createdAt ?? p.created_at,
      method: p.method,
      status: p.status,
      planId: p.planId ?? p.plan_id,
      planName: p.planName ?? p.plan_name,
      planPrice: p.planPrice ?? p.plan_price ?? 0,
      customerName: p.customerName ?? p.customer_name,
      customerEmail: p.customerEmail ?? p.customer_email,
      customerPhone: p.customerPhone ?? p.customer_phone,
      customerCpf: p.customerCpf ?? p.customer_cpf,
      pagbankId: p.pagbankId ?? p.pagbank_id,
    };
  }

  async function fetchAll() {
    setLoading(true);
    setError("");
    try {
      const [leadsRes, paysRes, contactsRes] = await Promise.all([
        fetch(`${API_BASE}/api/leads?token=${encodeURIComponent(ADMIN_TOKEN)}`),
        fetch(`${API_BASE}/api/pagamento?token=${encodeURIComponent(ADMIN_TOKEN)}`),
        fetch(`${API_BASE}/api/contato?token=${encodeURIComponent(ADMIN_TOKEN)}`),
      ]);
      if (!leadsRes.ok) throw new Error("Unauthorized");
      const ld = await leadsRes.json();
      setLeads((ld.leads || []).map(normalizeLead));
      if (paysRes.ok) {
        const pd = await paysRes.json();
        setPayments((pd.payments || []).map(normalizePayment));
      }
      if (contactsRes.ok) {
        const cd = await contactsRes.json();
        setContacts((cd.contacts || []).map(normalizeContact));
      }
    } catch {
      setError("Erro ao carregar dados.");
    } finally {
      setLoading(false);
    }
  }

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (password === ADMIN_TOKEN) {
      setAuthed(true);
      fetchAll();
    } else {
      setError("Senha incorreta.");
    }
  }

  useEffect(() => {
    document.title = "Admin — Contabilidade Dellaretti";
  }, []);

  const filteredLeads = leads.filter((l) => {
    const matchType = filter === "todos" || l.tipo === filter;
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      l.nome?.toLowerCase().includes(q) ||
      l.email?.toLowerCase().includes(q) ||
      l.telefone?.includes(q) ||
      l.ramo?.toLowerCase().includes(q);
    return matchType && matchSearch;
  });

  const filteredPayments = payments.filter((p) => {
    const q = search.toLowerCase();
    return (
      !q ||
      p.customerName?.toLowerCase().includes(q) ||
      p.customerEmail?.toLowerCase().includes(q) ||
      p.customerPhone?.includes(q) ||
      p.planName?.toLowerCase().includes(q) ||
      p.pagbankId?.toLowerCase().includes(q)
    );
  });

  const filteredContacts = contacts.filter((c) => {
    const q = search.toLowerCase();
    return (
      !q ||
      c.nome?.toLowerCase().includes(q) ||
      c.email?.toLowerCase().includes(q) ||
      c.telefone?.includes(q) ||
      c.ramo?.toLowerCase().includes(q) ||
      c.regimeTributario?.toLowerCase().includes(q)
    );
  });

  const totalReceived = payments
    .filter(p => ["PAID", "AUTHORIZED", "ACTIVE"].includes(p.status?.toUpperCase()))
    .reduce((s, p) => s + (p.planPrice || 0), 0);

  if (!authed) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{ background: "linear-gradient(135deg, #1f3d2b, #2e6b4d)" }}
      >
        <form
          onSubmit={handleLogin}
          className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl w-full max-w-sm"
        >
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 mx-auto"
            style={{ background: "rgba(31,61,43,0.1)" }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1f3d2b" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0110 0v4"/>
            </svg>
          </div>
          <h1 className="text-2xl font-black text-[#1f3d2b] text-center mb-1">Painel Admin</h1>
          <p className="text-gray-400 text-sm text-center mb-6">Contabilidade Dellaretti</p>
          <div className="space-y-4">
            <div>
              <label className="block text-[#1f3d2b] font-semibold text-xs mb-1.5 uppercase tracking-wide">Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                placeholder="••••••••"
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200 text-[#1f3d2b] text-sm outline-none focus:ring-2 focus:ring-[#2e6b4d]/20 focus:border-[#2e6b4d]"
                autoFocus
              />
            </div>
            {error && <p className="text-red-500 text-xs font-medium">{error}</p>}
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl text-white font-bold text-sm transition-all hover:-translate-y-0.5"
              style={{ background: "#2e6b4d" }}
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "#f5f9f7", fontFamily: "'Inter', sans-serif" }}>
      <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #1f3d2b, #2e6b4d)" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
            </svg>
          </div>
          <div>
            <h1 className="font-black text-[#1f3d2b] text-base leading-tight">Painel Admin</h1>
            <p className="text-gray-400 text-xs">Contabilidade Dellaretti</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchAll}
            disabled={loading}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-[#2e6b4d] hover:bg-[#2e6b4d]/10 transition-all"
            title="Sincronizar"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          </button>
          <button
            onClick={() => { setAuthed(false); setLeads([]); setPayments([]); setContacts([]); setPassword(""); }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-red-500 hover:bg-red-50 text-sm font-semibold transition-all"
          >
            <LogOut size={15} /> Sair
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Stats */}
        <div className="grid sm:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Total de Leads", value: leads.length, color: "#2e6b4d" },
            { label: "Contatos Recebidos", value: contacts.length, color: "#1f3d2b" },
            { label: "Pagamentos", value: payments.length, color: "#3d8f65" },
            { label: "Total Recebido", value: formatBRL(totalReceived), color: "#1f3d2b" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <p className="text-gray-400 text-xs font-medium mb-1">{stat.label}</p>
              <p className="text-2xl font-black truncate" style={{ color: stat.color }}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-4 flex-wrap">
          <button
            onClick={() => { setTab("leads"); setSearch(""); }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all"
            style={tab === "leads"
              ? { background: "#1f3d2b", color: "white" }
              : { background: "white", color: "#1f3d2b", border: "1px solid #e5e7eb" }
            }
          >
            <Users size={15} /> Leads ({leads.length})
          </button>
          <button
            onClick={() => { setTab("contatos"); setSearch(""); }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all"
            style={tab === "contatos"
              ? { background: "#1f3d2b", color: "white" }
              : { background: "white", color: "#1f3d2b", border: "1px solid #e5e7eb" }
            }
          >
            <MessageSquare size={15} /> Contatos ({contacts.length})
          </button>
          <button
            onClick={() => { setTab("pagamentos"); setSearch(""); }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all"
            style={tab === "pagamentos"
              ? { background: "#1f3d2b", color: "white" }
              : { background: "white", color: "#1f3d2b", border: "1px solid #e5e7eb" }
            }
          >
            <CreditCard size={15} /> Pagamentos ({payments.length})
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-gray-100 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={
                  tab === "leads" ? "Buscar por nome, email, telefone..."
                  : tab === "contatos" ? "Buscar por nome, email, assunto, mensagem..."
                  : "Buscar por cliente, plano, ID..."
                }
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm text-[#1f3d2b] outline-none focus:ring-2 focus:ring-[#2e6b4d]/20 focus:border-[#2e6b4d]"
              />
            </div>
            {tab === "leads" && (
              <div className="flex gap-2 flex-wrap">
                {(["todos", "Abrir Empresa", "Trocar de Contador"] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap"
                    style={filter === f
                      ? { background: "#1f3d2b", color: "white" }
                      : { background: "#f5f9f7", color: "#1f3d2b" }
                    }
                  >
                    {f === "todos" ? "Todos" : f}
                  </button>
                ))}
              </div>
            )}
          </div>

          {loading ? (
            <div className="py-16 flex items-center justify-center text-gray-400">
              <RefreshCw size={24} className="animate-spin mr-2" /> Carregando...
            </div>
          ) : tab === "leads" ? (
            filteredLeads.length === 0 ? (
              <div className="py-16 text-center text-gray-400 text-sm">
                {leads.length === 0 ? "Nenhum lead recebido ainda." : "Nenhum resultado encontrado."}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ background: "#f8faf9" }}>
                      {["Data", "Tipo", "Nome", "Telefone", "Email", "Estado", "Ramo", "Detalhes"].map((h) => (
                        <th key={h} className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLeads.map((lead) => (
                      <tr key={lead.id} className="border-t border-gray-50 hover:bg-[#f5f9f7] transition-colors">
                        <td className="px-4 py-3 text-gray-400 text-xs whitespace-nowrap">{formatDate(lead.createdAt)}</td>
                        <td className="px-4 py-3">
                          <span
                            className="px-2 py-1 rounded-full text-xs font-bold whitespace-nowrap"
                            style={lead.tipo === "Abrir Empresa"
                              ? { background: "rgba(46,107,77,0.1)", color: "#1f3d2b" }
                              : { background: "rgba(59,130,246,0.1)", color: "#1e40af" }
                            }
                          >
                            {lead.tipo}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-semibold text-[#1f3d2b] whitespace-nowrap">{lead.nome || "—"}</td>
                        <td className="px-4 py-3">
                          {lead.telefone ? (
                            <a
                              href={`https://wa.me/55${lead.telefone.replace(/\D/g, "")}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#2e6b4d] font-medium hover:underline whitespace-nowrap"
                            >
                              {lead.telefone}
                            </a>
                          ) : "—"}
                        </td>
                        <td className="px-4 py-3 text-gray-600">{lead.email || "—"}</td>
                        <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{lead.estado === "mg" ? "Minas Gerais" : lead.estado === "outros" ? "Outros" : lead.estado || "—"}</td>
                        <td className="px-4 py-3 text-gray-600">{lead.ramo || "—"}</td>
                        <td className="px-4 py-3 text-gray-400 text-xs whitespace-nowrap">
                          {lead.tipo === "Abrir Empresa"
                            ? `${lead.nomeEmpresa ? `Empresa: ${lead.nomeEmpresa} · ` : ""}CPF: ${lead.cpf || "—"} · Fat.: ${lead.previsaoFaturamento || "—"}`
                            : `${lead.funcionarios || "—"} func. · ${lead.faturamentoAnual || "—"} · ${lead.regimeTributario || "—"} · ${lead.tempoEmpresa || "—"}`
                          }
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          ) : tab === "contatos" ? (
            filteredContacts.length === 0 ? (
              <div className="py-16 text-center text-gray-400 text-sm">
                {contacts.length === 0 ? "Nenhuma mensagem de contato recebida ainda." : "Nenhum resultado encontrado."}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ background: "#f8faf9" }}>
                      {["Data", "Nome", "Telefone", "Email", "Ramo", "Faturamento Anual", "Regime Tributário"].map((h) => (
                        <th key={h} className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredContacts.map((c) => (
                      <tr key={c.id} className="border-t border-gray-50 hover:bg-[#f5f9f7] transition-colors">
                        <td className="px-4 py-3 text-gray-400 text-xs whitespace-nowrap">{formatDate(c.createdAt)}</td>
                        <td className="px-4 py-3 font-semibold text-[#1f3d2b] whitespace-nowrap">{c.nome || "—"}</td>
                        <td className="px-4 py-3">
                          {c.telefone ? (
                            <a
                              href={`https://wa.me/55${c.telefone.replace(/\D/g, "")}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#2e6b4d] font-medium hover:underline whitespace-nowrap"
                            >
                              {c.telefone}
                            </a>
                          ) : "—"}
                        </td>
                        <td className="px-4 py-3 text-gray-600">{c.email || "—"}</td>
                        <td className="px-4 py-3 text-gray-700 font-medium whitespace-nowrap">
                          {c.ramo || "—"}
                          {c.ramoDescricao && <span className="block text-gray-400 text-xs">{c.ramoDescricao}</span>}
                        </td>
                        <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{c.faturamentoAnual || "—"}</td>
                        <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{c.regimeTributario || "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          ) : filteredPayments.length === 0 ? (
            <div className="py-16 text-center text-gray-400 text-sm">
              {payments.length === 0 ? "Nenhum pagamento recebido ainda." : "Nenhum resultado encontrado."}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ background: "#f8faf9" }}>
                    {["Data", "Cliente", "Email", "Telefone", "CPF", "Plano", "Valor", "Método", "Status", "ID PagBank"].map((h) => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wide whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredPayments.map((p) => {
                    const sb = statusBadge(p.status);
                    return (
                      <tr key={p.id} className="border-t border-gray-50 hover:bg-[#f5f9f7] transition-colors">
                        <td className="px-4 py-3 text-gray-400 text-xs whitespace-nowrap">{formatDate(p.createdAt)}</td>
                        <td className="px-4 py-3 font-semibold text-[#1f3d2b] whitespace-nowrap">{p.customerName || "—"}</td>
                        <td className="px-4 py-3 text-gray-600">{p.customerEmail || "—"}</td>
                        <td className="px-4 py-3">
                          {p.customerPhone ? (
                            <a
                              href={`https://wa.me/55${p.customerPhone.replace(/\D/g, "")}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#2e6b4d] font-medium hover:underline whitespace-nowrap"
                            >
                              {p.customerPhone}
                            </a>
                          ) : "—"}
                        </td>
                        <td className="px-4 py-3 text-gray-500 text-xs whitespace-nowrap">{p.customerCpf || "—"}</td>
                        <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{p.planName || "—"}</td>
                        <td className="px-4 py-3 font-bold text-[#1f3d2b] whitespace-nowrap">{formatBRL(p.planPrice)}</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 rounded-full text-xs font-bold whitespace-nowrap"
                            style={{
                              background: p.method === "pix" ? "rgba(46,107,77,0.1)" : "rgba(59,130,246,0.1)",
                              color: p.method === "pix" ? "#1f3d2b" : "#1e40af",
                            }}>
                            {p.method === "pix" ? "Pix" : "Cartão"}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className="px-2 py-1 rounded-full text-xs font-bold whitespace-nowrap"
                            style={{ background: sb.bg, color: sb.color }}
                          >
                            {sb.label}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-400 text-xs whitespace-nowrap">{p.pagbankId || "—"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
