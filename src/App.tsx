import { GameProvider, useGame } from './context/GameContext';
import { HUD } from './components/HUD/HUD';
import { InicioScreen } from './components/Screens/InicioScreen';
import { CreacionScreen } from './components/Screens/CreacionScreen';
import { HubScreen } from './components/Screens/HubScreen';
import { CategoriaScreen } from './components/Screens/CategoriaScreen';
import { FeedbackScreen } from './components/Screens/FeedbackScreen';
import { MisionScreen } from './components/Screens/MisionScreen';
import './index.css';

function ScreenRouter() {
  const { state } = useGame();

  switch (state.screen) {
    case 'INICIO':    return <InicioScreen />;
    case 'CREACION':  return <CreacionScreen />;
    case 'HUB':       return <HubScreen />;
    case 'CATEGORIA': return <CategoriaScreen />;
    case 'FEEDBACK':  return <FeedbackScreen />;
    case 'MISION':    return <MisionScreen />;
    default:          return <InicioScreen />;
  }
}

export default function App() {
  return (
    <GameProvider>
      <h1>🎮 MODO EXPLORADOR LUC</h1>
      <div className="box">
        <HUD />
        <ScreenRouter />
      </div>
    </GameProvider>
  );
}
