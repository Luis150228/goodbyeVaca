// src/features/abduccion/components/ScoreBoard.jsx
import PlayerTag from './PlayerTag';

export default function ScoreBoard({
	players,
	currentPlayerIndex,
	status,
	onGuessWholeWord,
	wrongGuesses = 0,
	maxErrors = 6,
}) {
	const canGuessWord = status === 'playing' && typeof onGuessWholeWord === 'function';
	const remaining = Math.max(0, maxErrors - wrongGuesses);

	return (
		<div className='flex w-full justify-between items-center gap-4'>
			<PlayerTag
				player={players[0]}
				isActive={0 === currentPlayerIndex}
				align='left'
				canGuessWord={canGuessWord && 0 === currentPlayerIndex}
				onGuessWholeWord={onGuessWholeWord}
			/>

			<div className='flex flex-col items-center'>
				<span className='text-xs text-slate-400 uppercase tracking-widest mb-1'>Intentos</span>
				<div className='text-2xl font-bold text-neon-pink drop-shadow-[0_0_10px_rgba(244,114,182,0.8)]'>
					{remaining}
				</div>
			</div>

			<PlayerTag
				player={players[1]}
				isActive={1 === currentPlayerIndex}
				align='right'
				canGuessWord={canGuessWord && 1 === currentPlayerIndex}
				onGuessWholeWord={onGuessWholeWord}
			/>
		</div>
	);
}
