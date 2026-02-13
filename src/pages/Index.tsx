import { useMemo, useState } from "react";
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
import PlatformIconsSection from "@/components/platform-icons-section";

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

type BillingPeriod = "monthly" | "yearly";

type PlanDefinition = {
  t: Tone;
  name: string;
  monthlyPrice: string;
  yearlyPrice: string;
  note: string;
  bullets: string[];
  popular?: boolean;
};

const PLANS: PlanDefinition[] = [
  {
    t: "pink",
    name: "Starter",
    monthlyPrice: "€9,90",
    yearlyPrice: "€99",
    note: "Para jugadores que quieren probar el ecosistema.",
    bullets: [
      "Acceso a la biblioteca básica de servidores",
      "Rendimiento estable para gaming casual",
      "HorusPass incluido (gestor de contraseñas)",
    ],
  },
  {
    t: "blue",
    name: "Pro",
    monthlyPrice: "€14,90",
    yearlyPrice: "€149",
    note: "Jugadores frecuentes, focus en competitivo.",
    bullets: [
      "Acceso ampliado a servidores y modos",
      "Rutas optimizadas para menor latencia",
      "Soporte priorizado en incidencias",
    ],
    popular: true,
  },
  {
    t: "green",
    name: "Squad",
    monthlyPrice: "€24,90",
    yearlyPrice: "€249",
    note: "Para grupos o equipos que juegan juntos.",
    bullets: [
      "Hasta X miembros por suscripción (definir)",
      "Slots reservados en servidores clave",
      "Herramientas para gestionar el grupo",
    ],
  },
];

