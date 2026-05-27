import { MapPin, Mail, Phone } from "lucide-react";

const contactInfo = [
  {
    icon: <MapPin size={20} />,
    label: "Localização",
    value: "R. Minas Gerais 1142, Centro, Divinópolis - MG",
    href: "https://www.google.com/maps/place/Contabilidade+Dellaretti/@-20.1370626,-44.9004863,17z/data=!4m6!3m5!1s0x0:0x3b005a4626eeee3a!8m2!3d-20.1370626!4d-44.9004863!16s%2Fg%2F1tdsvqj0",
  },
  {
    icon: <Mail size={20} />,
    label: "Email",
    value: "contato@contabilidadedellaretti.com.br",
    href: "mailto:contato@contabilidadedellaretti.com.br",
  },
  {
    icon: <Phone size={20} />,
    label: "Telefone",
    value: "(37) 3222-8889",
    href: "tel:+553732228889",
  },
];

export default function ContactInfo() {
  return (
    <section className="py-12 sm:py-16" style={{ background: "linear-gradient(180deg, #f5f9f7 0%, #eef5f1 100%)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

        {/* Card de informações de contato */}
        <div
          className="rounded-3xl p-6 sm:p-10 flex flex-col sm:flex-row gap-8"
          style={{ background: "linear-gradient(135deg, #1f3d2b, #2e6b4d)" }}
        >
          {/* Texto + infos */}
          <div className="flex-1 space-y-5">
            <div>
              <h3 className="text-white font-black text-xl sm:text-2xl">Informações de contato</h3>
              <p className="text-white/65 text-sm mt-1 leading-relaxed">
                Estamos disponíveis para atender sua empresa com agilidade e profissionalismo.
              </p>
            </div>
            <div className="space-y-4">
              {contactInfo.map((info, i) => (
                <a key={i} href={info.href}
                  target={info.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 group">
                  <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center text-white flex-shrink-0 group-hover:bg-white/25 transition-all">
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-white/55 text-xs font-medium uppercase tracking-wide">{info.label}</p>
                    <p className="text-white font-medium text-sm mt-0.5 leading-snug">{info.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Mapa */}
        <div className="rounded-2xl overflow-hidden shadow-md border border-[#1f3d2b]/10" style={{ height: "300px" }}>
          <iframe
            title="Localização Contabilidade Dellaretti"
            width="100%"
            height="300"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3754.7849452937506!2d-44.90048872482837!3d-20.13706258117604!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x3b005a4626eeee3a!2sContabilidade+Dellaretti!5e0!3m2!1spt-BR!2sbr!4v1712600000000!5m2!1spt-BR!2sbr"
          />
        </div>

      </div>
    </section>
  );
}
