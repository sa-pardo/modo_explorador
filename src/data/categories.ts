import type { Categoria } from '../types/game';

export const CATEGORIES = [
  {
    id: 'zona-combate',
    icon: '⚔️',
    label: 'Zona de combate',
    questions: [
      {
        text: 'Estás muy molesto por algo que pasó...',
        options: [
          { text: 'Hago cosas sin pensar', effects: { ira: 2 } },
          { text: 'Me cuesta controlarme', effects: { ira: 1 } },
          { text: 'Puedo pensar antes de actuar', effects: { ira: 0 } },
        ]
      },
      {
        text: 'Estás jugando y pierdes varias veces...',
        options: [
          { text: 'Apago todo o me voy', effects: { ira: 2 } },
          { text: 'Sigo jugando, pero enojado', effects: { ira: 1 } },
          { text: 'Respiro o descanso un rato', effects: { ira: 0 } },
        ]
      },
      {
        text: 'Algo no sale como esperabas...',
        options: [
          { text: 'Exploto', effects: { ira: 2 } },
          { text: 'Me cuesta controlarme', effects: { ira: 1 } },
          { text: 'Respiro y después actúo', effects: { ira: 0 } },
        ]
      },
      {
        text: 'Discutes con alguien...',
        options: [
          { text: 'Digo cosas sin pensar', effects: { ira: 2 } },
          { text: 'Me cuesta controlarme', effects: { ira: 1 } },
          { text: 'Logro controlarme', effects: { ira: 0 } },
        ]
      }
    ]
  },
  {
    id: 'laboratorio-mental',
    icon: '🔬',
    label: 'Laboratorio mental',
    questions: [
      {
        text: 'Te pasa algo importante en el día…',
        options: [
          { text: 'No noto cómo me siento', effects: { confusion: 2 } },
          { text: 'Me doy cuenta después', effects: { confusion: 1 } },
          { text: 'Me doy cuenta al tiro', effects: { confusion: 0 } },
        ]
      },
      {
        text: 'Tienes un día difícil...',
        options: [
          { text: 'Todo se siente confuso', effects: { confusion: 2 } },
          { text: 'Entiendo algunas cosas', effects: { confusion: 1 } },
          { text: 'Sé lo que estoy sintiendo', effects: { confusion: 0 } },
        ]
      },
      {
        text: 'Te enojas por algo que pasó...',
        options: [
          { text: 'No entiendo por qué', effects: { confusion: 2 } },
          { text: 'Me cuesta, pero encuentro una razón', effects: { confusion: 1 } },
          { text: 'Entiendo por qué me enojé', effects: { confusion: 0 } },
        ]
      },
      {
        text: 'Te sientes incómodo o raro...',
        options: [
          { text: 'No entiendo qué me pasa', effects: { confusion: 2 } },
          { text: 'Tengo una idea', effects: { confusion: 1 } },
          { text: 'Sé lo que me pasa', effects: { confusion: 0 } },
        ]
      },
      {
        text: 'Algo te afecta mucho...',
        options: [
          { text: 'No logro explicarlo', effects: { confusion: 2 } },
          { text: 'Lo explico un poco', effects: { confusion: 1 } },
          { text: 'Puedo explicarlo bien', effects: { confusion : 0 } },
        ]
      },
      {
        text: 'Alguien te pregunta cómo estás...',
        options: [
          { text: 'No sé qué decir', effects: { confusion: 2 } },
          { text: 'Digo algo general', effects: { confusion: 1 } },
          { text: 'Puedo explicarlo', effects: { confusion: 0 } },
        ]
      }
    ]
  },
  {
    id: 'portal-decisiones',
    icon: '🚪',
    label: 'Portal de decisiones',
    questions: [
      {
        text: 'Te pasa algo que te hace sentir mal...',
        options: [
          { text: 'Prefiero no pensar en eso', effects: { miedo: 2 } },
          { text: 'Lo dejo pasar', effects: { miedo: 1 } },
          { text: 'Intento enfrentarlo', effects: { miedo: 0 } },
        ]
      },
      {
        text: 'Algo te incomoda mucho...',
        options: [
          { text: 'No quiero hablarlo', effects: { miedo: 2 } },
          { text: 'Me cuesta hablarlo', effects: { miedo: 1 } },
          { text: 'Puedo hablarlo', effects: { miedo: 0 } },
        ]
      },
      {
        text: 'Tienes un problema...',
        options: [
          { text: 'Intento alejarme', effects: { miedo: 2 } },
          { text: 'A veces hago algo', effects: { miedo: 1 } },
          { text: 'Pido ayuda o intento resolverlo', effects: { miedo: 0 } },
        ]
      },
    ]
  },
  {
    id: 'base-energia',
    icon: '⚡',
    label: 'Base de energía',
    questions: [
      {
        text: 'Un amigo no te responde un mensaje...',
        options: [
          { text: 'Me molesto altiro', effects: { desconexion: 2 } },
          { text: 'Pienso que puede estar ocupado', effects: { desconexion: 1 } },
          { text: 'No le doy mucha importancia', effects: { desconexion: 0 } },
        ]
      },
      {
        text: 'Te pasa algo malo en el día...',
        options: [
          { text: 'Todo el día se siente malo', effects: { desconexion: 2 } },
          { text: 'A veces mejora', effects: { desconexion: 1 } },
          { text: 'El día mejora', effects: { desconexion: 0 } },
        ]
      }
    ]
  },
] as const satisfies Categoria[];