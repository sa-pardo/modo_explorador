import { useCallback, useRef, useEffect } from 'react';
import type { StatName } from '../types/game';

interface UseDraggableBarOptions {
  stat: StatName;
  onDrag: (stat: StatName, value: number) => void;
  onDragEnd: () => void;
}

export function useDraggableBar({ stat, onDrag, onDragEnd }: UseDraggableBarOptions) {
  const barRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const bar = barRef.current;
    if (!bar) return;
    const rect = bar.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.round(Math.max(0, Math.min(100, (x / rect.width) * 100)));
    onDrag(stat, pct);

    if (fillRef.current) fillRef.current.style.transition = 'width 0.1s ease';
    if (tooltipRef.current) {
      tooltipRef.current.textContent = stat.charAt(0).toUpperCase() + stat.slice(1) + ': ' + pct + '%';
      tooltipRef.current.style.display = 'block';
      tooltipRef.current.style.left = Math.max(10, Math.min(90, (x / rect.width) * 100)) + '%';
    }
  }, [stat, onDrag]);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    dragging.current = true;
    updateFromClientX(e.clientX);
  }, [updateFromClientX]);

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!dragging.current) return;
    updateFromClientX(e.clientX);
  }, [updateFromClientX]);

  const onMouseUp = useCallback(() => {
    if (dragging.current) {
      dragging.current = false;
      if (fillRef.current) fillRef.current.style.transition = '';
      if (tooltipRef.current) tooltipRef.current.style.display = 'none';
      onDragEnd();
    }
  }, [onDragEnd]);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    dragging.current = true;
    updateFromClientX(e.touches[0].clientX);
  }, [updateFromClientX]);

  const onTouchMove = useCallback((e: TouchEvent) => {
    if (!dragging.current) return;
    e.preventDefault();
    updateFromClientX(e.touches[0].clientX);
  }, [updateFromClientX]);

  const onTouchEnd = useCallback(() => {
    if (dragging.current) {
      dragging.current = false;
      if (fillRef.current) fillRef.current.style.transition = '';
      if (tooltipRef.current) tooltipRef.current.style.display = 'none';
      onDragEnd();
    }
  }, [onDragEnd]);

  useEffect(() => {
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('touchmove', onTouchMove, { passive: false });
    document.addEventListener('touchend', onTouchEnd);
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onTouchEnd);
    };
  }, [onMouseMove, onMouseUp, onTouchMove, onTouchEnd]);

  return {
    barRef,
    fillRef,
    tooltipRef,
    handlers: {
      onMouseDown,
      onTouchStart,
    },
  };
}
