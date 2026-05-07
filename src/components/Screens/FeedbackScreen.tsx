import { useGame } from '../../context/GameContext';
import { getCategoryConfig, getStatMessage, misionDesbloqueada } from '../../utils/helpers';

export function FeedbackScreen() {
  const { state, dispatch } = useGame();
  const player = state.player;
  const cat = getCategoryConfig(state.currentCategoryId);
  if (!cat) return null;

  const misionOk = misionDesbloqueada(state.progreso);

  return (
    <div className="screen box">
      <h2>✨ ¡Completaste: {cat.label}!</h2>
      <div>
        <p>{player.ira >= 75 && getStatMessage('ira')}</p>
        <p>{player.confusion >= 75 && getStatMessage('confusion')}</p>
        <p>{player.miedo >= 75 && getStatMessage('miedo')}</p>
        <p>{player.desconexion >= 75 && getStatMessage('desconexion')}</p>
      </div>
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
