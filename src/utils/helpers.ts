import type { Jugador, Efectos, CategoriaId, Progreso, Categoria } from '../types/game';
import { CATEGORIES, EVENTO } from '../data/categories';

export function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

export function getCategoryConfig(id: CategoriaId | null | undefined): Categoria | undefined {
  if (!id) return undefined;
  return CATEGORIES.find(c => c.id === id) || (id === 'evento' ? EVENTO : undefined);
}

export function eventosDesbloqueados(progreso: Progreso): boolean {
  return CATEGORIES.every(c => progreso[c.id]);
}

export function misionDesbloqueada(progreso: Progreso): boolean {
  return eventosDesbloqueados(progreso) && progreso.evento;
}

export function getStatMessage(player: Jugador): string {
  if (player.ira > 70)       return "🔥 Tu personaje está muy enojado";
  if (player.energia < 30)   return "⚡ Tu personaje está muy cansado";
  if (player.conexion < 20)  return "🤝 Tu personaje está muy solo";
  return "✨ Tu personaje está estable";
}

export function aplicarEfectos(player: Jugador, effects: Efectos): Jugador {
  const updated = { ...player };
  for (const [stat, delta] of Object.entries(effects)) {
    const key = stat as keyof Efectos;
    const current = updated[key] ?? 0;
    updated[key] = clamp(current + (delta ?? 0), 0, 100);
  }
  return updated;
}

export function getDefaultPlayer(): Jugador {
  return { nombre: "", avatar: "", vida: 80, energia: 60, ira: 20, conexion: 30 };
}

export function getDefaultProgreso(): Progreso {
  return { gamer: false, energia: false, social: false, evento: false };
}
