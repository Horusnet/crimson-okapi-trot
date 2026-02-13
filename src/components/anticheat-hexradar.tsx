import { useEffect, useMemo, useState } from "react";
import { BrainCircuit, ChevronRight, ShieldCheck, Swords, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { showSuccess } from "@/utils/toast";
import logoHorus from "@/assets/logo_transparente.png";

type Pulse = {
  id: string;
  angle: number; // radians
  radius: number; // 0..1
  tone: "cyan" | "fuchsia" | "emerald";
  label: string;
};

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!;
}

function toneStyles(t: Pulse["tone"]) {
  if (t === "fuchsia") {
    return {
      dot: "bg-fuchsia-300",
      ring: "ring-fuchsia-300/25",
      text: "text-fuchsia-200",
      glow: "shadow-[0_0_22px_rgba(232,121,249,.28)]",
    };
  }
  if (t === "emerald") {
    return {
      dot: "bg-emerald-300",
      ring: "ring-emerald-300/25",
      text: "text-emerald-200",
      glow: "shadow-[0_0_22px_rgba(16,185,129,.26)]",
    };
  }
  return {
    dot: "bg-cyan-300",
    ring: "ring-cyan-300/25",
    text: "text-cyan-200",
    glow: "shadow-[0_0_22px_rgba(34,211,238,.28)]",
  };
}

function genPulse(i: number): Pulse {
  const tone = pick<Pulse["tone"]>(["cyan", "fuchsia", "emerald"]);
  const label =
    tone === "emerald"
      ? "Integridad OK"
      : tone === "fuchsia"
        ? "Patrón sospechoso"
        : "Anomalía de red";

  // keep away from dead center a bit
  const radius = Math.min(0.95, Math.max(0.18, Math.random()));
  const angle = Math.random() * Math.PI * 2;

  return {
    id: `${Date.now()}-${i}-${Math.random().toString(16).slice(2)}`,
    angle,
    radius,
    tone,
    label,
  };
}

