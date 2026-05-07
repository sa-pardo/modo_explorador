import type { Jugador, Efectos, CategoriaId, Progreso, Categoria, Opcion, StatName } from '../types/game';
import { CATEGORIES } from '../data/categories';

export function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

export function getCategoryConfig(id: CategoriaId | null | undefined): Categoria | undefined {
  if (!id) return undefined;
  return CATEGORIES.find(c => c.id === id);
}

export function eventosDesbloqueados(progreso: Progreso): boolean {
  return CATEGORIES.every(c => progreso[c.id]);
}

export function misionDesbloqueada(progreso: Progreso): boolean {
  return eventosDesbloqueados(progreso);
}

export function getStatMessage(stat: StatName): string {
  switch (stat) {
    case 'ira':
      return "🔥 Tu personaje está muy enojado";
    case 'confusion':
      return "⚡ Tu personaje está muy confundido";
    case 'miedo':
      return "🛡️ Tu personaje está muy asustado";
    case 'desconexion':
      return "🤝 Tu personaje está muy solo";
    default:
      return "✨ Tu personaje está estable";
  }
}

export function aplicarEfectos(player: Jugador, category: Categoria, answer: Opcion): Jugador {
  const updated = { ...player };
  const effects = answer.effects;
  for (const [stat, delta] of Object.entries(effects)) {
    const key = stat as keyof Efectos;
    const current = updated[key] ?? 0;
    const questions = category.questions.length;
    const FACTOR = (100 / questions) / 2;
    updated[key] = clamp(current + (delta ?? 0) * FACTOR, 0, 100);
  }
  return updated;
}

export function getDefaultPlayer(): Jugador {
  return { 
    nombre: "", 
    avatar: "", 
    ira: 0, 
    confusion: 0, 
    miedo: 0, 
    desconexion: 0 
  };
}

export function getDefaultProgreso(): Progreso {
  return { 
    'zona-combate': false,
    'laboratorio-mental': false, 
    'portal-decisiones': false, 
    'base-energia': false, 
  };
}