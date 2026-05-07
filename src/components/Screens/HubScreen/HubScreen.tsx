import { useGame } from '../../../context/GameContext';
import { CATEGORIES } from '../../../data/categories';
import { misionDesbloqueada } from '../../../utils/helpers';
import styles from './HubScreen.module.css';

export function HubScreen() {
  const { state, dispatch } = useGame();
  const { progreso } = state;
  const misionOk = misionDesbloqueada(progreso);

  const handleCategoryClick = (id: string) => {
    dispatch({ type: 'GO_TO', screen: 'CATEGORIA', categoryId: id as typeof CATEGORIES[number]['id'] });
  };

  return (
    <div className="screen box">
      <h2>🌍 Elige a dónde ir</h2>
      <div>
        {CATEGORIES.map(cat => {
          const done = progreso[cat.id];
          return (
            <button className={styles.category} key={cat.id} disabled={done} onClick={() => handleCategoryClick(cat.id)}>
              {cat.icon} {cat.label} {done ? '✅' : '🔓'}
            </button>
          );
        })}
      </div>
      <br />
      <button disabled={!misionOk} onClick={() => dispatch({ type: 'GO_TO', screen: 'MISION' })}>
        🎯 Ver misión {misionOk ? '🔓' : '🔒'}
      </button>
    </div>
  );
}
