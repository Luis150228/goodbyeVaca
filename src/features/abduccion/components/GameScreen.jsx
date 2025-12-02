// src/features/abduccion/components/GameScreen.jsx
import ScoreBoard from './ScoreBoard';
import UfoScene from './UfoScene';
import WordDisplay from './WordDisplay';
import Keyboard from './Keyboard';
import GameOverModal from './GameOverModal';
import { getLastCorrectPlayer } from '../utils/scoreUtils';

export default function GameScreen({ game, players, onRestart }) {
	const {
		secretWord,
		maskedWord,
		guesses,
		wrongGuesses,
		currentPlayerIndex,
		status,
		guessLetter,
		guessWholeWord,
		maxErrors,
	} = game;

	const isFinished = status !== 'playing';
	const winner = status === 'won' ? getLastCorrectPlayer(guesses, players) : null;

	const handleGuessWholeWord = () => {
		// solo durante la partida
		if (status !== 'playing') return;

		const attempt = window.prompt('¿Cuál crees que es la palabra completa?');
		if (!attempt) return;

		guessWholeWord(attempt);
	};

	return (
		<>
			<div className='relative min-h-[32rem] text-white flex flex-col rounded-2xl bg-slate-900/20 backdrop-blur-sm'>
				{/* Marcadores */}
				<header className='relative z-10 flex justify-between p-4'>
					<ScoreBoard
						players={players}
						currentPlayerIndex={currentPlayerIndex}
						status={status}
						onGuessWholeWord={handleGuessWholeWord}
					/>
				</header>

				{/* Escena OVNI + vaca + palabra */}
				<main className='relative z-10 flex-1 flex flex-col items-center justify-center gap-6'>
					<UfoScene
						wrongCount={wrongGuesses.length}
						maxErrors={maxErrors}
						status={status}
					/>

					<WordDisplay maskedWord={maskedWord} />
				</main>

				{/* Teclado */}
				<footer className='relative z-10 p-4'>
					<Keyboard
						guesses={guesses}
						onSelectLetter={guessLetter}
						disabled={isFinished}
						players={players}
					/>
				</footer>
			</div>

			<GameOverModal
				open={isFinished}
				status={status}
				secretWord={secretWord}
				winnerName={winner?.label}
				onRestart={onRestart}
			/>
		</>
	);
}
