import { useGame } from '../../context/GameContext';
import { CATEGORIES, EVENTO } from '../../data/categories';
import { eventosDesbloqueados, misionDesbloqueada } from '../../utils/helpers';

export function HubScreen() {
  const { state, dispatch } = useGame();
  const { progreso } = state;
  const evUnlocked = eventosDesbloqueados(progreso);
  const misionOk = misionDesbloqueada(progreso);

  const handleCategoryClick = (id: string) => {
    dispatch({ type: 'GO_TO', screen: 'CATEGORIA', categoryId: id as typeof CATEGORIES[number]['id'] | 'evento' });
  };

  return (
    <div className="screen box">
      <h2>🌍 Elige a dónde ir</h2>
      <div>
        {CATEGORIES.map(cat => {
          const done = progreso[cat.id];
          return (
            <button key={cat.id} onClick={() => handleCategoryClick(cat.id)}>
              {cat.icon} {cat.label} {done ? '✅' : '🔓'}
            </button>
          );
        })}
      </div>
      <br />
      <div>
        <button disabled={!evUnlocked} onClick={() => handleCategoryClick('evento')}>
          {EVENTO.icon} {EVENTO.label} {progreso.evento ? '✅' : evUnlocked ? '🔓' : '🔒'}
        </button>
      </div>
      <br />
      <button disabled={!misionOk} onClick={() => dispatch({ type: 'GO_TO', screen: 'MISION' })}>
        🎯 Ver misión {misionOk ? '🔓' : '🔒'}
      </button>
    </div>
  );
}
