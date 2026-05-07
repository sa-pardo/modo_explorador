import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import type { GameState, Screen, CategoriaId, Jugador, Progreso, Opcion } from '../types/game';
import { getDefaultPlayer, getDefaultProgreso, getCategoryConfig, aplicarEfectos } from '../utils/helpers';

const SAVE_KEY = 'player';

// ── Actions ──
type GameAction =
  | { type: 'GO_TO'; screen: Screen; categoryId?: CategoriaId }
  | { type: 'SET_NOMBRE'; nombre: string }
  | { type: 'SET_AVATAR'; avatar: string }
  | { type: 'NEW_GAME' }
  | { type: 'ANSWER_QUESTION'; categoryId: CategoriaId; answer: Opcion }
  | { type: 'UPDATE_STAT'; stat: string; value: number }
  | { type: 'LOAD_SAVE'; player: Jugador; progreso: Progreso }
  | { type: 'RESET' };

const initialState: GameState = {
  screen: 'CREACION',
  player: getDefaultPlayer(),
  progreso: getDefaultProgreso(),
  currentCategoryId: null,
  currentQIndex: 0,
};

function getData() {
  try {
    const saved = localStorage.getItem(SAVE_KEY);
    if (saved) {
      const data = JSON.parse(saved);
      return { player: data.player, progreso: data.progreso };
    }
  } catch(error) {
    console.error('Error loading save data', error);    
  }
  return { player: getDefaultPlayer(), progreso: getDefaultProgreso() };
}

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'GO_TO':
      return {
        ...state,
        screen: action.screen,
        currentCategoryId: action.categoryId ?? state.currentCategoryId,
        currentQIndex: action.screen === 'CATEGORIA' ? 0 : state.currentQIndex,
      };
    case 'SET_NOMBRE':
      return { ...state, player: { ...state.player, nombre: action.nombre } };
    case 'SET_AVATAR':
      return { ...state, player: { ...state.player, avatar: action.avatar } };
    case 'NEW_GAME':
      return { ...initialState };
    case 'ANSWER_QUESTION': {
      const cat = getCategoryConfig(action.categoryId);
      if (!cat) return state;
      const question = cat.questions[state.currentQIndex];
      if (!question) return state;
      const option = action.answer;
      const newPlayer = aplicarEfectos(state.player, cat, option);
      const newIndex = state.currentQIndex + 1;

      if (newIndex >= cat.questions.length) {
        // Categoría completada
        return {
          ...state,
          player: newPlayer,
          progreso: { ...state.progreso, [action.categoryId]: true },
          currentQIndex: 0,
          screen: 'FEEDBACK',
        };
      }
      return {
        ...state,
        player: newPlayer,
        currentQIndex: newIndex,
      };
    }
    case 'UPDATE_STAT':
      return { ...state, player: { ...state.player, [action.stat]: action.value } };
    case 'LOAD_SAVE':
      return {
        ...initialState,
        screen: 'INICIO',
        player: action.player,
        progreso: action.progreso,
      };
    case 'RESET':
      const data = getData();
      const player = data.player;
      const newData = { ...initialState, screen: 'HUB' as const, player: {...initialState.player, avatar: player.avatar, nombre: player.nombre }};
      localStorage.setItem(SAVE_KEY, JSON.stringify({ player: newData.player, progreso: getDefaultProgreso() }));
      return newData;
    default:
      return state;
  }
}

// ── Context ──
interface GameContextValue {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
  goTo: (screen: Screen, categoryId?: CategoriaId) => void;
}

const GameContext = createContext<GameContextValue | null>(null);

function computeInitialState(): GameState {
  try {
    const saved = localStorage.getItem(SAVE_KEY);
    if (saved) {
      const data = JSON.parse(saved);
      return { ...initialState, screen: 'INICIO', player: data.player, progreso: data.progreso };
    }
  } catch { /* ignore */ }
  return initialState;
}

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, computeInitialState());

  // Persistir en cada cambio de estado
  useEffect(() => {
    localStorage.setItem(SAVE_KEY, JSON.stringify({ player: state.player, progreso: state.progreso }));
  }, [state.player, state.progreso]);

  const goTo = useCallback((screen: Screen, categoryId?: CategoriaId) => {
    dispatch({ type: 'GO_TO', screen, categoryId });
  }, []);

  return (
    <GameContext.Provider value={{ state, dispatch, goTo }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}
