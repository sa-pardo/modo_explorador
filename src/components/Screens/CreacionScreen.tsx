import { useState } from 'react';
import { useGame } from '../../context/GameContext';

const AVATARS = ['😎', '🤖', '🎮'] as const;

export function CreacionScreen() {
  const { state, dispatch } = useGame();
  const [nombre, setNombre] = useState(state.player.nombre);

  const handleAvatarClick = (avatar: string) => {
    dispatch({ type: 'SET_AVATAR', avatar });
  };

  const handleComenzar = () => {
    const trimmed = nombre.trim();
    if (!trimmed) return alert("Escribe un nombre 😊");
    dispatch({ type: 'SET_NOMBRE', nombre: trimmed });
    dispatch({ type: 'GO_TO', screen: 'HUB' });
  };

  return (
    <div className="screen box">
      <h2>Crear personaje</h2>
      <input
        id="input-nombre"
        placeholder="Tu nombre"
        value={nombre}
        onChange={e => setNombre(e.target.value)}
      />
      <br /><br />
      <p>Elige tu avatar:</p>
      {AVATARS.map(a => (
        <button
          key={a}
          className={state.player.avatar === a ? 'activo' : ''}
          onClick={() => handleAvatarClick(a)}
        >
          {a}
        </button>
      ))}
      {state.player.avatar && (
        <div>
          <p>Cuando estés listo:</p>
          <button onClick={handleComenzar}>Comenzar juego</button>
        </div>
      )}
    </div>
  );
}
