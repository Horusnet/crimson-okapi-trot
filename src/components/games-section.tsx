"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import csImg from "@/assets/counter-strike.png";
import rustImg from "@/assets/rust.png";
import mcImg from "@/assets/minecraft.png";
import hytaleImg from "@/assets/hytale.png";
import gtaImg from "@/assets/gta.png";
import { showSuccess } from "@/utils/toast";

const GAMES = [
  {
    id: "minecraft",
    title: "Minecraft",
    img: mcImg,
    desc: "Servidores creativos, survival y soporte de mods. Perfiles optimizados por versión.",
  },
  {
    id: "rust",
    title: "Rust",
    img: rustImg,
    desc: "Instancias para PVP/PVE con presets de rendimiento y protección contra trampas.",
  },
  {
    id: "gta",
    title: "GTA",
    img: gtaImg,
    desc: "Servidores roleplay / libres con control de escalado y snapshots automáticos.",
  },
  {
    id: "hytale",
    title: "Hytale",
    img: hytaleImg,
    desc: "Soporte para servidores creativos y aventuras, presets para estabilidad en PvE.",
  },
  {
    id: "counter-strike",
    title: "Counter Strike",
    img: csImg,
    desc: "Matchmaking y servidores competitivos con baja latencia y anti‑cheat dedicado.",
  },
];

export default function GamesSection() {
  return (
    <section id="juegos" className="w-full px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <div className="text-xs font-semibold tracking-[0.18em] text-zinc-300/70">JUEGOS</div>
        <h2 className="mt-3 text-balance text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
          Juegos soportados
        </h2>
        <p className="mt-3 text-pretty text-sm leading-relaxed text-zinc-300/90 sm:text-base">
          Selecciona un juego para ver servidores, presets y configuraciones optimizadas para rendimiento y seguridad.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {GAMES.map((g) => (
          <Card
            key={g.id}
            className="flex h-full flex-col items-stretch justify-between overflow-hidden rounded-2xl border bg-zinc-950/55 p-0"
          >
            <div className="relative h-40 w-full overflow-hidden">
              <img src={g.img} alt={g.title} className="h-full w-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute left-3 top-3">
                <Badge className="rounded-full bg-cyan-500/10 text-cyan-200 border-0 px-2 py-0.5 text-xs">
                  {g.title}
                </Badge>
              </div>
            </div>

            <div className="p-4 flex flex-col gap-3">
              <div className="min-h-[56px]">
                <div className="text-sm font-semibold text-zinc-50">{g.title}</div>
                <div className="mt-1 text-xs text-zinc-300/80">{g.desc}</div>
              </div>

              <div className="mt-2 flex items-center gap-2">
                <Button
                  className="flex-1 rounded-lg border border-cyan-400/10 bg-cyan-500/10 text-cyan-100 hover:bg-cyan-500/15"
                  onClick={() => showSuccess(`Mostrando servidores optimizados para ${g.title}`)}
                >
                  Ver servidores
                </Button>
                <Button
                  variant="ghost"
                  className="rounded-lg text-zinc-200 hover:bg-zinc-50/5"
                  onClick={() => showSuccess(`Contactar para más info sobre ${g.title}`)}
                >
                  Contactar
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}