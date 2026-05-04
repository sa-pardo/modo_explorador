import { useGame } from '../../context/GameContext';
import { getCategoryConfig, getStatMessage, misionDesbloqueada } from '../../utils/helpers';

export function FeedbackScreen() {
  const { state, dispatch } = useGame();
  const cat = getCategoryConfig(state.currentCategoryId);
  if (!cat) return null;

  const misionOk = misionDesbloqueada(state.progreso);

  return (
    <div className="screen box">
      <h2>✨ ¡Completaste: {cat.label}!</h2>
      <p>{getStatMessage(state.player)}</p>
      <button onClick={() => dispatch({ type: 'GO_TO', screen: 'HUB' })}>
        🌍 Volver
      </button>
      {misionOk && (
        <button onClick={() => dispatch({ type: 'GO_TO', screen: 'MISION' })}>
          🎯 Ver misión
        </button>
      )}
    </div>
  );
}
