import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    src: "/banner01.png",
    alt: "Assessoria Societária - Contabilidade Dellaretti",
  },
  {
    src: "/banner02.png",
    alt: "Especialistas em Contabilidade para Postos de Combustíveis - Dellaretti",
  },
  {
    src: "/blindagem.png",
    alt: "Blindagem Patrimonial, Holding e Planejamento Sucessório",
  },
];

export default function Banners() {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const prev = useCallback(() => setCurrent((c) => (c === 0 ? slides.length - 1 : c - 1)), []);
  const next = useCallback(() => setCurrent((c) => (c === slides.length - 1 ? 0 : c + 1)), []);

  useEffect(() => {
    if (isHovered) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [next, isHovered]);

  return (
    <section
      className="relative w-full overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div key={i} className="w-full flex-shrink-0">
            <img
              src={slide.src}
              alt={slide.alt}
              className="w-full object-cover"
              style={{ maxHeight: 260, minHeight: 140, objectPosition: "center" }}
              draggable={false}
            />
          </div>
        ))}
      </div>

      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
        style={{ background: "rgba(31,61,43,0.65)", backdropFilter: "blur(4px)" }}
        aria-label="Anterior"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
        style={{ background: "rgba(31,61,43,0.65)", backdropFilter: "blur(4px)" }}
        aria-label="Próximo"
      >
        <ChevronRight size={20} />
      </button>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="rounded-full transition-all duration-300"
            style={{
              width: current === i ? 20 : 8,
              height: 8,
              background: current === i ? "#2e6b4d" : "rgba(255,255,255,0.7)",
            }}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