function PlanCard({
  plan,
  billing,
}: {
  plan: PlanDefinition;
  billing: BillingPeriod;
}) {
  const s = tone[plan.t];
  const price = billing === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;
  const cleaned = (price ?? "").replace("€", "").trim();
  const formattedPrice = `${cleaned} €`;
  const badgeText = plan.popular ? "Más elegido" : billing === "yearly" ? "Ahorra ~2 meses" : undefined;

  return (
    <Card
      className={[
        "relative flex h-full flex-col overflow-hidden rounded-3xl border bg-zinc-950/55 p-6 backdrop-blur",
        "ring-1",
        s.ring,
        s.border,
        s.glow,
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <div className="text-lg font-semibold tracking-tight text-zinc-50">{plan.name}</div>
            {badgeText ? (
              <Badge className="rounded-full border-0 bg-cyan-500/15 px-2 py-0.5 text-[11px] text-cyan-200">
                {badgeText}
              </Badge>
            ) : null}
          </div>
          <div className="mt-1 text-sm text-zinc-300/90">{plan.note}</div>
        </div>

        <div className={["rounded-2xl border px-3 py-2 text-right", s.border, s.chip].join(" ")}>
          <div className="text-xs text-zinc-200/80">
            {billing === "monthly" ? "mensual" : "anual"}
          </div>
          <div className={["text-xl font-semibold leading-none", s.text].join(" ")}>{formattedPrice}</div>
          <div className="mt-1 text-[11px] text-zinc-200/70">
            {billing === "monthly" ? "/ mes" : "~ equivalente / mes"}
          </div>
        </div>
      </div>

      <Separator className="my-5 bg-zinc-800/70" />

      <ul className="space-y-3 text-sm text-zinc-200/90">
        {plan.bullets.map((b) => (
          <li key={b} className="flex items-start gap-2">
            <span className={["mt-0.5 grid h-5 w-5 place-items-center rounded-full border", s.border].join(" ")}>
              <Check className={["h-3.5 w-3.5", s.text].join(" ")} />
            </span>
            <span className="leading-relaxed">{b}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 grid gap-2 pt-1">
        <Button
          className={["rounded-2xl border bg-zinc-50/5 text-zinc-50 hover:bg-zinc-50/10", s.border].join(" ")}
          onClick={() =>
            showSuccess(
              `Solicitud enviada: plan ${plan.name} (${billing === "monthly" ? "mensual" : "anual"})`,
            )
          }
        >
          Elegir {plan.name}
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
          "pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full blur-3xl opacity-60",
          plan.t === "pink" ? "bg-fuchsia-500/12" : "",
          plan.t === "blue" ? "bg-cyan-500/12" : "",
          plan.t === "green" ? "bg-emerald-500/12" : "",
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
  const [billing, setBilling] = useState<BillingPeriod>("monthly");

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
      {/* Ambient */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 top-[-140px] h-[520px] w-[520px] rounded-full bg-fuchsia-500/12 blur-3xl" />
        <div className="absolute -right-48 top-[40px] h-[560px] w-[560px] rounded-full bg-cyan-500/12 blur-3xl" />
        <div className="absolute left-1/3 top-[520px] h-[520px] w-[520px] rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(to_right,rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:56px_56px]" />
      </div>

      {/* Header */}
      <header className="relative z-10">
        <div className="flex w-full items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div
              className={[
                "grid h-11 w-11 place-items-center rounded-2xl border border-zinc-800 bg-zinc-950/60",
                "shadow-[0_0_28px_rgba(34,211,238,.10)]",
              ].join(" ")}
            >
              <img
                src={logoHorus}
                alt="HorusVPN logo"
                className="h-9 w-9 object-contain [filter:drop-shadow(0_0_16px_rgba(34,211,238,.35))]"
                loading="eager"
              />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-tight text-zinc-50">HorusVPN</div>
              <div className="text-xs text-zinc-300/80">Ecosistema gaming</div>
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-sm text-zinc-200/85 md:flex">
            <a className="hover:text-zinc-50" href="#como-funciona">
              Cómo funciona
            </a>
            <a className="hover:text-zinc-50" href="#juegos">
              Juegos
            </a>
            <a className="hover:text-zinc-50" href="#planes">
              Suscripción
            </a>
            <a className="hover:text-zinc-50" href="#seguridad">
              Seguridad
            </a>
            <a className="hover:text-zinc-50" href="#privados">
              Privados
            </a>
            <a className="hover:text-zinc-50" href="#faq">
              FAQ
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <Button
              className="rounded-2xl border border-cyan-400/25 bg-cyan-500/15 text-cyan-100 hover:bg-cyan-500/22"
              onClick={() => showSuccess("Acceso anticipado solicitado.")}
            >
              Acceso anticipado
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        {/* 1. Hero */}
        <section className="w-full px-4 pb-10 pt-6 sm:px-6 sm:pt-10 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="flex flex-wrap gap-2">
                <Pill t="pink" icon={<GlobeLock className="h-3.5 w-3.5" />}>
                  VPN directa a servidores Horus
                </Pill>
                <Pill t="blue" icon={<Zap className="h-3.5 w-3.5" />}>
                  Infra propia: baja latencia
                </Pill>
                <Pill t="green" icon={<BrainCircuit className="h-3.5 w-3.5" />}>
                  Anti‑cheat + IA 24/7
                </Pill>
                <Pill t="blue" icon={<KeyRound className="h-3.5 w-3.5" />}>
                  HorusPass gratis (gestor de contraseñas)
                </Pill>
              </div>

              <h1 className="mt-5 text-balance text-3xl font-semibold tracking-tight text-zinc-50 sm:text-5xl">
                La primera biblioteca de servidores gaming
                <span className="block text-zinc-200/90 font-gaming">a la que entras por VPN, con seguridad blindada.</span>
              </h1>

              <p className="mt-4 max-w-xl text-pretty text-sm leading-relaxed text-zinc-300/90 sm:text-base">
                HorusVPN es un ecosistema único: te conectas con nuestra app VPN directamente a nuestros servidores de juegos por una
                suscripción mensual. Además, ofrecemos alquiler de servidores privados gaming con la misma protección.
                <span className="mt-2 block text-zinc-200/90">
                  Incluye gratis <span className="font-semibold text-cyan-200">HorusPass</span>: app para guardar tus contraseñas.
                </span>
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button
                  className="rounded-2xl border border-fuchsia-400/25 bg-fuchsia-500/15 text-fuchsia-100 hover:bg-fuchsia-500/22"
                  onClick={() => showSuccess("Solicitud enviada: quiero acceso a HorusVPN.")}
                >
                  Quiero acceso
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="rounded-2xl border-zinc-700 bg-zinc-950/40 text-zinc-50 hover:bg-zinc-50/5"
                  onClick={() => {
                    const el = document.querySelector("#planes");
                    el?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                >
                  Ver planes
                </Button>
              </div>

              <div className="mt-7 grid grid-cols-3 gap-3 sm:max-w-lg">
                {stats.map((s) => (
                  <div
                    key={s.k}
                    className={[
                      "rounded-3xl border bg-zinc-950/55 p-4 backdrop-blur",
                      "ring-1",
                      tone[s.t].ring,
                      tone[s.t].border,
                    ].join(" ")}
                  >
                    <div className="text-xs text-zinc-300/80">{s.k}</div>
                    <div className={["mt-1 text-sm font-semibold", tone[s.t].text].join(" ")}>{s.v}</div>
                  </div>
                ))}
              </div>

              <p className="mt-3 text-[11px] leading-relaxed text-zinc-400/80">
                “Lag 0” se refiere a infraestructura propia optimizada y rutas dedicadas; la latencia real puede variar según ubicación y proveedor.
              </p>
            </div>

            <div className="relative">
              <Card className="relative overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-950/50 backdrop-blur">
                <div className="relative">
                  <img
                    src={arenaImg}
                    alt="Gaming setup premium"
                    className="h-[320px] w-full object-cover sm:h-[420px]"
                    loading="lazy"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-black/45" />
                  <div className="pointer-events-none absolute inset-0 opacity-75 [background-image:radial-gradient(circle_at_30%_10%,rgba(255,255,255,.12),transparent_60%)]" />
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-sm font-semibold text-zinc-50">Horus Path</div>
                      <div className="mt-1 text-xs text-zinc-300/80">App → VPN → Servidores Horus → Juego</div>
                    </div>
                    <Badge className="rounded-full border-0 bg-emerald-500/15 px-2 py-0.5 text-[11px] text-emerald-200">
                      Protegido
                    </Badge>
                  </div>

                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    {[
                      { t: "pink" as const, label: "Privacidad", value: "Sin espías" },
                      { t: "blue" as const, label: "Rendimiento", value: "Rutas pro" },
                      { t: "green" as const, label: "Integridad", value: "Anti‑cheat" },
                    ].map((x) => (
                      <div
                        key={x.label}
                        className={[
                          "rounded-2xl border bg-black/30 p-4",
                          "ring-1",
                          tone[x.t].ring,
                          tone[x.t].border,
                        ].join(" ")}
                      >
                        <div className="text-xs text-zinc-300/80">{x.label}</div>
                        <div className={["mt-1 text-sm font-semibold", tone[x.t].text].join(" ")}>
                          {x.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  <Button
                    className="mt-4 w-full rounded-2xl border border-cyan-400/25 bg-cyan-500/15 text-cyan-100 hover:bg-cyan-500/22"
                    onClick={() => showSuccess("Conectando a la biblioteca de servidores…")}
                  >
                    Entrar a la biblioteca
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>

                  <div className="mt-3 flex items-center justify-between rounded-2xl border border-cyan-400/15 bg-cyan-500/10 px-4 py-3">
                    <div className="flex items-center gap-2 text-xs text-zinc-200">
                      <KeyRound className="h-4 w-4 text-cyan-300" />
                      <span>
                        Complemento gratis: <span className="font-semibold text-cyan-200">HorusPass</span>
                      </span>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="rounded-xl text-zinc-200 hover:bg-zinc-50/5 hover:text-zinc-50"
                      onClick={() => showSuccess("HorusPass: acceso incluido gratis con tu suscripción.")}
                    >
                      Ver más
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>

              <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-500/12 blur-3xl" />
              <div className="pointer-events-none absolute -left-20 bottom-[-120px] h-80 w-80 rounded-full bg-fuchsia-500/10 blur-3xl" />
            </div>
          </div>
        </section>

        {/* NUEVO: iconos plataformas */}
        <PlatformIconsSection />

        {/* 2. Cómo funciona */}
        <section id="como-funciona" className="w-full px-4 py-12 sm:px-6 lg:px-8">
          <SectionTitle
            kicker="CÓMO FUNCIONA"
            title="Una experiencia simple: seleccionas, conectas y juegas."
            subtitle="Nada de VPN genérica: tu conexión entra a un entorno Horus controlado, con rendimiento gaming y capas de seguridad."
          />

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            <FeatureCard
              t="blue"
              icon={<Server className="h-5 w-5" />}
              title="Biblioteca de servidores"
              desc="Accede a nuestra lista de servidores por juego, modo y región. Piensa en ello como un catálogo que se actualiza."
            />
            <FeatureCard
              t="pink"
              icon={<GlobeLock className="h-5 w-5" />}
              title="Conexión por VPN directa"
              desc="Entras con nuestra app VPN a la infraestructura Horus: ruta dedicada, menos exposición y más control del entorno."
            />
            <FeatureCard
              t="green"
              icon={<Zap className="h-5 w-5" />}
              title="Juega con estabilidad"
              desc="Servidores propios optimizados para gaming: menos jitter, mejor consistencia y experiencia competitiva."
            />
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            <ImageCard
              t="green"
              src={bibliotecaJuegos}
              alt="Biblioteca de juegos Horus"
              caption="Biblioteca de juegos — selección por juego, modo y región"
            />
            <ImageCard
              t="blue"
              src={conexionVpn}
              alt="Conexión VPN Horus"
              caption="Conexión VPN dirigida — acceso seguro a servidores Horus"
            />
            <ImageCard t="pink" src={horusPassImg} alt="HorusPass" caption="HorusPass — gestor de contraseñas incluido" />
          </div>
        </section>

        {/* 3. Biblioteca de juegos */}
        <section id="juegos">
          <GamesSection />
        </section>

        {/* 4. Suscripción */}
        <section id="planes" className="w-full px-4 py-12 sm:px-6 lg:px-8">
          <SectionTitle
            kicker="SUSCRIPCIÓN"
            title="Eliges un plan, desbloqueas la biblioteca HorusVPN."
            subtitle="Planes pensados para jugadores que quieren algo estable y protegido, sin complicarse con infraestructura."
          />

          <div className="mx-auto mt-6 flex max-w-md items-center justify-center gap-3 rounded-full border border-zinc-800 bg-zinc-950/70 px-2 py-1 text-xs text-zinc-200">
            <button
              type="button"
              onClick={() => setBilling("monthly")}
              className={[
                "flex-1 rounded-full px-3 py-1 transition-colors",
                billing === "monthly" ? "bg-cyan-500/20 text-cyan-100" : "text-zinc-300 hover:bg-zinc-800/60",
              ].join(" ")}
            >
              Mensual
            </button>
            <button
              type="button"
              onClick={() => setBilling("yearly")}
              className={[
                "flex-1 rounded-full px-3 py-1 transition-colors",
                billing === "yearly" ? "bg-emerald-500/20 text-emerald-100" : "text-zinc-300 hover:bg-zinc-800/60",
              ].join(" ")}
            >
              Anual <span className="ml-1 text-[10px] text-emerald-300">(-~2 meses)</span>
            </button>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-3 lg:items-stretch">
            {PLANS.map((plan) => (
              <PlanCard key={plan.name} plan={plan} billing={billing} />
            ))}
          </div>

          <p className="mt-4 text-center text-xs text-zinc-400/85">
            Los precios y características son de ejemplo — ajustamos números y límites cuando tengamos producción y costes definidos.
          </p>
        </section>

        {/* 5. Seguridad */}
        <section id="seguridad" className="w-full px-4 py-12 sm:px-6 lg:px-8">
          <SectionTitle
            kicker="SEGURIDAD"
            title="Blindado por diseño: privacidad, anti‑cheat e IA."
            subtitle="El objetivo es que juegues sin preocuparte: menos exposición de red, más control del entorno y comunidad más limpia."
          />

          <div className="mt-10">
            <AntiCheatWaveform />
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-3 lg:items-stretch">
            <Card className="relative overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-950/55 p-6 backdrop-blur lg:col-span-2">
              <div className="flex flex-wrap gap-2">
                <Badge className="rounded-full border-0 bg-fuchsia-500/15 px-2 py-1 text-[11px] text-fuchsia-200">
                  Sin espías en tu PC mientras juegas
                </Badge>
                <Badge className="rounded-full border-0 bg-cyan-500/15 px-2 py-1 text-[11px] text-cyan-200">
                  Infra Horus controlada
                </Badge>
                <Badge className="rounded-full border-0 bg-emerald-500/15 px-2 py-1 text-[11px] text-emerald-200">
                  Vigilancia IA 24/7
                </Badge>
                <Badge className="rounded-full border-0 bg-cyan-500/15 px-2 py-1 text-[11px] text-cyan-200">
                  HorusPass gratis
                </Badge>
              </div>

              <div className="mt-5 grid gap-3 lg:grid-cols-2">
                {[
                  {
                    t: "pink" as const,
                    icon: <ShieldCheck className="h-5 w-5" />,
                    title: "Privacidad real",
                    desc: "Tu sesión viaja por un túnel hacia infraestructura Horus: reduces exposición mientras juegas.",
                  },
                  {
                    t: "green" as const,
                    icon: <Swords className="h-5 w-5" />,
                    title: "Anti‑cheat instalado",
                    desc: "Defensa activa para mantener integridad en partidas, servidores y comunidades.",
                  },
                  {
                    t: "blue" as const,
                    icon: <BrainCircuit className="h-5 w-5" />,
                    title: "IA vigilando continuamente",
                    desc: "Señales de anomalías y patrones sospechosos: respuesta más rápida, menos abuso.",
                  },
                  {
                    t: "blue" as const,
                    icon: <KeyRound className="h-5 w-5" />,
                    title: "HorusPass (gratis)",
                    desc: "Addon incluido para guardar contraseñas: menos fricción y más seguridad en tus cuentas.",
                  },
                ].map((r) => (
                  <div
                    key={r.title}
                    className={[
                      "rounded-3xl border bg-black/25 p-5",
                      "ring-1",
                      tone[r.t].ring,
                      tone[r.t].border,
                    ].join(" ")}
                  >
                    <div className="flex items-start gap-3">
                      <div className={tone[r.t].text}>{r.icon}</div>
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-zinc-50">{r.title}</div>
                        <div className="mt-1 text-sm leading-relaxed text-zinc-300/90">{r.desc}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="relative overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-950/50 backdrop-blur">
              <div className="relative">
                <img
                  src={horusServers}
                  alt="Horus Network — servidores"
                  className="h-[460px] w-full object-cover"
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-0 bg-black/50" />
                <div className="pointer-events-none absolute inset-0 opacity-70 [background-image:radial-gradient(circle_at_30%_10%,rgba(255,255,255,.10),transparent_60%)]" />
              </div>
              <div className="p-6">
                <div className="text-sm font-semibold text-zinc-50">Horus Network</div>
                <div className="mt-1 text-sm leading-relaxed text-zinc-300/90">
                  Conexión dirigida hacia servidores Horus, con capas de control y observabilidad para rendimiento y seguridad.
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* 6. Servidores privados */}
        <section id="privados" className="w-full px-4 py-12 sm:px-6 lg:px-8">
          <SectionTitle
            kicker="SERVIDORES PRIVADOS"
            title="¿Quieres tu propio servidor? Horus también lo levanta."
            subtitle="Además de la biblioteca HorusVPN, puedes alquilar servidores privados gaming con la misma capa de seguridad."
          />

          <div className="mt-10 grid gap-4 lg:grid-cols-2 lg:items-center">
            <Card className="relative overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-950/55 p-6 backdrop-blur">
              <div className="flex flex-wrap gap-2">
                <Badge className="rounded-full border-0 bg-cyan-500/15 px-2 py-1 text-[11px] text-cyan-200">
                  Servidores dedicados
                </Badge>
                <Badge className="rounded-full border-0 bg-emerald-500/15 px-2 py-1 text-[11px] text-emerald-200">
                  Anti‑cheat + IA
                </Badge>
              </div>

              <h3 className="mt-4 text-balance text-xl font-semibold tracking-tight text-zinc-50 sm:text-2xl">
                Infraestructura propia, pero sin que tengas que ser sysadmin.
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-zinc-300/90">
                Nos encargamos del servidor, la seguridad, las actualizaciones y la observabilidad. Tú eliges el juego, los
                modos y las reglas. Ideal para comunidades, streamers o equipos.
              </p>

              <ul className="mt-4 space-y-3 text-sm text-zinc-200/90">
                <li className="flex gap-2">
                  <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-cyan-400" />
                  Slots configurables según juego y comunidad.
                </li>
                <li className="flex gap-2">
                  <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Anti‑cheat + IA con señales específicas por juego.
                </li>
                <li className="flex gap-2">
                  <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-fuchsia-400" />
                  Integración nativa con la app HorusVPN para acceso protegido.
                </li>
              </ul>

              <div className="mt-5 grid gap-2 sm:grid-cols-[1.4fr,1fr]">
                <Button
                  className="w-full rounded-2xl border border-cyan-400/25 bg-cyan-500/15 text-cyan-100 hover:bg-cyan-500/22"
                  onClick={() => showSuccess("Te contactaremos para definir tu servidor privado Horus.")}
                >
                  Quiero un servidor privado
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="w-full rounded-2xl border-zinc-700 bg-zinc-950/40 text-zinc-50 hover:bg-zinc-50/5"
                  onClick={() => showSuccess("Te mandamos info de capacidades, juegos y límites técnicos.")}
                >
                  Ver capacidades
                </Button>
              </div>
            </Card>

            <Card className="relative overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-950/50 backdrop-blur">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1516031190212-da133013de50?auto=format&fit=crop&w=1600&q=80"
                  alt="Horus Servers — racks"
                  className="h-[420px] w-full object-cover"
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-0 bg-black/50" />
                <div className="pointer-events-none absolute inset-0 opacity-70 [background-image:radial-gradient(circle_at_30%_10%,rgba(255,255,255,.10),transparent_60%)]" />
              </div>
              <div className="p-6">
                <div className="text-sm font-semibold text-zinc-50">Horus Servers</div>
                <div className="mt-1 text-sm leading-relaxed text-zinc-300/90">
                  Rack, energía, conectividad, observabilidad y seguridad gestionadas — tú solo decides qué montar arriba.
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* 7. FAQ */}
        <section id="faq" className="w-full px-4 py-12 sm:px-6 lg:px-8">
          <SectionTitle
            kicker="FAQ"
            title="Preguntas típicas antes de subirte a Horus."
            subtitle="Los detalles técnicos y legales se terminan de cerrar cuando vayamos a producción, pero esta es la idea base."
          />

          <div className="mx-auto mt-8 max-w-2xl">
            <Accordion
              type="single"
              collapsible
              className="w-full rounded-2xl border border-zinc-800 bg-zinc-950/55 p-4"
            >
              <AccordionItem value="q1">
                  <AccordionTrigger>¿Es una VPN clásica o algo diferente?</AccordionTrigger>
                  <AccordionContent>
                    Es diferente: usas una app VPN, sí, pero la ruta va directa a la infraestructura de Horus, donde están los servidores
                    de juego. No es “VPN a Internet genérico”, sino “VPN a un entorno controlado para gaming”.
                  </AccordionContent>
                </AccordionItem>
              <AccordionItem value="q2">
                <AccordionTrigger>¿Qué pasa si juego a cosas fuera de Horus?</AccordionTrigger>
                <AccordionContent>
                  La idea es que, cuando quieras usar Horus, abras la app VPN y entres a nuestros servidores / entorno. Para juegos
                  o servicios fuera, simplemente juegas como siempre, sin pasar por HorusVPN.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q3">
                <AccordionTrigger>¿El anti‑cheat mira dentro de mi PC?</AccordionTrigger>
                <AccordionContent>
                  El concepto es minimizar la intrusión en tu máquina. La detección se basa en señales de red, integridad y
                  comportamiento a nivel de entorno Horus, no en un “espía” invasivo en tu PC.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q4">
                <AccordionTrigger>¿HorusPass viene siempre incluido?</AccordionTrigger>
                <AccordionContent>
                  Sí, la idea es que cualquier suscripción a HorusVPN incluya HorusPass sin coste extra, para que tus contraseñas
                  no acaben en notas, capturas o textos sin cifrar.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* 8. CTA final */}
        <section className="w-full px-4 pb-14 pt-4 sm:px-6 lg:px-8">
          <Card className="relative overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-950/60 p-6 backdrop-blur sm:p-8">
            <div className="pointer-events-none absolute -left-32 top-[-80px] h-72 w-72 rounded-full bg-cyan-500/15 blur-3xl" />
            <div className="pointer-events-none absolute -right-40 bottom-[-80px] h-80 w-80 rounded-full bg-fuchsia-500/15 blur-3xl" />

            <div className="relative grid gap-6 sm:grid-cols-[1.4fr,1fr] sm:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-black/40 px-3 py-1 text-xs text-zinc-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Etapa temprana — buscando jugadores y comunidades interesadas
                </div>

                <h2 className="mt-4 text-balance text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
                  ¿Te cuadra el concepto? Súmate a la lista de acceso.
                </h2>

                <p className="mt-3 text-sm leading-relaxed text-zinc-300/90">
                  No estamos vendiendo aún; estamos validando el modelo con jugadores y comunidades que quieran algo mejor que una VPN
                  genérica y servidores improvisados. Si te interesa, déjanos tu contacto.
                </p>

                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Button
                    className="rounded-2xl border border-cyan-400/25 bg-cyan-500/15 text-cyan-100 hover:bg-cyan-500/22"
                    onClick={() => showSuccess("Genial — te sumamos a la lista de acceso anticipado.")}
                  >
                    Quiero acceso anticipado
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-2xl border-zinc-700 bg-zinc-950/40 text-zinc-50 hover:bg-zinc-50/5"
                    onClick={() => showSuccess("Te escribimos para charlar y ver si encaja con lo que necesitas.")}
                  >
                    Hablar antes
                  </Button>
                </div>
              </div>

              <div className="space-y-3 rounded-2xl border border-zinc-800 bg-black/35 p-4 text-sm text-zinc-200">
                <div className="flex items-start gap-2">
                  <ShieldCheck className="mt-0.5 h-4 w-4 text-emerald-300" />
                  <p>
                    Foco en integridad, privacidad y experiencia competitiva. La idea es que HorusVPN sea “la forma seria” de
                    jugar donde está disponible.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <BrainCircuit className="mt-0.5 h-4 w-4 text-cyan-300" />
                  <p>
                    Toda esta UI es conceptual: cuando tengamos tu app real, replicamos y adaptamos estas piezas a tu producto.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default Index;