export default function AntiCheatHexRadar() {
  const initial = useMemo(() => Array.from({ length: 9 }, (_, i) => genPulse(i)), []);
  const [pulses, setPulses] = useState<Pulse[]>(initial);
  const [status, setStatus] = useState<string>("Hex‑scan activo: monitorizando…");

  useEffect(() => {
    const t = window.setInterval(() => {
      setPulses((prev) => {
        const next = [...prev];
        const idx = Math.floor(Math.random() * next.length);
        next[idx] = genPulse(idx);
        return next;
      });
    }, 1000);

    return () => window.clearInterval(t);
  }, []);

  useEffect(() => {
    const t = window.setInterval(() => {
      setStatus((s) => {
        if (s.includes("monitorizando")) return "IA: correlacionando señales…";
        if (s.includes("correlacionando")) return "Anti‑cheat: aplicando reglas…";
        return "Hex‑scan activo: monitorizando…";
      });
    }, 2100);

    return () => window.clearInterval(t);
  }, []);

  return (
    <Card className="relative overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-950/55 backdrop-blur">
      <div className="grid gap-6 p-6 lg:grid-cols-2 lg:items-center">
        {/* Hex radar */}
        <div className="mx-auto w-full max-w-[460px]">
          <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-zinc-800 bg-black/35">
            {/* hex grid */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.16] [background-image:repeating-linear-gradient(60deg,rgba(255,255,255,.10)_0,rgba(255,255,255,.10)_1px,transparent_1px,transparent_22px),repeating-linear-gradient(-60deg,rgba(255,255,255,.10)_0,rgba(255,255,255,.10)_1px,transparent_1px,transparent_22px),repeating-linear-gradient(0deg,rgba(255,255,255,.08)_0,rgba(255,255,255,.08)_1px,transparent_1px,transparent_22px)]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,.12),transparent_60%)] opacity-70" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(232,121,249,.10),transparent_55%)] opacity-65" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_70%,rgba(16,185,129,.08),transparent_55%)] opacity-55" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_28%,rgba(0,0,0,.65)_78%,rgba(0,0,0,.92))]" />

            {/* rotating spokes */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute inset-[-10%] animate-[spin_6s_linear_infinite]">
                <div className="absolute left-1/2 top-1/2 h-[46%] w-[2px] -translate-x-1/2 -translate-y-full bg-cyan-300/22" />
                <div className="absolute left-1/2 top-1/2 h-[40%] w-[2px] -translate-x-1/2 -translate-y-full rotate-[60deg] bg-fuchsia-300/18" />
                <div className="absolute left-1/2 top-1/2 h-[40%] w-[2px] -translate-x-1/2 -translate-y-full rotate-[120deg] bg-emerald-300/18" />
              </div>
            </div>

            {/* expanding rings */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-1/2 top-1/2 h-[10%] w-[10%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/25 opacity-70 animate-[hexpulse_2.2s_ease-out_infinite]" />
              <div className="absolute left-1/2 top-1/2 h-[10%] w-[10%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-fuchsia-300/20 opacity-60 animate-[hexpulse_2.2s_ease-out_infinite] [animation-delay:0.7s]" />
              <div className="absolute left-1/2 top-1/2 h-[10%] w-[10%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-300/20 opacity-55 animate-[hexpulse_2.2s_ease-out_infinite] [animation-delay:1.4s]" />
            </div>

            {/* center */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="grid h-16 w-16 place-items-center rounded-3xl border border-cyan-400/25 bg-zinc-950/40 shadow-[0_0_44px_rgba(34,211,238,.14)] ring-1 ring-cyan-400/15">
                <img
                  src={logoHorus}
                  alt="Ojo Horus"
                  className="h-12 w-12 object-contain [filter:drop-shadow(0_0_18px_rgba(34,211,238,.34))]"
                  loading="lazy"
                />
              </div>
            </div>

            {/* pulses */}
            {pulses.map((p) => {
              const c = toneStyles(p.tone);
              // polar -> cartesian relative to center, scaled to 46% radius
              const r = p.radius * 46;
              const x = Math.cos(p.angle) * r;
              const y = Math.sin(p.angle) * r;

              return (
                <button
                  key={p.id}
                  type="button"
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{ transform: `translate(calc(-50% + ${x}%), calc(-50% + ${y}%))` }}
                  onClick={() => setStatus(p.label)}
                  aria-label={p.label}
                  title={p.label}
                >
                  <span className={["relative block h-2.5 w-2.5 rounded-full", c.dot, c.glow].join(" ")}>
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

            {/* status bar */}
            <div className="absolute inset-x-4 bottom-4">
              <div className="flex items-center justify-between gap-3 rounded-2xl border border-cyan-400/15 bg-cyan-500/10 px-4 py-3">
                <div className="min-w-0">
                  <div className="text-[11px] font-semibold tracking-[0.16em] text-zinc-200/80">
                    HEX RADAR
                  </div>
                  <div className="truncate text-sm font-semibold text-cyan-100">{status}</div>
                </div>
                <div className="shrink-0 rounded-xl border border-cyan-400/15 bg-black/20 px-3 py-1 text-xs text-zinc-200">
                  LIVE
                </div>
              </div>
            </div>

            <style>
              {`
                @keyframes hexpulse {
                  0% { transform: translate(-50%, -50%) scale(1); opacity: .65; }
                  100% { transform: translate(-50%, -50%) scale(8.2); opacity: 0; }
                }
              `}
            </style>
          </div>

          <div className="mt-3 text-center text-xs text-zinc-400/80">
            Consejo: toca un punto para ver qué está señalando el sistema.
          </div>
        </div>

        {/* Copy */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-black/25 px-3 py-1 text-xs text-zinc-200">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-300" />
            <span>Anti‑cheat + IA (capa Horus)</span>
          </div>

          <h3 className="text-balance text-xl font-semibold tracking-tight text-zinc-50 sm:text-2xl">
            Radar Hex: detección multi‑señal, correlación e intervención.
          </h3>

          <p className="text-pretty text-sm leading-relaxed text-zinc-300/90">
            Un radar “hex” para comunicar que el sistema no mira una sola cosa: combina señales (red, integridad, patrones) y
            decide con IA cuándo actuar.
          </p>

          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { icon: <Swords className="h-4 w-4" />, title: "Anti‑cheat", desc: "Comprobaciones + reglas" },
              { icon: <BrainCircuit className="h-4 w-4" />, title: "IA", desc: "Correlación" },
              { icon: <Zap className="h-4 w-4" />, title: "Acción", desc: "Mitigación" },
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
              onClick={() => showSuccess("Te enviamos el overview del anti‑cheat y la IA.")}
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
            Nota: visual conceptual para comunicar “multi‑señal”.
          </div>
        </div>
      </div>
    </Card>
  );
}
