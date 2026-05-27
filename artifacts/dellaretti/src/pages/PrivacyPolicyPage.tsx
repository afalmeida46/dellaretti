import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";

const sections = [
  {
    title: "1. Introdução",
    content: `A Contabilidade Dellaretti Ltda (CNPJ: 04.853.832/0001-01), doravante denominada "Dellaretti", está comprometida com a proteção da privacidade e dos dados pessoais de seus clientes, parceiros e visitantes do site, em conformidade com a Lei Geral de Proteção de Dados Pessoais (LGPD – Lei n.º 13.709/2018) e demais normas aplicáveis.

Esta Política de Privacidade descreve como coletamos, utilizamos, armazenamos e protegemos suas informações pessoais quando você acessa nosso site ou utiliza nossos serviços.`,
  },
  {
    title: "2. Dados Coletados",
    content: `Coletamos apenas os dados estritamente necessários para a prestação de nossos serviços e para entrar em contato com você:

• Nome completo
• Endereço de e-mail
• Número de telefone / WhatsApp
• Assunto e mensagem de contato
• Dados da empresa (CNPJ, razão social, quando aplicável)

Não coletamos dados sensíveis como informações bancárias, senhas ou documentos de identificação através deste site.`,
  },
  {
    title: "3. Finalidade do Tratamento",
    content: `Utilizamos seus dados pessoais exclusivamente para:

• Responder às suas solicitações de contato e dúvidas
• Apresentar propostas de serviços contábeis solicitadas por você
• Formalizar e executar contratos de prestação de serviços contábeis
• Cumprir obrigações legais e regulatórias aplicáveis à atividade contábil
• Enviar comunicações relacionadas aos serviços contratados

Não utilizamos seus dados para fins comerciais de terceiros, não vendemos, não cedemos e não compartilhamos suas informações pessoais com terceiros para fins de lucro ou marketing.`,
  },
  {
    title: "4. Base Legal para o Tratamento",
    content: `O tratamento dos seus dados pessoais é realizado com base nas seguintes hipóteses legais previstas na LGPD:

• Consentimento: quando você preenche nosso formulário de contato e autoriza o uso dos dados para retorno.
• Execução de contrato: para cumprir as obrigações assumidas no contrato de prestação de serviços contábeis.
• Cumprimento de obrigação legal ou regulatória: para atender exigências legais da atividade contábil.
• Legítimo interesse: para o envio de informações relacionadas aos serviços que você contratou.`,
  },
  {
    title: "5. Compartilhamento de Dados",
    content: `A Dellaretti não vende, não aluga e não compartilha seus dados pessoais com terceiros para fins comerciais.

Seus dados poderão ser compartilhados apenas nas seguintes situações:

• Com órgãos governamentais e autoridades fiscais, quando exigido por lei (ex.: Receita Federal, SEFAZ, eSocial).
• Com prestadores de serviços essenciais para a operação do escritório (ex.: softwares de contabilidade), sempre mediante acordos de confidencialidade.
• Em caso de obrigação legal, ordem judicial ou determinação de autoridade competente.`,
  },
  {
    title: "6. Armazenamento e Segurança",
    content: `Seus dados são armazenados em ambiente seguro e protegido por medidas técnicas e organizacionais adequadas para prevenir acessos não autorizados, perda, alteração ou divulgação indevida.

Mantemos seus dados pelo tempo necessário para a execução do contrato e pelo prazo mínimo exigido pela legislação fiscal e contábil aplicável (geralmente 5 anos após o encerramento da relação contratual).`,
  },
  {
    title: "7. Seus Direitos (LGPD)",
    content: `Como titular dos dados, você possui os seguintes direitos garantidos pela LGPD:

• Confirmação: saber se tratamos seus dados pessoais.
• Acesso: obter cópia dos seus dados que tratamos.
• Correção: solicitar a atualização de dados incompletos, inexatos ou desatualizados.
• Anonimização ou eliminação: solicitar a anonimização ou exclusão de dados desnecessários ou tratados em desconformidade com a lei.
• Portabilidade: solicitar a portabilidade dos seus dados para outro fornecedor de serviços.
• Revogação do consentimento: retirar o consentimento dado a qualquer momento.
• Oposição: opor-se ao tratamento realizado em desacordo com a LGPD.

Para exercer qualquer um desses direitos, entre em contato conosco pelos canais abaixo.`,
  },
  {
    title: "8. Cookies e Tecnologias de Rastreamento",
    content: `Nosso site pode utilizar cookies essenciais para garantir o funcionamento adequado das páginas. Não utilizamos cookies de rastreamento para fins publicitários ou de venda de dados a terceiros.`,
  },
  {
    title: "9. Alterações nesta Política",
    content: `Esta Política de Privacidade pode ser atualizada periodicamente para refletir mudanças nas nossas práticas ou na legislação aplicável. Recomendamos que você consulte esta página regularmente. A data da última atualização estará sempre indicada ao final do documento.`,
  },
  {
    title: "10. Contato",
    content: `Para dúvidas, solicitações ou exercício dos seus direitos previstos na LGPD, entre em contato com o nosso Encarregado de Proteção de Dados (DPO):

Contabilidade Dellaretti Ltda
CNPJ: 04.853.832/0001-01
Endereço: R. Minas Gerais 1142, Centro, Divinópolis - MG, CEP 35500-066
E-mail: contato@contabilidadedellaretti.com.br
Telefone: (37) 3222-8889
WhatsApp: (37) 3222-8889`,
  },
];

export default function PrivacyPolicyPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [, navigate] = useLocation();

  useEffect(() => {
    document.title = "Política de Privacidade | Contabilidade Dellaretti";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} transparent={false} />

      {/* Hero */}
      <section
        className="pt-24 sm:pt-28 pb-16 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1f3d2b 0%, #2e6b4d 100%)" }}
      >
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm font-medium mb-8 transition-colors"
          >
            <ArrowLeft size={16} />
            Voltar ao site
          </button>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            Política de Privacidade
          </h1>
          <p className="text-white/70 text-base leading-relaxed">
            Contabilidade Dellaretti Ltda — CNPJ: 04.853.832/0001-01
          </p>
          <p className="text-white/50 text-sm mt-2">
            Última atualização: Abril de 2025
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 40L1440 40L1440 20C1200 40 960 0 720 20C480 40 240 0 0 20L0 40Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose max-w-none">
            {sections.map((section) => (
              <div key={section.title} className="mb-10">
                <h2 className="text-xl font-black text-[#1f3d2b] mb-4 pb-2 border-b border-[#1f3d2b]/10">
                  {section.title}
                </h2>
                <div className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                  {section.content}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div
            className="mt-16 rounded-3xl p-8 text-center"
            style={{ background: "rgba(31,61,43,0.04)", border: "1px solid rgba(31,61,43,0.1)" }}
          >
            <h3 className="text-[#1f3d2b] font-black text-xl mb-3">Alguma dúvida sobre sua privacidade?</h3>
            <p className="text-gray-500 text-sm mb-6">Entre em contato conosco. Estamos aqui para ajudar e garantir a proteção dos seus dados.</p>
            <a
              href="https://wa.me/553732228889?text=Ol%C3%A1%21%20Tenho%20uma%20d%C3%BAvida%20sobre%20a%20Pol%C3%ADtica%20de%20Privacidade%20da%20Contabilidade%20Dellaretti."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-white font-bold text-sm transition-all hover:-translate-y-0.5"
              style={{ background: "#25D366" }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Falar pelo WhatsApp
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFAB />
    </div>
  );
}
