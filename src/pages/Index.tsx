import { useMemo } from "react";
import {
  ChevronRight,
  ShieldCheck,
  Zap,
  Server,
  BrainCircuit,
  Swords,
  GlobeLock,
  Check,
  ArrowRight,
  KeyRound,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { showSuccess } from "@/utils/toast";
import logoHorus from "@/assets/logo_transparente.png";
import arenaImg from "@/assets/arena_horus.png";
import conexionVpn from "@/assets/conexion_vpn.png";
import bibliotecaJuegos from "@/assets/biblioteca_juegos.png";
import horusPassImg from "@/assets/HorusPass.png";
import horusServers from "@/assets/horus_servers.png";
import AntiCheatWaveform from "@/components/anticheat-waveform";
import GamesSection from "@/components/games-section";

type Tone = "pink" | "blue" | "green";

const tone = {
  pink: {
    text: "text-fuchsia-300",
    border: "border-fuchsia-400/25",
    ring: "ring-fuchsia-400/25",
    glow: "shadow-[0_0_0_1px_rgba(232,121,249,.30),0_0_34px_rgba(232,121,249,.18)]",
    chip: "bg-fuchsia-500/10",
    dot: "bg-fuchsia-400",
  },
  blue: {
    text: "text-cyan-300",
    border: "border-cyan-400/25",
    ring: "ring-cyan-400/25",
    glow: "shadow-[0_0_0_1px_rgba(34,211,238,.28),0_0_34px_rgba(34,211,238,.18)]",
    chip: "bg-cyan-500/10",
    dot: "bg-cyan-400",
  },
  green: {
    text: "text-emerald-300",
    border: "border-emerald-400/25",
    ring: "ring-emerald-400/25",
    glow: "shadow-[0_0_0_1px_rgba(16,185,129,.28),0_0_34px_rgba(16,185,129,.18)]",
    chip: "bg-emerald-500/10",
    dot: "bg-emerald-400",
  },
} satisfies Record<Tone, Record<string, string>>;

function Pill({
  t,
  icon,
  children,
}: {
  t: Tone;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  const s = tone[t];
  return (
    <span
      className={[
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs",
        "bg-zinc-950/55 backdrop-blur",
        s.border,
        "text-zinc-100",
      ].join(" ")}
    >
      <span className={s.text}>{icon}</span>
      <span className="tracking-wide">{children}</span>
    </span>
  );
}

function SectionTitle({
  kicker,
  title,
  subtitle,
}: {
  kicker: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <div className="text-xs font-semibold tracking-[0.18em] text-zinc-300/70">{kicker}</div>
      <h2 className="mt-3 text-balance text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
        {title}
      </h2>
      <p className="mt-3 text-pretty text-sm leading-relaxed text-zinc-300/90 sm:text-base">{subtitle}</p>
    </div>
  );
}

function FeatureCard({
  t,
  icon,
  title,
  desc,
}: {
  t: Tone;
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  const s = tone[t];
  return (
    <Card
      className={[
        "group relative overflow-hidden rounded-3xl border bg-zinc-950/55 p-6 backdrop-blur",
        "transition-all duration-300 hover:-translate-y-0.5",
        "ring-1",
        s.ring,
        s.border,
        s.glow,
      ].join(" ")}
    >
      <div className="relative z-10 flex items-start gap-4">
        <div
          className={[
            "grid h-12 w-12 shrink-0 place-items-center rounded-2xl border",
            "bg-black/25",
            s.border,
          ].join(" ")}
        >
          <div className={s.text}>{icon}</div>
        </div>
        <div className="min-w-0">
          <div className="text-base font-semibold tracking-tight text-zinc-50">{title}</div>
          <div className="mt-2 text-sm leading-relaxed text-zinc-300/90">{desc}</div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 opacity-70 [background-image:radial-gradient(circle_at_20%_15%,rgba(255,255,255,.07),transparent_55%)]" />
      <div
        className={[
          "pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100",
          t === "pink" ? "bg-fuchsia-500/18" : "",
          t === "blue" ? "bg-cyan-500/18" : "",
          t === "green" ? "bg-emerald-500/18" : "",
        ].join(" ")}
      />
    </Card>
  );
}

function PlanCard({
  t,
  name,
  price,
  note,
  bullets,
  popular,
}: {
  t: Tone;
  name: string;
  price: string;
  note: string;
  bullets: string[];
  popular?: boolean;
}) {
  const s = tone[t];
  return (
    <Card
      className={[
        "relative overflow-hidden rounded-3xl border bg-zinc-950/55 p-6 backdrop-blur",
        "ring-1",
        s.ring,
        s.border,
        s.glow,
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <div className="text-lg font-semibold tracking-tight text-zinc-50">{name}</div>
            {popular ? (
              <Badge className="rounded-full border-0 bg-cyan-500/15 px-2 py-0.5 text-[11px] text-cyan-200">
                Más elegido
              </Badge>
            ) : null}
          </div>
          <div className="mt-1 text-sm text-zinc-300/90">{note}</div>
        </div>

        <div className={["rounded-2xl border px-3 py-2 text-right", s.border, s.chip].join(" ")}>
          <div className="text-xs text-zinc-200/80">desde</div>
          <div className={["text-xl font-semibold leading-none", s.text].join(" ")}>{price}</div>
          <div className="mt-1 text-[11px] text-zinc-200/70">/ mes</div>
        </div>
      </div>

      <Separator className="my-5 bg-zinc-800/70" />

      <ul className="space-y-3">
        {bullets.map((b) => (
          <li key={b} className="flex items-start gap-2 text-sm text-zinc-200/90">
            <span className={["mt-0.5 grid h-5 w-5 place-items-center rounded-full border", s.border].join(" ")}>
              <Check className={["h-3.5 w-3.5", s.text].join(" ")} />
            </span>
            <span className="leading-relaxed">{b}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 grid gap-2">
        <Button
          className={[
            "rounded-2xl border bg-zinc-50/5 text-zinc-50 hover:bg-zinc-50/10",
            s.border,
          ].join(" ")}
          onClick={() => showSuccess(`Solicitud enviada: plan ${name}`)}
        >
          Elegir {name}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          className="rounded-2xl text-zinc-200 hover:bg-zinc-50/5 hover:text-zinc-50"
          onClick={() => showSuccess("Te contactaremos con detalles del plan.")}
        >
          Hablar con ventas
        </Button>
      </div>

      <div
        className={[
          "pointer-events-none.absolute -left-24 -top-24 h-72 w-72 rounded-full.blur-3xl opacity-60",
          t === "pink" ? "bg-fuchsia-500/12" : "",
          t === "blue" ? "bg-cyan-500/12" : "",
          t === "green" ? "bg-emerald-500/12" : "",
        ].join(" ")}
      />
    </Card>
  );
}

function ImageCard({
  src,
  alt,
  caption,
  t,
}: {
  src: string;
  alt: string;
  caption: string;
  t: Tone;
}) {
  const s = tone[t];
  return (
    <Card
      className={[
        "relative overflow-hidden rounded-3xl border bg-zinc-950/50 backdrop-blur",
        "ring-1",
        s.ring,
        s.border,
      ].join(" ")}
    >
      <div className="relative">
        <img src={src} alt={alt} className="h-56 w-full object-cover sm:h-64" loading="lazy" />
        <div className="pointer-events-none absolute inset-0 bg-black/40" />
        <div className="pointer-events-none absolute inset-0 opacity-70 [background-image:radial-gradient(circle_at_30%_10%,rgba(255,255,255,.10),transparent_55%)]" />
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2">
          <span className={["h-2 w-2 rounded-full", s.dot].join(" ")} />
          <div className="text-sm font-semibold text-zinc-50">{caption}</div>
        </div>
        <div className="mt-2 text-sm leading-relaxed text-zinc-300/90">
          Visual de referencia (lo reemplazamos por imágenes reales de la app/panel cuando las tengas).
        </div>
      </div>
    </Card>
  );
}

const Index = () => {
  const stats = useMemo(
    () => [
      { k: "Infra propia", v: "Rutas optimizadas", t: "blue" as const },
      { k: "Privacidad", v: "VPN directa (sin espías)", t: "pink" as const },
      { k: "Integridad", v: "Anti‑cheat + IA", t: "green" as const },
    ],
    [],
  );

  return (
    <div className="min-h-screen bg-black text-zinc-50">
      {/* ... resto del componente sin cambios ... */}
    </div>
  );
};

export default Index;