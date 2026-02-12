import { useMemo } from "react";
import { ShieldCheck, Zap, Server, Swords, BrainCircuit, GlobeLock, ChevronRight, Check, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { showSuccess } from "@/utils/toast";
import { MadeWithDyad } from "@/components/made-with-dyad";

type Neon = "pink" | "blue" | "green";

const neon = {
  pink: {
    text: "text-fuchsia-300",
    glow: "shadow-[0_0_0_1px_rgba(232,121,249,.35),0_0_28px_rgba(232,121,249,.22)]",
    ring: "ring-fuchsia-400/30",
    border: "border-fuchsia-400/25",
    bg: "bg-fuchsia-500/10",
  },
  blue: {
    text: "text-cyan-300",
    glow: "shadow-[0_0_0_1px_rgba(34,211,238,.35),0_0_28px_rgba(34,211,238,.22)]",
    ring: "ring-cyan-400/30",
    border: "border-cyan-400/25",
    bg: "bg-cyan-500/10",
  },
  green: {
    text: "text-emerald-300",
    glow: "shadow-[0_0_0_1px_rgba(16,185,129,.35),0_0_28px_rgba(16,185,129,.22)]",
    ring: "ring-emerald-400/30",
    border: "border-emerald-400/25",
    bg: "bg-emerald-500/10",
  },
} satisfies Record<Neon, Record<string, string>>;

function GlowChip({
  tone,
  icon,
  title,
  desc,
}: {
  tone: Neon;
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  const t = neon[tone];
  return (
    <Card
      className={[
        "group relative overflow-hidden rounded-2xl border bg-zinc-950/55 p-5 text-left backdrop-blur",
        "transition-all duration-300 hover:-translate-y-0.5",
        t.border,
        t.glow,
      ].join(" ")}
    >
      <div className="relative z-10 flex items-start gap-4">
        <div
          className={[
            "grid h-11 w-11 shrink-0 place-items-center rounded-xl border",
            "bg-zinc-950/40",
            t.border,
            "shadow-[0_0_22px_rgba(255,255,255,.06)]",
          ].join(" ")}
        >
          <div className={t.text}>{icon}</div>
        </div>
        <div className="min-w-0">
          <h3 className="text-base font-semibold tracking-tight text-zinc-50">{title}</h3>
          <p className="mt-1 text-sm leading-relaxed text-zinc-300/90">{desc}</p>
        </div>
      </div>

      <div
        className={[
          "pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100",
          tone === "pink" ? "bg-fuchsia-500/25" : "",
          tone === "blue" ? "bg-cyan-500/25" : "",
          tone === "green" ? "bg-emerald-500/25" : "",
        ].join(" ")}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,.06),transparent_55%)] opacity-70" />
    </Card>
  );
}

function SectionHeading({
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
      <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950/60 px-3 py-1 text-xs text-zinc-200">
        <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
        <span className="tracking-wide">{kicker}</span>
      </div>
      <h2 className="mt-4 text-balance text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
        {title}
      </h2>
      <p className="mt-3 text-pretty text-sm leading-relaxed text-zinc-300/90 sm:text-base">
        {subtitle}
      </p>
    </div>
  );
}

