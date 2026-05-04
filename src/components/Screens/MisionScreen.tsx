import { useGame } from '../../context/GameContext';

export function MisionScreen() {
  const { state, dispatch } = useGame();
  const { player } = state;

  let principal: string;
  let secundaria: string;

  if (player.ira > 60) {
    principal = "🔥 Notar cuándo te enojas";
    secundaria = "🌱 Tomarte un segundo antes de reaccionar";
  } else if (player.conexion < 30) {
    principal = "🤝 Hablar con alguien";
    secundaria = "🚶 Salir un rato de la pieza";
  } else if (player.energia < 40) {
    principal = "😴 Dormir mejor";
    secundaria = "📴 Dejar el celular antes de dormir";
  } else {
    principal = "🌟 Seguir haciendo lo que te está ayudando";
    secundaria = "🎯 Elegir algo pequeño para mejorar";
  }

  return (
    <div className="screen box">
      <h2>🎯 MISIÓN</h2>
      <p><b>Principal:</b> {principal}</p>
      <p><b>Otra opción:</b> {secundaria}</p>
      <button onClick={() => dispatch({ type: 'GO_TO', screen: 'HUB' })}>
        🌍 Seguir jugando
      </button>
    </div>
  );
}
