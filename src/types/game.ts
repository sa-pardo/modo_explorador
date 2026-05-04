export type StatName = 'vida' | 'energia' | 'ira' | 'conexion';

export interface Efectos {
  vida?: number;
  energia?: number;
  ira?: number;
  conexion?: number;
}

export interface Jugador {
  nombre: string;
  avatar: string;
  vida: number;
  energia: number;
  ira: number;
  conexion: number;
}

export interface Progreso {
  gamer: boolean;
  energia: boolean;
  social: boolean;
  evento: boolean;
}

export type CategoriaId = 'gamer' | 'energia' | 'social' | 'evento';

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
