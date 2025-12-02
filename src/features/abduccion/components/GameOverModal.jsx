// src/features/abduccion/components/GameOverModal.jsx
import Card from '../../../shared/components/Card';
import NeonButton from '../../../shared/components/NeonButton';

export default function GameOverModal({ open, status, secretWord, winnerName, onRestart }) {
	if (!open) return null;

	const isWin = status === 'won';

	return (
		<div className='fixed inset-0 z-40 flex items-center justify-center bg-black/70'>
			<Card className='w-full max-w-md text-center'>
				<h2 className='mb-4 text-3xl font-extrabold text-white drop-shadow-[0_0_14px_rgba(244,114,182,0.7)]'>
					{isWin ? '¡La vaca se salvó!' : '¡Abducción completada!'}
				</h2>

				<p className='mb-2 text-sm text-slate-200'>La palabra era:</p>
				<p className='mb-4 text-2xl font-bold tracking-[0.25em] text-neon-green drop-shadow-[0_0_10px_rgba(190,242,100,0.8)]'>
					{String(secretWord || '').toUpperCase()}
				</p>

				{winnerName && (
					<p className='mb-6 text-sm text-slate-300'>
						{isWin ? (
							<>
								Ganó <span className='font-semibold text-neon-cyan'>{winnerName}</span>.
							</>
						) : (
							<>El OVNI ganó esta ronda 👽</>
						)}
					</p>
				)}

				<div className='flex justify-center'>
					<NeonButton
						onClick={onRestart}
						color='pink'>
						Jugar otra vez
					</NeonButton>
				</div>
			</Card>
		</div>
	);
}
