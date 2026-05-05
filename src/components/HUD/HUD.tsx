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
      <div className={styles.topRow}>
        <div>
          {player.avatar} {player.nombre}
        </div>
        <button className={styles.resetBtn} onClick={handleReset}>🗑 Reiniciar</button>
      </div>
      <DraggableBar stat="vida"     value={player.vida}     icon="❤️" label="Vida"     fillClass="vida"     onChange={handleStatChange} onDragEnd={() => {}} />
      <DraggableBar stat="energia"  value={player.energia}  icon="⚡" label="Energía"   fillClass="energia"  onChange={handleStatChange} onDragEnd={() => {}} />
      <DraggableBar stat="ira"      value={player.ira}      icon="🔥" label="Ira"      fillClass="ira"      onChange={handleStatChange} onDragEnd={() => {}} />
      <DraggableBar stat="conexion" value={player.conexion} icon="🤝" label="Conexión" fillClass="conexion" onChange={handleStatChange} onDragEnd={() => {}} />
    </div>
  );
}
