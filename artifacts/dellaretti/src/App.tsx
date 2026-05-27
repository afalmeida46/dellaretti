import { useState, useEffect } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import FeaturedServices from "@/components/FeaturedServices";
import ConsultoriaSection from "@/components/ConsultoriaSection";
import Contact from "@/components/Contact";
import AppDownload from "@/components/AppDownload";
import ContactInfo from "@/components/ContactInfo";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import QuizModal, { type QuizFlow } from "@/components/QuizModal";
import AbraSuaEmpresaPage from "@/pages/AbraSuaEmpresaPage";
import TroqueDeContadorPage from "@/pages/TroqueDeContadorPage";
import PrivacyPolicyPage from "@/pages/PrivacyPolicyPage";
import PagamentoPage from "@/pages/PagamentoPage";
import AdminPage from "@/pages/AdminPage";

const queryClient = new QueryClient();

function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalFlow, setModalFlow] = useState<QuizFlow>("abrir");

  useEffect(() => {
    document.title = "Contabilidade Dellaretti | Assessoria Empresarial";
  }, []);

  function openModal(flow: QuizFlow) {
    setModalFlow(flow);
    setModalOpen(true);
  }

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Header
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        onOpenModal={openModal}
      />
      <main>
        <Hero />
        <About />
        <Contact />
        <FeaturedServices />
        <ConsultoriaSection />
        <Services />
        <AppDownload />
      </main>
      <ContactInfo />
      <Footer />
      <WhatsAppFAB />
      <QuizModal open={modalOpen} onClose={() => setModalOpen(false)} flow={modalFlow} />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Switch>
            <Route path="/" component={HomePage} />
            <Route path="/abra-sua-empresa" component={AbraSuaEmpresaPage} />
            <Route path="/troque-de-contador" component={TroqueDeContadorPage} />
            <Route path="/politica-de-privacidade" component={PrivacyPolicyPage} />
            <Route path="/pagamento" component={PagamentoPage} />
            <Route path="/admin" component={AdminPage} />
          </Switch>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
