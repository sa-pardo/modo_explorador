import { useGame } from '../../context/GameContext';

export function MisionScreen() {
  const { state, dispatch } = useGame();
  const { player } = state;

  let principal: string;
  let secundaria: string | null = null;

  if (player.confusion >= 75) {
    principal = 'Dos veces por día, voy a detectar qué siento en mi cuerpo';
  } else if (player.ira >= 75) {
    principal = 'Cuando sienta que una emoción me supere, voy a ser una tortuga';
    secundaria = 'Pensar cuándo me ha pasado antes';
  } else if (player.miedo >= 75) {
    principal = 'Nombrar emociones que conozco';
    secundaria = 'Pensar cuándo me ha pasado antes';
  } else if (player.desconexion >= 75) {
    principal = 'Pensar en al menos tres razones por las que podría estar pasando esto';
    secundaria = 'Decir lo que me molesta';
  } else {
    principal = 'Piensa, ¿Qué te gustaría reforzar?';
  }
  
  if (player.ira >= 75 && player.confusion >= 75 && player.miedo >= 75 && player.desconexion >= 75) {
    principal = 'Dos veces por día, voy a detectar qué siento en mi cuerpo';
    secundaria = null;
  }


  return (
    <div className='screen box'>
      <h2>🎯 MISIÓN</h2>
      <p><b>Principal:</b> {principal}</p>
      {secundaria && <p><b>Otra opción:</b> {secundaria}</p>}
      <button onClick={() => dispatch({ type: 'GO_TO', screen: 'HUB' })}>
        🌍 Volver
      </button>
    </div>
  );
}
