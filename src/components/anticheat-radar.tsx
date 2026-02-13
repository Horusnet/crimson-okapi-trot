import { useEffect, useMemo, useState } from "react";
import { BrainCircuit, ChevronRight, ShieldCheck, Swords, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { showSuccess } from "@/utils/toast";
import logoHorus from "@/assets/logo_transparente.png";

type Blip = {
  id: string;
  x: number; // 0..1
  y: number; // 0..1
  tone: "cyan" | "fuchsia" | "emerald";
  label: string;
};

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function genBlip(i: number): Blip {
  // generate around a circle-ish area, keep away from edges a bit
  const x = clamp01(randomBetween(0.12, 0.88));
  const y = clamp01(randomBetween(0.12, 0.88));
  const tone = (["cyan", "fuchsia", "emerald"][i % 3] ?? "cyan") as Blip["tone"];
  const label =
    i % 3 === 0
      ? "Anomalía detectada"
      : i % 3 === 1
        ? "Patrón sospechoso"
        : "Integridad verificada";

  return {
    id: `${Date.now()}-${i}-${Math.random().toString(16).slice(2)}`,
    x,
    y,
    tone,
    label,
  };
}

function toneClasses(tone: Blip["tone"]) {
  if (tone === "fuchsia")
    return {
      dot: "bg-fuchsia-400",
      ring: "ring-fuchsia-400/25",
      text: "text-fuchsia-200",
    };
  if (tone === "emerald")
    return {
      dot: "bg-emerald-400",
      ring: "ring-emerald-400/25",
      text: "text-emerald-200",
    };
  return { dot: "bg-cyan-400", ring: "ring-cyan-400/25", text: "text-cyan-200" };
}

export default function AntiCheatRadar() {
  const initial = useMemo(() => Array.from({ length: 8 }, (_, i) => genBlip(i)), []);
  const [blips, setBlips] = useState<Blip[]>(initial);
  const [activeLabel, setActiveLabel] = useState<string>("Escaneando entorno…");

  useEffect(() => {
    const t = window.setInterval(() => {
      setBlips((prev) => {
        const next = [...prev];
        const replaceIndex = Math.floor(Math.random() * next.length);
        next[replaceIndex] = genBlip(replaceIndex);
        return next;
      });
    }, 1200);

    return () => window.clearInterval(t);
  }, []);

  useEffect(() => {
    const t = window.setInterval(() => {
      setActiveLabel((prev) => {
        if (prev.includes("Escaneando")) return "Señales en tiempo real (IA)";
        if (prev.includes("IA")) return "Anti‑cheat activo en servidores Horus";
        return "Escaneando entorno…";
      });
    }, 2200);

    return () => window.clearInterval(t);
  }, []);

  return (
    <Card className="relative overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-950/55 backdrop-blur">
      <div className="grid gap-5 p-6 lg:grid-cols-2 lg:items-center">
        {/* Radar */}
        <div className="relative mx-auto w-full max-w-[420px]">
          <div className="relative aspect-square w-full overflow-hidden rounded-[2rem] border border-zinc-800 bg-black/35">
            {/* grid + vignette */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.14] [background-image:linear-gradient(to_right,rgba(255,255,255,.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.10)_1px,transparent_1px)] [background-size:44px_44px]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,.12),transparent_60%)] opacity-60" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,.65)_78%,rgba(0,0,0,.9))]" />

            {/* rings */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/15" />
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[54%] w-[54%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/15" />
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[30%] w-[30%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/15" />
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[2px] w-[86%] -translate-x-1/2 -translate-y-1/2 bg-cyan-400/10" />
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[86%] w-[2px] -translate-x-1/2 -translate-y-1/2 bg-cyan-400/10" />

            {/* sweep */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-1/2 top-1/2 h-[130%] w-[130%] -translate-x-1/2 -translate-y-1/2 rounded-full">
                <div className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 animate-[spin_2.6s_linear_infinite]">
                  <div className="absolute left-1/2 top-1/2 h-1/2 w-1/2 -translate-x-1/2 -translate-y-full origin-bottom">
                    <div className="h-full w-full rounded-[999px] bg-[conic-gradient(from_180deg,rgba(34,211,238,.0),rgba(34,211,238,.0),rgba(34,211,238,.22),rgba(34,211,238,.0))]" />
                  </div>
                  <div className="absolute left-1/2 top-1/2 h-[48%] w-[2px] -translate-x-1/2 -translate-y-full bg-cyan-300/35 blur-[0.2px]" />
                </div>
              </div>
            </div>

            {/* center logo eye */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="grid h-16 w-16 place-items-center rounded-3xl border border-cyan-400/25 bg-zinc-950/40 shadow-[0_0_40px_rgba(34,211,238,.16)] ring-1 ring-cyan-400/15">
                <img
                  src={logoHorus}
                  alt="Ojo Horus"
                  className="h-12 w-12 object-contain [filter:drop-shadow(0_0_18px_rgba(34,211,238,.32))]"
                  loading="lazy"
                />
              </div>
            </div>

            {/* blips */}
            {blips.map((b) => {
              const c = toneClasses(b.tone);
              const left = `${b.x * 100}%`;
              const top = `${b.y * 100}%`;
              return (
                <button
                  key={b.id}
                  type="button"
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left, top }}
                  onClick={() => setActiveLabel(b.label)}
                  aria-label={b.label}
                >
                  <span
                    className={[
                      "relative block h-2.5 w-2.5 rounded-full",
                      c.dot,
                      "shadow-[0_0_18px_rgba(34,211,238,.22)]",
                    ].join(" ")}
                  >
                    <span
                      className={[
                        "absolute inset-0 rounded-full opacity-60",
                        "animate-[ping_1.35s_cubic-bezier(0,0,0.2,1)_infinite]",
                        "ring-4",
                        c.ring,
                      ].join(" ")}
                    />
                  </span>
                </button>
              );
            })}

            {/* label bar */}
            <div className="absolute inset-x-4 bottom-4">
              <div className="flex items-center justify-between gap-3 rounded-2xl border border-cyan-400/15 bg-cyan-500/10 px-4 py-3">
                <div className="min-w-0">
                  <div className="text-[11px] font-semibold tracking-[0.16em] text-zinc-200/80">
                    ANTI‑CHEAT RADAR
                  </div>
                  <div className="truncate text-sm font-semibold text-cyan-100">{activeLabel}</div>
                </div>
                <div className="shrink-0 rounded-xl border border-cyan-400/15 bg-black/20 px-3 py-1 text-xs text-zinc-200">
                  LIVE
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3 text-center text-xs text-zinc-400/80">
            Consejo: toca un punto para ver qué detecta el radar.
          </div>
        </div>

        {/* Copy */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-black/25 px-3 py-1 text-xs text-zinc-200">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-300" />
            <span>Anti‑cheat + IA (capa Horus)</span>
          </div>

          <h3 className="text-balance text-xl font-semibold tracking-tight text-zinc-50 sm:text-2xl">
            El ojo de Horus vigila la integridad del entorno en tiempo real.
          </h3>

          <p className="text-pretty text-sm leading-relaxed text-zinc-300/90">
            En lugar de “solo” cifrar tu conexión, HorusVPN entra a un entorno controlado donde aplicamos detección de
            anomalías, señales de abuso y reglas anti‑cheat para mantener partidas y comunidades limpias.
          </p>

          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { icon: <Swords className="h-4 w-4" />, title: "Anti‑cheat", desc: "Señales + reglas" },
              { icon: <BrainCircuit className="h-4 w-4" />, title: "IA", desc: "Patrones sospechosos" },
              { icon: <Zap className="h-4 w-4" />, title: "Respuesta", desc: "Acción más rápida" },
            ].map((x) => (
              <div key={x.title} className="rounded-2xl border border-zinc-800 bg-black/25 p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-zinc-50">
                  <span className="text-cyan-200">{x.icon}</span>
                  {x.title}
                </div>
                <div className="mt-1 text-xs leading-relaxed text-zinc-300/85">{x.desc}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <Button
              className="rounded-2xl border border-cyan-400/25 bg-cyan-500/15 text-cyan-100 hover:bg-cyan-500/22"
              onClick={() => showSuccess("Anti‑cheat: te enviaremos el overview técnico.")}
            >
              Ver cómo funciona
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="rounded-2xl border-zinc-700 bg-zinc-950/40 text-zinc-50 hover:bg-zinc-50/5"
              onClick={() => showSuccess("Te contactamos para ver necesidades y disponibilidad.")}
            >
              Contactar
            </Button>
          </div>

          <div className="text-[11px] leading-relaxed text-zinc-400/80">
            Nota: esto representa la capa Horus de forma conceptual (no UI final). Al tener tu UI real, lo hacemos 1:1.
          </div>
        </div>
      </div>
    </Card>
  );
}