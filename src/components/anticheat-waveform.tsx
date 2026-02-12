import { useEffect, useMemo, useState } from "react";
import { BrainCircuit, ChevronRight, ShieldCheck, Swords, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { showSuccess } from "@/utils/toast";
import logoHorus from "@/assets/logo_transparente.png";

type EventTone = "cyan" | "fuchsia" | "emerald";

type Event = {
  id: string;
  lane: 0 | 1 | 2;
  t: EventTone;
  x: number; // 0..1 (timeline position)
  label: string;
};

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!;
}

function tone(t: EventTone) {
  if (t === "fuchsia") return { text: "text-fuchsia-200", bg: "bg-fuchsia-400", ring: "ring-fuchsia-400/25" };
  if (t === "emerald") return { text: "text-emerald-200", bg: "bg-emerald-400", ring: "ring-emerald-400/25" };
  return { text: "text-cyan-200", bg: "bg-cyan-400", ring: "ring-cyan-400/25" };
}

function genEvent(i: number): Event {
  const t = pick<EventTone>(["cyan", "fuchsia", "emerald"]);
  const label = t === "emerald" ? "OK: integridad" : t === "fuchsia" ? "Flag: patrón sospechoso" : "Señal: anomalía";
  return {
    id: `${Date.now()}-${i}-${Math.random().toString(16).slice(2)}`,
    lane: pick<Event["lane"]>([0, 1, 2]),
    t,
    x: 1.02 + Math.random() * 0.3,
    label,
  };
}

