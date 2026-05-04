import { useGame } from '../../context/GameContext';
import { DraggableBar } from './DraggableBar';
import styles from './HUD.module.css';

export function HUD() {
  const { state, dispatch } = useGame();
  const { player } = state;

  const handleStatChange = (stat: string, value: number) => {
    dispatch({ type: 'UPDATE_STAT', stat, value });
  };

  const handleReset = () => {
    dispatch({ type: 'RESET' });
    window.location.reload();
  };

  // Ocultar HUD en INICIO y CREACION
  if (state.screen === 'INICIO' || state.screen === 'CREACION') return null;

  return (
    <div className={styles.hud}>
      <button className={styles.resetBtn} onClick={handleReset}>🗑 Reiniciar</button>
      <div>{player.avatar} {player.nombre}</div>
      <DraggableBar stat="vida"     value={player.vida}     icon="❤️" fillClass="vida"     onChange={handleStatChange} onDragEnd={() => {}} />
      <DraggableBar stat="energia"  value={player.energia}  icon="⚡" fillClass="energia"  onChange={handleStatChange} onDragEnd={() => {}} />
      <DraggableBar stat="ira"      value={player.ira}      icon="🔥" fillClass="ira"      onChange={handleStatChange} onDragEnd={() => {}} />
      <DraggableBar stat="conexion" value={player.conexion} icon="🤝" fillClass="conexion" onChange={handleStatChange} onDragEnd={() => {}} />
    </div>
  );
}
