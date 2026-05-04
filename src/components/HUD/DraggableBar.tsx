import { useDraggableBar } from '../../hooks/useDraggableBar';
import type { StatName } from '../../types/game';
import styles from './DraggableBar.module.css';

interface Props {
  stat: StatName;
  value: number;
  onChange: (stat: StatName, value: number) => void;
  onDragEnd: () => void;
  icon: string;
  fillClass: string;
}

export function DraggableBar({ stat, value, icon, fillClass, onChange, onDragEnd }: Props) {
  const { barRef, fillRef, tooltipRef, handlers } = useDraggableBar({
    stat,
    onDrag: onChange,
    onDragEnd,
  });

  return (
    <div>
      {icon}
      <div
        ref={barRef}
        className={styles.bar}
        {...handlers}
        data-stat={stat}
      >
        <div ref={tooltipRef} className={styles.tooltip} />
        <div
          ref={fillRef}
          className={`${styles.fill} ${styles[fillClass]}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
