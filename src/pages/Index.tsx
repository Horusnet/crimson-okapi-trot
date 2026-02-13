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
          "pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full blur-3xl opacity-60",
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
      {/* Ambient (sin gradients grandes) */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 top-[-140px] h-[520px] w-[520px] rounded-full bg-fuchsia-500/12 blur-3xl" />
        <div className="absolute -right-48 top-[40px] h-[560px] w-[560px] rounded-full bg-cyan-500/12 blur-3xl" />
        <div className="absolute left-1/3 top-[520px] h-[520px] w-[520px] rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(to_right,rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:56px_56px]" />
      </div>

      {/* Header */}
      <header className="relative z-10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
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
              <div className="text-xs text-zinc-300/80">Gaming Ecosystem</div>
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-sm text-zinc-200/85 md:flex">
            <a className="hover:text-zinc-50" href="#como-funciona">
              Cómo funciona
            </a>
            <a className="hover:text-zinc-50" href="#seguridad">
              Seguridad
            </a>
            <a className="hover:text-zinc-50" href="#planes">
              Suscripción
            </a>
            <a className="hover:text-zinc-50" href="#privados">
              Privados
            </a>
            <a className="hover:text-zinc-50" href="#faq">
              FAQ
            </a>
            <a className="hover:text-zinc-50" href="#juegos">
              Juegos
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
        {/* Hero con imagen */}
        <section className="mx-auto max-w-6xl px-4 pb-10 pt-6 sm:px-6 sm:pt-10">
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
                  HorusPass gratis (password vault)
                </Pill>
              </div>

              <h1 className="mt-5 text-balance text-3xl font-semibold tracking-tight text-zinc-50 sm:text-5xl">
                La primera biblioteca de servidores gaming
                <span className="block text-zinc-200/90">a la que entras por VPN, con seguridad blindada.</span>
              </h1>

              <p className="mt-4 max-w-xl text-pretty text-sm leading-relaxed text-zinc-300/90 sm:text-base">
                HorusVPN es un ecosistema único: te conectas con nuestra app VPN directamente a nuestros servidores de juegos por una
                suscripción mensual. Además, ofrecemos alquiler de servidores privados gaming con la misma protección.
                <span className="block mt-2 text-zinc-200/90">
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
                        Addon gratis: <span className="font-semibold text-cyan-200">HorusPass</span>
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

        {/* Cómo funciona */}
        <section id="como-funciona" className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
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
            <ImageCard
              t="pink"
              src={horusPassImg}
              alt="HorusPass"
              caption="HorusPass — gestor de contraseñas incluido"
            />
          </div>
        </section>

        {/* Seguridad */}
        <section id="seguridad" className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
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

              <div className="mt-5 grid gap-2 sm:grid-cols-2">
                <Button
                  className="w-full rounded-2xl border border-emerald-400/25 bg-emerald-500/15 text-emerald-100 hover:bg-emerald-500/22"
                  onClick={() => showSuccess("Perfecto — te enviamos detalles técnicos y disponibilidad.")}
                >
                  Quiero detalles técnicos
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  className="w-full rounded-2xl border border-cyan-400/25 bg-cyan-500/15 text-cyan-100 hover:bg-cyan-500/22"
                  onClick={() => showSuccess("HorusPass: acceso incluido gratis con tu suscripción.")}
                >
                  Ver HorusPass
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>

            <Card className="relative overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-950/50 backdrop-blur">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1526378722445-4c6b1b7b5f3b?auto=format&fit=crop&w=1600&q=80"
                  alt="Infraestructura / seguridad"
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

        {/* Suscripción */}
        <section id="planes" className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <SectionTitle
            kicker="SUSCRIPCIÓN"
            title="Suscripción mensual para entrar a la biblioteca."
            subtitle="Pensado para jugadores competitivos, squads y creadores: rápido de usar, y hecho para gaming."
          />

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            <PlanCard
              t="pink"
              name="Starter"
              price="€9"
              note="Para jugar seguro y estable."
              bullets={[
                "Acceso a biblioteca de servidores",
                "VPN directa a infraestructura Horus",
                "Rutas optimizadas por región",
                "HorusPass gratis (guardar contraseñas)",
                "Soporte estándar",
              ]}
            />
            <PlanCard
              t="blue"
              name="Pro"
              price="€19"
              note="Para ranked, scrims y sesiones largas."
              popular
              bullets={[
                "Todo en Starter",
                "Prioridad de rutas y disponibilidad",
                "Perfiles por juego y región",
                "HorusPass gratis (guardar contraseñas)",
                "Soporte prioritario",
              ]}
            />
            <PlanCard
              t="green"
              name="Squad"
              price="€39"
              note="Para equipos y grupos."
              bullets={[
                "Todo en Pro",
                "Gestión multi‑usuario",
                "Accesos compartidos y favoritos",
                "HorusPass gratis (guardar contraseñas)",
                "Soporte avanzado",
              ]}
            />
          </div>

          {/* HorusPass: Transparencia */}
          <div className="mt-8">
            <Card className="relative overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-950/55 p-6 backdrop-blur sm:p-7">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/15 bg-cyan-500/10 px-3 py-1 text-xs text-zinc-200">
                    <KeyRound className="h-3.5 w-3.5 text-cyan-300" />
                    <span>HorusPass</span>
                  </div>
                  <h3 className="mt-4 text-balance text-xl font-semibold tracking-tight text-zinc-50 sm:text-2xl">
                    Origen, compatibilidad y cómo lo mantenemos
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-300/90">
                    HorusPass nace sobre una base de servidor de bóveda de contraseñas ya consolidada dentro del ecosistema compatible con
                    Bitwarden. Eso nos permite enfocarnos en operar, asegurar y adaptar la experiencia a Horus (branding, despliegue,
                    defaults y hardening), manteniendo un comportamiento familiar para usuarios y clientes.
                  </p>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {["Compatibilidad con clientes Bitwarden (según configuración)", "Operación y hardening a nivel Horus", "Enfoque en estabilidad y mantenimiento", "Transparencia en licencias y atribuciones"].map(
                      (x) => (
                        <div
                          key={x}
                          className="flex items-start gap-2 rounded-3xl border border-zinc-800 bg-black/25 p-4 text-sm text-zinc-200/90"
                        >
                          <span className="mt-0.5 grid h-5 w-5 place-items-center rounded-full border border-cyan-400/25 bg-cyan-500/10">
                            <Check className="h-3.5 w-3.5 text-cyan-200" />
                          </span>
                          <span className="leading-relaxed">{x}</span>
                        </div>
                      ),
                    )}
                  </div>

                  <p className="mt-4 text-[11px] leading-relaxed text-zinc-400/85">
                    Nota: HorusPass es un servicio complementario. La compatibilidad exacta puede variar según políticas de despliegue,
                    configuración y versión.
                  </p>
                </div>

                <div className="w-full lg:max-w-sm">
                  <div className="rounded-[1.75rem] border border-fuchsia-400/15 bg-fuchsia-500/10 p-5">
                    <div className="text-sm font-semibold text-zinc-50">Qué significa para ti</div>
                    <ul className="mt-3 space-y-2 text-sm text-zinc-200/90">
                      <li className="flex items-start gap-2">
                        <span className="mt-1 h-2 w-2 rounded-full bg-fuchsia-400" />
                        <span>Onboarding rápido y UX conocida.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 h-2 w-2 rounded-full bg-cyan-400" />
                        <span>Mejoras centradas en operación y seguridad.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
                        <span>Roadmap enfocado en necesidades Horus.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-3 rounded-[1.75rem] border border-emerald-400/15 bg-emerald-500/10 p-5">
                    <div className="text-xs font-semibold tracking-[0.14em] text-emerald-200/90">SUGERENCIA</div>
                    <div className="mt-2 text-sm text-zinc-200/90">
                      Si quieres, enlazo aquí una página “Acerca de HorusPass” con detalles técnicos, licencias y política de soporte.
                    </div>
                  </div>
                </div>
              </div>

              <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
              <div className="pointer-events-none absolute -left-28 bottom-[-140px] h-80 w-80 rounded-full bg-fuchsia-500/10 blur-3xl" />
            </Card>
          </div>
        </section>

        {/* Servidores privados */}
        <section id="privados" className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <SectionTitle
            kicker="SERVIDORES PRIVADOS"
            title="Alquila servidores privados gaming con capa Horus."
            subtitle="Tu comunidad, tu configuración y tu rendimiento, con opciones de VPN directa y protección anti‑cheat."
          />

          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            <Card className="relative overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-950/55 p-6 backdrop-blur">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-lg font-semibold tracking-tight text-zinc-50">Private Hosting</div>
                  <div className="mt-1 text-sm text-zinc-300/90">
                    Presets por juego, región y capacidad — pensado para squads y comunidades.
                  </div>
                </div>
                <Badge className="rounded-full border-0 bg-cyan-500/15 px-2 py-0.5 text-[11px] text-cyan-200">
                  Flexible
                </Badge>
              </div>

              <Separator className="my-5 bg-zinc-800/70" />

              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { t: "blue" as const, k: "Regiones", v: "EU / NA / SA" },
                  { t: "pink" as const, k: "Acceso", v: "Directo o vía VPN" },
                  { t: "green" as const, k: "Protección", v: "Anti‑cheat + IA" },
                  { t: "blue" as const, k: "Rendimiento", v: "Optimizado gaming" },
                ].map((x) => (
                  <div
                    key={x.k}
                    className={[
                      "rounded-3xl border bg-black/25 p-5",
                      "ring-1",
                      tone[x.t].ring,
                      tone[x.t].border,
                    ].join(" ")}
                  >
                    <div className="text-xs text-zinc-300/80">{x.k}</div>
                    <div className={["mt-1 text-sm font-semibold", tone[x.t].text].join(" ")}>{x.v}</div>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <Button
                  className="rounded-2xl border border-emerald-400/25 bg-emerald-500/15 text-emerald-100 hover:bg-emerald-500/22"
                  onClick={() => showSuccess("Solicitud enviada: servidor privado.")}
                >
                  Pedir servidor privado
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="rounded-2xl border-zinc-700 bg-zinc-950/40 text-zinc-50 hover:bg-zinc-50/5"
                  onClick={() => showSuccess("OK — dinos juego, región y nº de jugadores.")}
                >
                  Quiero una propuesta
                </Button>
              </div>
            </Card>

            <ImageCard
              t="pink"
              src="https://images.unsplash.com/photo-1598550483259-3b1d4f21945d?auto=format&fit=crop&w=1600&q=80"
              alt="Servidor / rack / hosting"
              caption="Hosting gaming (referencia visual)"
            />
          </div>
        </section>

        {/* NUEVA SECCIÓN: Juegos soportados */}
        <GamesSection />

        {/* FAQ */}
        <section id="faq" className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <SectionTitle
            kicker="FAQ"
            title="Preguntas frecuentes"
            subtitle="Si me pasas tus claims exactos (y límites), lo dejamos 100% legal y preciso."
          />

          <div className="mx-auto mt-10 max-w-3xl">
            <Accordion type="single" collapsible className="space-y-3">
              <AccordionItem value="i1" className="rounded-3xl border border-zinc-800 bg-zinc-950/55 px-4 backdrop-blur">
                <AccordionTrigger className="text-left text-zinc-50 hover:no-underline">
                  ¿Qué hace diferente a HorusVPN?
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-zinc-300/90">
                  No es una VPN genérica: es un ecosistema de acceso por suscripción a una biblioteca de servidores gaming propios,
                  con conexión por VPN directa hacia infraestructura Horus y capas anti‑cheat + IA.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="i2" className="rounded-3xl border border-zinc-800 bg-zinc-950/55 px-4 backdrop-blur">
                <AccordionTrigger className="text-left text-zinc-50 hover:no-underline">
                  ¿Esto reduce el lag?
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-zinc-300/90">
                  Al tener infraestructura propia y rutas optimizadas, buscamos minimizar jitter y mejorar consistencia. El resultado final depende
                  de tu ubicación y tu ISP, pero el tramo hacia Horus está diseñado para ser eficiente.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="i3" className="rounded-3xl border border-zinc-800 bg-zinc-950/55 px-4 backdrop-blur">
                <AccordionTrigger className="text-left text-zinc-50 hover:no-underline">
                  ¿Qué es HorusPass?
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-zinc-300/90">
                  HorusPass es un addon gratuito incluido con tu suscripción: una app para guardar contraseñas y mantener tus cuentas
                  más seguras sin fricción.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="i4" className="rounded-3xl border border-zinc-800 bg-zinc-950/55 px-4 backdrop-blur">
                <AccordionTrigger className="text-left text-zinc-50 hover:no-underline">
                  ¿También hay servidores privados?
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-zinc-300/90">
                  Sí. Puedes alquilar servidores privados gaming y combinarlo con acceso por HorusVPN para un entorno más controlado y protegido.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* CTA final */}
        <section className="mx-auto max-w-6xl px-4 pb-14 sm:px-6">
          <Card className="relative overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-950/55 p-7 backdrop-blur sm:p-10">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-black/25 px-3 py-1 text-xs text-zinc-200">
                  <Zap className="h-3.5 w-3.5 text-cyan-300" />
                  <span>Preparado para entrar al ecosistema</span>
                </div>
                <h3 className="mt-4 text-balance text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
                  Entra a HorusVPN y juega con ventaja.
                </h3>
                <p className="mt-3 text-pretty text-sm leading-relaxed text-zinc-300/90 sm:text-base">
                  Si tienes capturas de la app o del panel, las ponemos en la sección “Cómo funciona” para elevar confianza.
                </p>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Button
                    className="rounded-2xl border border-cyan-400/25 bg-cyan-500/15 text-cyan-100 hover:bg-cyan-500/22"
                    onClick={() => showSuccess("Acceso solicitado. Te contactaremos con los próximos pasos.")}
                  >
                    Solicitar acceso
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-2xl border-zinc-700 bg-zinc-950/40 text-zinc-50 hover:bg-zinc-50/5"
                    onClick={() => showSuccess("Solicitud enviada: quiero hablar con ventas.")}
                  >
                    Hablar con ventas
                  </Button>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { t: "pink" as const, title: "Privacidad", desc: "VPN directa: sin espías mientras juegas." },
                  { t: "blue" as const, title: "Rendimiento", desc: "Infra propia y rutas optimizadas." },
                  { t: "green" as const, title: "Integridad", desc: "Anti‑cheat + IA vigilando 24/7." },
                  { t: "blue" as const, title: "HorusPass", desc: "Addon gratis para guardar contraseñas." },
                ].map((c) => (
                  <div
                    key={c.title}
                    className={[
                      "rounded-3xl border bg-black/25 p-5",
                      "ring-1",
                      tone[c.t].ring,
                      tone[c.t].border,
                    ].join(" ")}
                  >
                    <div className="text-xs text-zinc-300/80">{c.title}</div>
                    <div className={["mt-1 text-sm font-semibold", tone[c.t].text].join(" ")}>{c.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-500/12 blur-3xl" />
            <div className="pointer-events-none absolute -left-28 bottom-[-140px] h-80 w-80 rounded-full bg-fuchsia-500/10 blur-3xl" />
          </Card>

          <div className="mt-10 border-t border-zinc-900/80 pt-6 text-center text-xs text-zinc-400/80">
            © {new Date().getFullYear()} HorusVPN — Gaming Ecosystem
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;