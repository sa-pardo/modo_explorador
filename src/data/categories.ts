import type { Categoria } from '../types/game';

export const CATEGORIES = [
  {
    id: 'gamer',
    icon: '🎮',
    label: 'Juego',
    questions: [
      {
        text: 'Perdiste una partida importante...',
        options: [
          { text: '😤 Salir enojado del juego', effects: { ira: 15, energia: -10 } },
          { text: '🤐 Quedarte callado',        effects: { ira: 5 } },
          { text: '🧠 Intentar de nuevo',      effects: { ira: -5, energia: 10 } },
        ]
      },
      {
        text: 'Un amigo te invita a jugar en equipo...',
        options: [
          { text: '🚫 Prefieres jugar solo',    effects: { conexion: -10 } },
          { text: '✅ Aceptar y jugar juntos', effects: { conexion: 15, ira: -5 } },
          { text: '😒 Aceptar de mala gana',   effects: { ira: 5 } },
        ]
      },
    ]
  },
  {
    id: 'energia',
    icon: '😴',
    label: 'Energía',
    questions: [
      {
        text: 'No dormiste bien...',
        options: [
          { text: '🎮 Seguir jugando igual', effects: { energia: -15 } },
          { text: '🛌 Descansar un rato',    effects: { energia: 20 } },
          { text: '📱 Seguir en pantalla',   effects: { energia: -10, ira: 5 } },
        ]
      },
      {
        text: 'Son las 11pm y tenés sueño...',
        options: [
          { text: '📱 Scrollear en el celu', effects: { energia: -10 } },
          { text: '🛌 Irte a dormir',        effects: { energia: 15 } },
          { text: '🎮 Una partida más',      effects: { energia: -5 } },
        ]
      },
    ]
  },
  {
    id: 'social',
    icon: '👥',
    label: 'Personas',
    questions: [
      {
        text: 'Un amigo te invita a salir',
        options: [
          { text: '🚪 No ir, quedarte en la pieza', effects: { conexion: -15 } },
          { text: '🤝 Ir',                          effects: { conexion: 20 } },
          { text: '😐 Decir "tal vez"',             effects: { conexion: 5 } },
        ]
      },
    ]
  },
] as const satisfies Categoria[];

export const EVENTO: Categoria = {
  id: 'evento',
  icon: '⚠',
  label: 'Situación difícil',
  questions: [
    {
      text: 'Hoy fue un día complicado...',
      options: [
        { text: '🔒 Aislarse',          effects: { conexion: -20 } },
        { text: '💬 Hablar con alguien', effects: { conexion: 20, ira: -5 } },
        { text: '💥 Enojarse mucho',    effects: { ira: 20 } },
      ]
    },
  ],
};
