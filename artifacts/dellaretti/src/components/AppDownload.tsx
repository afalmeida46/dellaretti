import { CheckCircle } from "lucide-react";

const features = [
  "Gerenciamento de documentos",
  "Visualização de documentos",
  "Calendário de Obrigações",
  "Acesso rápido às informações",
];

export default function AppDownload() {
  return (
    <section id="aplicativos" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="rounded-3xl overflow-hidden"
          style={{ background: "linear-gradient(135deg, #1f3d2b 0%, #2e6b4d 100%)" }}
        >
          <div className="grid lg:grid-cols-2 gap-0 items-center">
            <div className="p-8 sm:p-10 lg:p-16 space-y-6">
              <div>
                <span className="inline-block text-white/60 text-sm font-bold tracking-wider uppercase mb-3">
                  Aplicativos
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
                  Baixe nosso aplicativo e acesse
                </h2>
                <p className="mt-4 text-white/70 text-base leading-relaxed">
                  Gerenciamento de documentos, Visualização de documentos,
                  Calendário de Obrigações da sua Empresa e muito mais!
                </p>
              </div>

              <div className="space-y-3">
                {features.map((feat) => (
                  <div key={feat} className="flex items-center gap-3">
                    <CheckCircle size={18} className="text-[#4ade80] flex-shrink-0" />
                    <span className="text-white/85 text-sm font-medium">{feat}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <a
                  href="https://apps.apple.com/br/app/contabilidade-dellaretti-ltda/id6449003068"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-5 py-3.5 rounded-2xl hover:opacity-90 transition-all hover:-translate-y-0.5"
                  style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)" }}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <div>
                    <div className="text-white/60 text-xs leading-none">Disponível na</div>
                    <div className="text-white font-bold text-sm leading-tight mt-0.5">Apple Store</div>
                  </div>
                </a>

                <a
                  href="https://play.google.com/store/apps/details?id=com.contabilidadedellaretiltda"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-5 py-3.5 rounded-2xl hover:opacity-90 transition-all hover:-translate-y-0.5"
                  style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)" }}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                    <path d="M3.18 23.76c.35.19.74.24 1.12.12l11.5-6.64-2.67-2.67-9.95 9.19zM.5 1.56C.19 1.97 0 2.52 0 3.22v17.56c0 .7.19 1.25.51 1.66l.09.08 9.84-9.84v-.23L.59 1.47.5 1.56zm20.32 10.01l-2.82-1.63-3.01 3.01 3.01 3.01 2.84-1.64c.81-.47.81-1.23-.02-1.75zM4.3.12L15.8 6.76l-2.67 2.67L3.18.24C3.53.12 3.95.18 4.3.12z"/>
                  </svg>
                  <div>
                    <div className="text-white/60 text-xs leading-none">Disponível na</div>
                    <div className="text-white font-bold text-sm leading-tight mt-0.5">Google Play</div>
                  </div>
                </a>
              </div>
            </div>

            <div className="flex items-center justify-center p-8 lg:p-12">
              <img
                src="/phone-mockup.png"
                alt="App Contabilidade Dellaretti no celular"
                className="w-auto drop-shadow-2xl"
                style={{ maxHeight: "420px", maxWidth: "100%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