function PriceCard({
  tone,
  name,
  price,
  tagline,
  features,
  highlight = false,
}: {
  tone: Neon;
  name: string;
  price: string;
  tagline: string;
  features: string[];
  highlight?: boolean;
}) {
  const t = neon[tone];
  return (
    <Card
      className={[
        "relative overflow-hidden rounded-2xl border bg-zinc-950/55 p-6 backdrop-blur",
        "transition-all duration-300 hover:-translate-y-0.5",
        highlight ? "ring-2" : "ring-1",
        t.ring,
        t.border,
        t.glow,
      ].join(" ")}
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold tracking-tight text-zinc-50">{name}</h3>
            {highlight ? (
              <Badge className="rounded-full border-0 bg-cyan-500/15 px-2 py-0.5 text-[11px] text-cyan-200">
                Recomendado
              </Badge>
            ) : null}
          </div>
          <p className="mt-1 text-sm text-zinc-300/90">{tagline}</p>
        </div>
        <div className={["rounded-xl border px-3 py-2 text-right", t.border, t.bg].join(" ")}>
          <div className="text-xs text-zinc-200/80">desde</div>
          <div className={["text-lg font-semibold leading-none", t.text].join(" ")}>{price}</div>
          <div className="mt-1 text-[11px] text-zinc-200/70">/ mes</div>
        </div>
      </div>

      <Separator className="my-5 bg-zinc-800/70" />

      <ul className="space-y-3">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-zinc-200/90">
            <span className={["mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full border", t.border].join(" ")}>
              <Check className={["h-3.5 w-3.5", t.text].join(" ")} />
            </span>
            <span className="leading-relaxed">{f}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex gap-3">
        <Button
          className={[
            "w-full rounded-xl border bg-zinc-50/5 text-zinc-50 hover:bg-zinc-50/10",
            "transition-colors",
            t.border,
          ].join(" ")}
          onClick={() => showSuccess(`Solicitud enviada: plan ${name}`)}
        >
          Empezar
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div
        className={[
          "pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full blur-3xl opacity-60",
          tone === "pink" ? "bg-fuchsia-500/15" : "",
          tone === "blue" ? "bg-cyan-500/15" : "",
          tone === "green" ? "bg-emerald-500/15" : "",
        ].join(" ")}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(255,255,255,.07),transparent_55%)] opacity-70" />
    </Card>
  );
}

