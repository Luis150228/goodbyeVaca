// src/features/abduccion/components/ScoreBoard.jsx
import PlayerTag from './PlayerTag';

export default function ScoreBoard({ players, currentPlayerIndex, status, onGuessWholeWord }) {
	const canGuessWord = status === 'playing' && typeof onGuessWholeWord === 'function';

	return (
		<div className='flex w-full justify-between gap-4'>
			{players.map((p, index) => (
				<PlayerTag
					key={p.id}
					player={p}
					isActive={index === currentPlayerIndex}
					align={index === 0 ? 'left' : 'right'}
					canGuessWord={canGuessWord && index === currentPlayerIndex}
					onGuessWholeWord={onGuessWholeWord}
				/>
			))}
		</div>
	);
}
