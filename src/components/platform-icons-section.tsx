import type { ReactNode } from "react";
import { Smartphone, Monitor, Apple, Linux } from "lucide-react";
import { Card } from "@/components/ui/card";

type Platform = {
  id: "iphone" | "android" | "windows" | "mac" | "linux";
  title: string;
  subtitle: string;
  icon: ReactNode;
};

const PLATFORMS: Platform[] = [
  { id: "iphone", title: "iPhone", subtitle: "iOS", icon: <Smartphone className="h-5 w-5" /> },
  { id: "android", title: "Android", subtitle: "App móvil", icon: <Smartphone className="h-5 w-5" /> },
  { id: "windows", title: "Windows", subtitle: "Desktop", icon: <Monitor className="h-5 w-5" /> },
  { id: "mac", title: "Mac", subtitle: "macOS", icon: <Apple className="h-5 w-5" /> },
  { id: "linux", title: "Linux", subtitle: "CLI / Desktop", icon: <Linux className="h-5 w-5" /> },
];

export default function PlatformIconsSection() {
  return (
    <section aria-label="Plataformas" className="mx-auto max-w-6xl px-4 pb-2 sm:px-6">
      <Card className="overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-950/45 backdrop-blur">
        <div className="grid gap-4 p-5 sm:p-6 lg:grid-cols-[1.2fr,2fr] lg:items-center">
          <div>
            <div className="text-xs font-semibold tracking-[0.18em] text-zinc-300/70">PLATAFORMAS</div>
            <h2 className="mt-3 text-balance text-xl font-semibold tracking-tight text-zinc-50 sm:text-2xl">
              Disponible donde juegas.
            </h2>
            <p className="mt-2 text-pretty text-sm leading-relaxed text-zinc-300/90">
              Conéctate desde móvil o escritorio y entra al entorno Horus de forma rápida y consistente.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {PLATFORMS.map((p) => (
              <div
                key={p.id}
                className="group rounded-2xl border border-zinc-800 bg-black/25 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:bg-black/35"
              >
                <div className="flex items-center gap-2 text-sm font-semibold text-zinc-50">
                  <span className="grid h-9 w-9 place-items-center rounded-2xl border border-cyan-400/20 bg-cyan-500/10 text-cyan-200 shadow-[0_0_22px_rgba(34,211,238,.10)]">
                    {p.icon}
                  </span>
                  <span className="leading-none">{p.title}</span>
                </div>
                <div className="mt-2 text-xs text-zinc-300/80">{p.subtitle}</div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </section>
  );
}