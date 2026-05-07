import { useGame } from '../../context/GameContext';
import { Opcion } from '../../types/game';
import { getCategoryConfig } from '../../utils/helpers';
import styles from './CategoriaScreen.module.css';

export function CategoriaScreen() {
  const { state, dispatch } = useGame();
  const cat = getCategoryConfig(state.currentCategoryId);
  if (!cat) return null;

  const totalQ = cat.questions.length;
  const q = cat.questions[state.currentQIndex];

  const progressDots = Array.from({ length: totalQ }, (_, i) =>
    i === state.currentQIndex ? '●' : i < state.currentQIndex ? '○' : '·'
  ).join('');

  const handleOptionClick = (option: Opcion) => {
    dispatch({
      type: 'ANSWER_QUESTION',
      categoryId: cat.id,
      answer: option
    });
  };

  return (
    <div className="screen box">
      <h2>{cat.icon} {cat.label}</h2>
      <p className={styles.progressText}>
        Pregunta {state.currentQIndex + 1} de {totalQ}  {progressDots}
      </p>
      <div className={styles.preguntaBox}>
        <p style={{ fontSize: 16 }}>{q.text}</p>
      </div>
      {q.options.map((opt, idx) => (
        <button key={idx} onClick={() => handleOptionClick(opt)}>
          {opt.text}
        </button>
      ))}
    </div>
  );
}
