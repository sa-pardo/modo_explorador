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
      <DraggableBar stat='ira' value={player.ira} icon='🔥' label='Ira' onChange={handleStatChange} onDragEnd={() => { }} />
      <DraggableBar stat='confusion' value={player.confusion} icon='🧠' label='Confusión' onChange={handleStatChange} onDragEnd={() => { }} />
      <DraggableBar stat='miedo' value={player.miedo} icon='‼️' label='Miedo' onChange={handleStatChange} onDragEnd={() => { }} />
      <DraggableBar stat='desconexion' value={player.desconexion} icon='⛓️‍💥' label='Desconexión' onChange={handleStatChange} onDragEnd={() => { }} />
    </div>
  );
}