export default function AntiCheatWaveform() {
  const [events, setEvents] = useState<Event[]>(() => Array.from({ length: 7 }, (_, i) => genEvent(i)));
  const [status, setStatus] = useState<string>("Stream activo: capturando señales…");

  const waves = useMemo(
    () => [
      {
        name: "NET",
        path: "M0,22 C28,10 48,34 76,22 C104,10 124,34 152,22 C180,10 200,34 228,22 C256,10 276,34 304,22",
        stroke: "rgba(34,211,238,.65)",
      },
      {
        name: "INTEGRITY",
        path: "M0,22 C22,22 36,8 58,8 C80,8 92,36 118,36 C144,36 152,10 176,10 C200,10 212,34 238,34 C264,34 280,18 304,18",
        stroke: "rgba(232,121,249,.60)",
      },
      {
        name: "BEHAVIOR",
        path: "M0,24 C20,30 40,18 60,24 C80,30 100,18 120,24 C140,30 160,18 180,24 C200,30 220,18 240,24 C260,30 280,18 304,24",
        stroke: "rgba(16,185,129,.58)",
      },
    ],
    [],
  );

  useEffect(() => {
    const t = window.setInterval(() => {
      setEvents((prev) => {
        // move left
        const moved = prev
          .map((e) => ({ ...e, x: e.x - 0.035 }))
          .filter((e) => e.x > -0.08);

        // add new occasionally
        if (Math.random() < 0.75) moved.push(genEvent(moved.length));
        if (Math.random() < 0.25) moved.push(genEvent(moved.length + 1));

        return moved.slice(-12);
      });
    }, 220);

    return () => window.clearInterval(t);
  }, []);

  useEffect(() => {
    const t = window.setInterval(() => {
      setStatus((s) => {
        if (s.includes("capturando")) return "IA: correlacionando stream…";
        if (s.includes("correlacionando")) return "Anti‑cheat: acción / mitigación";
        return "Stream activo: capturando señales…";
      });
    }, 2100);
    return () => window.clearInterval(t);
  }, []);

  return (
    <Card className="relative overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-950/55 backdrop-blur">
      <div className="grid gap-6 p-6 lg:grid-cols-2 lg:items-center">
        {/* Visual */}
        <div className="mx-auto w-full max-w-[560px]">
          <div className="relative overflow-hidden rounded-[2rem] border border-zinc-800 bg-black/35">
            <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:linear-gradient(to_right,rgba(255,255,255,.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.10)_1px,transparent_1px)] [background-size:64px_64px]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(34,211,238,.10),transparent_55%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(232,121,249,.08),transparent_55%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_55%_35%,rgba(16,185,129,.06),transparent_55%)]" />

            {/* Top header */}
            <div className="flex items-center justify-between gap-3 border-b border-zinc-800/80 bg-zinc-950/35 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-2xl border border-cyan-400/25 bg-zinc-950/40 shadow-[0_0_26px_rgba(34,211,238,.14)] ring-1 ring-cyan-400/15">
                  <img
                    src={logoHorus}
                    alt="Ojo Horus"
                    className="h-7 w-7 object-contain [filter:drop-shadow(0_0_14px_rgba(34,211,238,.30))]"
                    loading="lazy"
                  />
                </div>
                <div>
                  <div className="text-xs font-semibold tracking-[0.16em] text-zinc-200/75">ANTI‑CHEAT STREAM</div>
                  <div className="mt-1 text-sm font-semibold text-zinc-50">Detección en tiempo real</div>
                </div>
              </div>
              <div className="rounded-xl border border-cyan-400/15 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-100">
                LIVE
              </div>
            </div>

            {/* Waveform area */}
            <div className="relative px-5 py-5">
              <div className="grid gap-4">
                {waves.map((w, idx) => (
                  <div key={w.name} className="relative">
                    <div className="mb-2 flex items-center justify-between text-[11px] text-zinc-300/80">
                      <span className="font-semibold tracking-[0.14em]">{w.name}</span>
                      <span className="text-zinc-400/70">stream</span>
                    </div>
                    <svg viewBox="0 0 304 44" className="h-11 w-full overflow-visible">
                      <path d={w.path} fill="none" stroke={w.stroke} strokeWidth={2.2} strokeLinecap="round" />
                      <path
                        d={w.path}
                        fill="none"
                        stroke={w.stroke}
                        strokeWidth={6}
                        strokeLinecap="round"
                        opacity={0.18}
                      />
                    </svg>

                    {/* events on this lane */}
                    <div className="absolute inset-x-0 top-[26px] h-0">
                      {events
                        .filter((e) => e.lane === (idx as 0 | 1 | 2))
                        .map((e) => {
                          const c = tone(e.t);
                          return (
                            <button
                              key={e.id}
                              type="button"
                              className="absolute -translate-x-1/2 -translate-y-1/2"
                              style={{ left: `${e.x * 100}%` }}
                              onClick={() => setStatus(e.label)}
                              aria-label={e.label}
                              title={e.label}
                            >
                              <span className={["relative block h-2.5 w-2.5 rounded-full", c.bg, "shadow-[0_0_18px_rgba(255,255,255,.10)]"].join(" ")}>
                                <span
                                  className={[
                                    "absolute inset-0 rounded-full opacity-55",
                                    "animate-[ping_1.25s_cubic-bezier(0,0,0.2,1)_infinite]",
                                    "ring-4",
                                    c.ring,
                                  ].join(" ")}
                                />
                              </span>
                            </button>
                          );
                        })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-2xl border border-zinc-800 bg-zinc-950/35 px-4 py-3">
                <div className="text-[11px] font-semibold tracking-[0.16em] text-zinc-200/75">ESTADO</div>
                <div className="mt-1 text-sm font-semibold text-cyan-100">{status}</div>
                <div className="mt-1 text-xs text-zinc-300/80">
                  Señales: red + integridad + comportamiento → correlación IA → acción anti‑cheat.
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3 text-center text-xs text-zinc-400/80">
            Tip: toca un marcador para ver qué tipo de señal se ha detectado.
          </div>
        </div>

        {/* Copy */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-black/25 px-3 py-1 text-xs text-zinc-200">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-300" />
            <span>Anti‑cheat + IA (capa Horus)</span>
          </div>

          <h3 className="text-balance text-xl font-semibold tracking-tight text-zinc-50 sm:text-2xl">
            No es un radar circular: es un “stream” de señales.
          </h3>

          <p className="text-pretty text-sm leading-relaxed text-zinc-300/90">
            Este módulo representa el anti‑cheat como un flujo continuo: capturamos señales (red, integridad, comportamiento),
            las correlacionamos con IA y aplicamos reglas para mitigar abuso.
          </p>

          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { icon: <Swords className="h-4 w-4" />, title: "Checks", desc: "Integridad" },
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
              onClick={() => showSuccess("Perfecto — coordinamos una demo del sistema.")}
            >
              Pedir demo
            </Button>
          </div>

          <div className="text-[11px] leading-relaxed text-zinc-400/80">
            Nota: visual conceptual para comunicar el anti‑cheat como señales + correlación.
          </div>
        </div>
      </div>
    </Card>
  );
}
