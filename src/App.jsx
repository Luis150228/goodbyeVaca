// src/App.jsx
import { useState } from 'react';
import Layout from './shared/components/Layout';
import GameScreen from './features/abduccion/components/GameScreen';
import GameSetup from './features/abduccion/components/GameSetup';
import { useGameLogic } from './features/abduccion/hooks/useGameLogic';
import { usePlayers } from './features/abduccion/hooks/usePlayers';
import { DIFFICULTY_CONFIG, DEFAULT_DIFFICULTY, DEFAULT_TOPIC } from './features/abduccion/constants';
import { getLastCorrectPlayer } from './features/abduccion/utils/scoreUtils';

const PLAYERS = [
	{
		id: 'p1',
		label: 'JUGADOR 1',
		name: 'Astronauta',
		type: 'human',
		color: '#38bdf8',
		wins: 0,
	},
	{
		id: 'p2',
		label: 'JUGADOR 2',
		name: 'Alien',
		type: 'alien',
		color: '#fb923c',
		wins: 0,
	},
];

const initialConfig = {
	topic: DEFAULT_TOPIC,
	difficulty: DEFAULT_DIFFICULTY,
	maxErrors: DIFFICULTY_CONFIG[DEFAULT_DIFFICULTY].maxErrors,
};

function App() {
	const [screen, setScreen] = useState('setup'); // 'setup' | 'game'
	const [config, setConfig] = useState(initialConfig);

	// 🔹 Players con victorias persistentes (localStorage) a partir de PLAYERS
	const { players, addWin, updatePlayerName } = usePlayers(PLAYERS);

	// 🔹 Lógica del juego usando los players actuales (incluye wins)
	const game = useGameLogic(players, config);

	function handleChangeConfig(partial) {
		setConfig((prev) => {
			const merged = { ...prev, ...partial };
			const diffCfg = DIFFICULTY_CONFIG[merged.difficulty] || DIFFICULTY_CONFIG[DEFAULT_DIFFICULTY];

			return {
				...merged,
				maxErrors: diffCfg.maxErrors,
			};
		});
	}

	function handleStartGame() {
		// Al iniciar, reseteamos la partida con la config actual
		game.resetGame(config);
		setScreen('game');
	}

	function handleRestartGame() {
		// Si la partida terminó en victoria, sumamos win al ganador ANTES de resetear
		if (game.status === 'won') {
			const winner = getLastCorrectPlayer(game.guesses, players);
			if (winner) {
				addWin(winner.id);
			}
		}

		game.resetGame(config);
		setScreen('game');
	}

	return (
		<Layout>
			{screen === 'setup' && (
				<GameSetup
					config={config}
					onChangeConfig={handleChangeConfig}
					onStart={handleStartGame}
					players={players}
					onUpdatePlayerName={updatePlayerName}
				/>
			)}

			{screen === 'game' && (
				<GameScreen
					game={game}
					players={players}
					onRestart={handleRestartGame}
				/>
			)}
		</Layout>
	);
}

export default App;