const Index = () => {
  const stats = useMemo(
    () => [
      { label: "Lag", value: "0*", tone: "blue" as const, note: "Infra propia optimizada" },
      { label: "Seguridad", value: "Blindada", tone: "pink" as const, note: "VPN directa a servidores" },
      { label: "Anti‑Cheat", value: "Activo", tone: "green" as const, note: "Capas + monitor IA" },
    ],
    [],
  );

  return (
    <div className="min-h-screen bg-black text-zinc-50">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-32 top-[-120px] h-[360px] w-[360px] rounded-full bg-fuchsia-500/15 blur-3xl" />
        <div className="absolute -right-28 top-[140px] h-[420px] w-[420px] rounded-full bg-cyan-500/15 blur-3xl" />
        <div className="absolute left-1/3 top-[520px] h-[420px] w-[420px] rounded-full bg-emerald-500/12 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(255,255,255,.08),transparent_55%)]" />
        <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(to_right,rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:48px_48px]" />
      </div>

      {/* Header */}
      <header className="relative z-10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
          <div className="flex items-center gap-3">
            {/* Logo placeholder (se reemplaza cuando subas el logo) */}
            <div className="grid h-10 w-10 place-items-center rounded-xl border border-zinc-800 bg-zinc-950/60">
              <span className="text-xs font-semibold tracking-tight text-zinc-100">HV</span>
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-tight text-zinc-50">HorusVPN</div>
              <div className="text-xs text-zinc-300/80">Gaming Ecosystem</div>
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-sm text-zinc-200/85 md:flex">
            <a className="hover:text-zinc-50" href="#ecosistema">
              Ecosistema
            </a>
            <a className="hover:text-zinc-50" href="#seguridad">
              Seguridad
            </a>
            <a className="hover:text-zinc-50" href="#planes">
              Planes
            </a>
            <a className="hover:text-zinc-50" href="#privados">
              Servidores privados
            </a>
            <a className="hover:text-zinc-50" href="#faq">
              FAQ
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              className="hidden rounded-xl text-zinc-200 hover:bg-zinc-50/5 hover:text-zinc-50 sm:inline-flex"
              onClick={() => showSuccess("Demo solicitada — te contactaremos.")}
            >
              Pedir demo
            </Button>
            <Button
              className="rounded-xl bg-cyan-500/15 text-cyan-100 hover:bg-cyan-500/22 border border-cyan-400/25"
              onClick={() => showSuccess("Acceso anticipado solicitado.")}
            >
              Acceso anticipado
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="relative z-10">
        <section className="mx-auto max-w-6xl px-4 pb-10 pt-8 sm:px-6 sm:pt-12">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950/60 px-3 py-1 text-xs text-zinc-200">
                <GlobeLock className="h-3.5 w-3.5 text-emerald-300" />
                <span>VPN directa + infraestructura propia gaming</span>
              </div>

              <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-zinc-50 sm:text-5xl">
                Conéctate. Entra. Juega.
                <span className="block text-zinc-200/90">
                  Sin espías, sin lag, con anti‑cheat e IA vigilando 24/7.
                </span>
              </h1>

              <p className="mt-4 max-w-xl text-pretty text-sm leading-relaxed text-zinc-300/90 sm:text-base">
                HorusVPN es el primer ecosistema que te conecta desde nuestra app VPN a una biblioteca de servidores de juegos
                con suscripción mensual. Además, puedes alquilar servidores privados gaming con la misma capa de seguridad.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button
                  className="rounded-2xl bg-fuchsia-500/15 text-fuchsia-100 hover:bg-fuchsia-500/22 border border-fuchsia-400/25"
                  onClick={() => showSuccess("¡Perfecto! Te avisamos cuando esté listo tu acceso.")}
                >
                  Quiero jugar con HorusVPN
                  <ChevronRight className="ml-2 h-4 w-4" />
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
                {stats.map((s) => {
                  const t = neon[s.tone];
                  return (
                    <div
                      key={s.label}
                      className={[
                        "rounded-2xl border bg-zinc-950/55 p-4 text-left backdrop-blur",
                        "ring-1",
                        t.ring,
                        t.border,
                      ].join(" ")}
                    >
                      <div className="text-xs text-zinc-300/80">{s.label}</div>
                      <div className={["mt-1 text-xl font-semibold tracking-tight", t.text].join(" ")}>
                        {s.value}
                      </div>
                      <div className="mt-1 text-[11px] leading-snug text-zinc-300/70">{s.note}</div>
                    </div>
                  );
                })}
              </div>

              <p className="mt-3 text-[11px] leading-relaxed text-zinc-400/80">
                * “Lag 0” se refiere a infraestructura propia optimizada y rutas dedicadas; la latencia real puede variar según
                ubicación y proveedor local.
              </p>
            </div>

            {/* Visual panel */}
            <div className="relative">
              <Card className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950/55 p-6 backdrop-blur">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="text-sm font-semibold text-zinc-50">Biblioteca de servidores</div>
                    <div className="text-xs text-zinc-300/80">Selecciona juego → conecta con VPN → listo</div>
                  </div>
                  <Badge className="rounded-full border-0 bg-emerald-500/15 px-2 py-0.5 text-[11px] text-emerald-200">
                    Online
                  </Badge>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {[
                    { game: "Arena FPS", region: "EU-West", ping: "7 ms", tone: "blue" as const },
                    { game: "Battle Royale", region: "NA-East", ping: "11 ms", tone: "pink" as const },
                    { game: "MMO Raid", region: "SA", ping: "9 ms", tone: "green" as const },
                    { game: "Ranked 5v5", region: "EU-Central", ping: "6 ms", tone: "blue" as const },
                  ].map((row) => {
                    const t = neon[row.tone];
                    return (
                      <div
                        key={`${row.game}-${row.region}`}
                        className={[
                          "rounded-2xl border bg-black/30 p-4",
                          "ring-1",
                          t.ring,
                          t.border,
                          "shadow-[0_0_18px_rgba(255,255,255,.05)]",
                        ].join(" ")}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <div className="truncate text-sm font-semibold text-zinc-50">{row.game}</div>
                            <div className="mt-1 text-xs text-zinc-300/80">{row.region}</div>
                          </div>
                          <div className="text-right">
                            <div className={["text-sm font-semibold", t.text].join(" ")}>{row.ping}</div>
                            <div className="mt-1 text-[11px] text-zinc-300/70">latencia</div>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          className={[
                            "mt-3 w-full rounded-xl border bg-zinc-50/5 text-zinc-50 hover:bg-zinc-50/10",
                            t.border,
                          ].join(" ")}
                          onClick={() => showSuccess(`Conectando a ${row.game} (${row.region})…`)}
                        >
                          Conectar
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    );
                  })}
                </div>

                <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-cyan-500/14 blur-3xl" />
                <div className="pointer-events-none absolute -left-20 bottom-[-120px] h-72 w-72 rounded-full bg-fuchsia-500/12 blur-3xl" />
              </Card>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {[
                  { tone: "green" as const, label: "Anti‑Cheat", value: "Instalado" },
                  { tone: "pink" as const, label: "Privacidad", value: "VPN directa" },
                  { tone: "blue" as const, label: "Rendimiento", value: "Rutas optimizadas" },
                ].map((k) => {
                  const t = neon[k.tone];
                  return (
                    <div
                      key={k.label}
                      className={[
                        "rounded-2xl border bg-zinc-950/45 p-4 backdrop-blur",
                        "ring-1",
                        t.ring,
                        t.border,
                      ].join(" ")}
                    >
                      <div className="text-xs text-zinc-300/80">{k.label}</div>
                      <div className={["mt-1 text-sm font-semibold", t.text].join(" ")}>{k.value}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Ecosystem / Value props */}
        <section id="ecosistema" className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <SectionHeading
            kicker="Ecosistema HorusVPN"
            title="Tu acceso a servidores gaming, como si fuera una biblioteca."
            subtitle="Suscripción mensual para entrar a nuestra lista de servidores de juego, con conexión blindada vía VPN y stack anti‑cheat + IA."
          />

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <GlowChip
              tone="pink"
              icon={<ShieldCheck className="h-5 w-5" />}
              title="VPN directa a nuestros servidores"
              desc="Entras por nuestra app VPN a la infraestructura Horus: tráfico encapsulado y ruta dedicada hacia el juego."
            />
            <GlowChip
              tone="blue"
              icon={<Zap className="h-5 w-5" />}
              title="Infraestructura propia = rendimiento"
              desc="Servidores propios optimizados para gaming: menos jitter, mejor estabilidad y experiencia competitiva."
            />
            <GlowChip
              tone="green"
              icon={<Swords className="h-5 w-5" />}
              title="Anti‑cheat + monitoreo"
              desc="Anti‑cheat instalado y una capa adicional de vigilancia continua para mantener partidas limpias."
            />
            <GlowChip
              tone="blue"
              icon={<Server className="h-5 w-5" />}
              title="Biblioteca de servidores por juego"
              desc="Elige título, región y modo. Conéctate en segundos y guarda tus favoritos."
            />
            <GlowChip
              tone="green"
              icon={<BrainCircuit className="h-5 w-5" />}
              title="IA vigilando 24/7"
              desc="Señales de anomalías y comportamiento sospechoso: revisión constante para proteger el ecosistema."
            />
            <GlowChip
              tone="pink"
              icon={<GlobeLock className="h-5 w-5" />}
              title="Privacidad “sin espías”"
              desc="Tu sesión viaja por un túnel seguro hacia servidores Horus, reduciendo exposición de red mientras juegas."
            />
          </div>
        </section>

        {/* Security section */}
        <section id="seguridad" className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionHeading
                kicker="Seguridad & confianza"
                title="Conexión blindada para jugar tranquilo."
                subtitle="Nuestra propuesta: conectarte por VPN directamente a nuestros servidores, con capas anti‑cheat y monitoreo continuo."
              />

              <div className="mt-8 space-y-3">
                {[
                  { tone: "pink" as const, title: "Túnel privado hacia Horus", desc: "Reduces exposición de tu red al conectarte a un punto controlado por nuestra infraestructura." },
                  { tone: "green" as const, title: "Anti‑cheat en la capa del servidor", desc: "Defensa activa para mantener integridad en partidas y servicios." },
                  { tone: "blue" as const, title: "Observabilidad + IA", desc: "Detección constante de patrones anómalos para actuar rápido." },
                ].map((row) => {
                  const t = neon[row.tone];
                  return (
                    <div
                      key={row.title}
                      className={[
                        "rounded-2xl border bg-zinc-950/55 p-5 backdrop-blur",
                        "ring-1",
                        t.ring,
                        t.border,
                      ].join(" ")}
                    >
                      <div className="flex items-start gap-3">
                        <div className={["mt-0.5 h-2.5 w-2.5 rounded-full", row.tone === "pink" ? "bg-fuchsia-400" : row.tone === "blue" ? "bg-cyan-400" : "bg-emerald-400"].join(" ")} />
                        <div className="min-w-0">
                          <div className="text-sm font-semibold text-zinc-50">{row.title}</div>
                          <div className="mt-1 text-sm leading-relaxed text-zinc-300/90">{row.desc}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <Card className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950/55 p-6 backdrop-blur">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-zinc-50">Ruta de conexión</div>
                  <div className="mt-1 text-xs text-zinc-300/80">App HorusVPN → Túnel → Servidores Horus → Juego</div>
                </div>
                <Badge className="rounded-full border-0 bg-fuchsia-500/15 px-2 py-0.5 text-[11px] text-fuchsia-200">
                  Blindado
                </Badge>
              </div>

              <div className="mt-6 space-y-4">
                {[
                  { left: "Tu PC", right: "App HorusVPN", tone: "blue" as const },
                  { left: "Túnel VPN", right: "Edge Horus", tone: "pink" as const },
                  { left: "Servidores gaming", right: "Anti‑cheat + IA", tone: "green" as const },
                ].map((step) => {
                  const t = neon[step.tone];
                  return (
                    <div key={step.left} className={["rounded-2xl border p-4 bg-black/25 ring-1", t.border, t.ring].join(" ")}>
                      <div className="flex items-center justify-between gap-3">
                        <div className="text-sm font-semibold text-zinc-50">{step.left}</div>
                        <ChevronRight className={["h-4 w-4", t.text].join(" ")} />
                        <div className={["text-sm font-semibold", t.text].join(" ")}>{step.right}</div>
                      </div>
                    </div>
                  );
                })}

                <div className="rounded-2xl border border-zinc-800 bg-zinc-950/40 p-4">
                  <div className="text-xs font-semibold text-zinc-200">Resultado</div>
                  <div className="mt-1 text-sm leading-relaxed text-zinc-300/90">
                    Una experiencia más estable y protegida: menos exposición, mejor control del entorno y una comunidad más limpia.
                  </div>
                </div>
              </div>

              <div className="pointer-events-none absolute -right-20 bottom-[-120px] h-72 w-72 rounded-full bg-emerald-500/12 blur-3xl" />
              <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-cyan-500/12 blur-3xl" />
            </Card>
          </div>
        </section>

        {/* Pricing */}
        <section id="planes" className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <SectionHeading
            kicker="Suscripción mensual"
            title="Elige tu nivel. Conéctate a la biblioteca de servidores."
            subtitle="Planes pensados para gamers competitivos, squads y creadores; sin complicaciones, con acceso rápido y seguridad integrada."
          />

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            <PriceCard
              tone="pink"
              name="Starter"
              price="€9"
              tagline="Para jugar seguro y estable."
              features={[
                "Acceso a biblioteca de servidores",
                "VPN directa a infraestructura Horus",
                "Rutas optimizadas por región",
                "Soporte estándar",
              ]}
            />
            <PriceCard
              tone="blue"
              name="Pro"
              price="€19"
              tagline="Para ranked, scrims y sesiones largas."
              highlight
              features={[
                "Todo en Starter",
                "Prioridad de rutas y disponibilidad",
                "Perfiles por juego y región",
                "Soporte prioritario",
              ]}
            />
            <PriceCard
              tone="green"
              name="Squad"
              price="€39"
              tagline="Para equipos y grupos."
              features={[
                "Todo en Pro",
                "Gestión multi‑usuario",
                "Accesos compartidos y favoritos",
                "Soporte avanzado",
              ]}
            />
          </div>

          <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-950/55 p-5 text-sm text-zinc-300/90 backdrop-blur">
            ¿Quieres precios exactos por región/juego? Dime tus planes reales y los adapto (y si hay “Free trial”, lo destacamos en el hero).
          </div>
        </section>

        {/* Private servers */}
        <section id="privados" className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionHeading
                kicker="Alquiler de servidores privados"
                title="Tu servidor, tus reglas, nuestra protección."
                subtitle="Levanta servidores privados gaming con la misma filosofía Horus: seguridad, estabilidad y control."
              />

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  { tone: "blue" as const, title: "Instancias optimizadas", desc: "Recursos pensados para tick-rate y estabilidad." },
                  { tone: "green" as const, title: "Anti‑cheat disponible", desc: "Mantén tus partidas limpias y justas." },
                  { tone: "pink" as const, title: "Acceso por VPN", desc: "Conexión privada hacia tu servidor (opcional)." },
                  { tone: "blue" as const, title: "Panel simple", desc: "Arranque, reinicio y gestión sin líos." },
                ].map((b) => (
                  <div
                    key={b.title}
                    className={[
                      "rounded-2xl border bg-zinc-950/55 p-5 backdrop-blur",
                      "ring-1",
                      neon[b.tone].ring,
                      neon[b.tone].border,
                    ].join(" ")}
                  >
                    <div className="text-sm font-semibold text-zinc-50">{b.title}</div>
                    <div className="mt-1 text-sm leading-relaxed text-zinc-300/90">{b.desc}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button
                  className="rounded-2xl bg-emerald-500/15 text-emerald-100 hover:bg-emerald-500/22 border border-emerald-400/25"
                  onClick={() => showSuccess("Solicitud enviada: alquiler de servidor privado.")}
                >
                  Pedir servidor privado
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="rounded-2xl border-zinc-700 bg-zinc-950/40 text-zinc-50 hover:bg-zinc-50/5"
                  onClick={() => showSuccess("Te enviaremos una propuesta según el juego y región.")}
                >
                  Quiero una propuesta
                </Button>
              </div>
            </div>

            <Card className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950/55 p-6 backdrop-blur">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-zinc-50">Servidor privado</div>
                  <div className="mt-1 text-xs text-zinc-300/80">Configuración típica (editable)</div>
                </div>
                <Badge className="rounded-full border-0 bg-cyan-500/15 px-2 py-0.5 text-[11px] text-cyan-200">
                  Rentable
                </Badge>
              </div>

              <div className="mt-6 space-y-3">
                {[
                  { k: "Región", v: "EU / NA / SA (según disponibilidad)", tone: "blue" as const },
                  { k: "Modo", v: "Privado, whitelist, invitados", tone: "pink" as const },
                  { k: "Protección", v: "Anti‑cheat + monitoreo IA", tone: "green" as const },
                  { k: "Acceso", v: "Directo o vía HorusVPN", tone: "blue" as const },
                ].map((r) => (
                  <div
                    key={r.k}
                    className={[
                      "flex items-start justify-between gap-4 rounded-2xl border bg-black/25 p-4 ring-1",
                      neon[r.tone].border,
                      neon[r.tone].ring,
                    ].join(" ")}
                  >
                    <div className="text-sm font-semibold text-zinc-50">{r.k}</div>
                    <div className={["text-sm text-right leading-relaxed", neon[r.tone].text].join(" ")}>{r.v}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-950/40 p-4">
                <div className="text-xs font-semibold text-zinc-200">Tip</div>
                <div className="mt-1 text-sm leading-relaxed text-zinc-300/90">
                  Si me dices los juegos objetivo (ej. Rust, FiveM, CS2, Minecraft, etc.), adapto esta sección con presets reales y CTAs.
                </div>
              </div>

              <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-fuchsia-500/12 blur-3xl" />
              <div className="pointer-events-none absolute -left-20 bottom-[-120px] h-72 w-72 rounded-full bg-cyan-500/12 blur-3xl" />
            </Card>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <SectionHeading
            kicker="Preguntas frecuentes"
            title="Lo esencial, sin humo."
            subtitle="Si quieres, adapto estas respuestas a tu wording exacto y a tus garantías/limitaciones reales."
          />

          <div className="mx-auto mt-10 max-w-3xl">
            <Accordion type="single" collapsible className="space-y-3">
              <AccordionItem value="item-1" className="rounded-2xl border border-zinc-800 bg-zinc-950/55 px-4 backdrop-blur">
                <AccordionTrigger className="text-left text-zinc-50 hover:no-underline">
                  ¿Qué hace diferente a HorusVPN?
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-zinc-300/90">
                  No es una VPN genérica: es un ecosistema donde conectas por nuestra app a una biblioteca de servidores gaming propios,
                  con seguridad integrada y enfoque en rendimiento.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="rounded-2xl border border-zinc-800 bg-zinc-950/55 px-4 backdrop-blur">
                <AccordionTrigger className="text-left text-zinc-50 hover:no-underline">
                  ¿“Lag 0” es real?
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-zinc-300/90">
                  Nuestro objetivo es minimizar latencia y jitter con infraestructura y rutas optimizadas. La latencia final depende
                  de tu ubicación y proveedor local, pero el salto hacia nuestros servidores está diseñado para ser lo más eficiente posible.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="rounded-2xl border border-zinc-800 bg-zinc-950/55 px-4 backdrop-blur">
                <AccordionTrigger className="text-left text-zinc-50 hover:no-underline">
                  ¿Cómo protege mi privacidad?
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-zinc-300/90">
                  Te conectas a un túnel seguro hacia infraestructura Horus, reduciendo exposición directa mientras juegas. Además,
                  añadimos capas de seguridad en el lado del servidor (anti‑cheat + monitoreo).
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="rounded-2xl border border-zinc-800 bg-zinc-950/55 px-4 backdrop-blur">
                <AccordionTrigger className="text-left text-zinc-50 hover:no-underline">
                  ¿También puedo alquilar un servidor privado?
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-zinc-300/90">
                  Sí: ofrecemos alquiler de servidores privados gaming. Puedes combinarlo con acceso por HorusVPN para un entorno más
                  controlado y protegido.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* Final CTA */}
        <section className="mx-auto max-w-6xl px-4 pb-14 sm:px-6">
          <Card className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950/55 p-7 backdrop-blur sm:p-10">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-black/25 px-3 py-1 text-xs text-zinc-200">
                  <Zap className="h-3.5 w-3.5 text-cyan-300" />
                  <span>Listo para subir de nivel tu conexión</span>
                </div>
                <h3 className="mt-4 text-balance text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
                  Entra al ecosistema HorusVPN.
                </h3>
                <p className="mt-3 text-pretty text-sm leading-relaxed text-zinc-300/90 sm:text-base">
                  Dime qué juegos y regiones son prioritarios para ti y adapto la landing con nombres reales, planes finales y una
                  sección de “biblioteca” más específica.
                </p>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Button
                    className="rounded-2xl bg-cyan-500/15 text-cyan-100 hover:bg-cyan-500/22 border border-cyan-400/25"
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
                <div className="rounded-2xl border border-fuchsia-400/25 bg-fuchsia-500/10 p-5">
                  <div className="text-xs font-semibold text-zinc-50">Incluye</div>
                  <div className="mt-2 text-sm leading-relaxed text-zinc-100/90">
                    VPN directa, biblioteca de servidores, rendimiento optimizado, anti‑cheat e IA vigilando.
                  </div>
                </div>
                <div className="rounded-2xl border border-emerald-400/25 bg-emerald-500/10 p-5">
                  <div className="text-xs font-semibold text-zinc-50">Ideal para</div>
                  <div className="mt-2 text-sm leading-relaxed text-zinc-100/90">
                    Ranked, scrims, squads y servidores privados sin dramas.
                  </div>
                </div>
                <div className="rounded-2xl border border-cyan-400/25 bg-cyan-500/10 p-5 sm:col-span-2">
                  <div className="text-xs font-semibold text-zinc-50">Siguiente paso</div>
                  <div className="mt-2 text-sm leading-relaxed text-zinc-100/90">
                    Súbeme tu logo y lo integro en header/hero; si tienes capturas del panel o de la app, las incorporo para elevar la confianza.
                  </div>
                </div>
              </div>
            </div>

            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-500/14 blur-3xl" />
            <div className="pointer-events-none absolute -left-28 bottom-[-140px] h-80 w-80 rounded-full bg-fuchsia-500/12 blur-3xl" />
          </Card>

          <div className="mt-8">
            <MadeWithDyad />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;