export type StatName = 'ira' | 'confusion' | 'miedo' | 'desconexion';

export interface Efectos {
  ira?: number;
  confusion?: number;
  miedo?: number;
  desconexion?: number;
}

export interface Jugador {
  nombre: string;
  avatar: string;
  ira: number;
  confusion: number;
  miedo: number;
  desconexion: number;
}

export type Progreso = Record<CategoriaId, boolean>;

export type CategoriaId = 'zona-combate' | 'laboratorio-mental' | 'portal-decisiones' | 'base-energia';

export interface Opcion {
  text: string;
  effects: Efectos;
}

export interface Pregunta {
  text: string;
  options: Opcion[];
}

export interface Categoria {
  id: CategoriaId;
  icon: string;
  label: string;
  questions: Pregunta[];
}

export type Screen = 'INICIO' | 'CREACION' | 'HUB' | 'CATEGORIA' | 'FEEDBACK' | 'MISION';

export interface GameState {
  screen: Screen;
  player: Jugador;
  progreso: Progreso;
  currentCategoryId: CategoriaId | null;
  currentQIndex: number;
}
