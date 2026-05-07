import { useGame } from '../../context/GameContext';

export function InicioScreen() {
  const { state, dispatch } = useGame();
  const { player } = state;

  return (
    <div className="screen box">
      <h2>Bienvenido de vuelta</h2>
      <p style={{ fontSize: 18 }}>
        {player.avatar} {player.nombre} — Stats: ❤{player.ira} ⚡{player.confusion} 🔥{player.miedo} 🤝{player.desconexion}
      </p>
      <button onClick={() => dispatch({ type: 'GO_TO', screen: 'HUB' })}>
        ▶ Continuar
      </button>
      <button onClick={() => {
        dispatch({ type: 'NEW_GAME' });
        dispatch({ type: 'GO_TO', screen: 'CREACION' });
      }}>
        🆕 Empezar de nuevo
      </button>
    </div>
  );
}
