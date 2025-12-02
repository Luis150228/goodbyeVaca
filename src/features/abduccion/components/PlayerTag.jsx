// src/features/abduccion/components/PlayerTag.jsx
import astronautSvg from '../../../assets/avatars/astronaut.svg';
import alienSvg from '../../../assets/avatars/alien.svg';

export default function PlayerTag({ player, isActive, align = 'left', canGuessWord = false, onGuessWholeWord }) {
	const icon = player.type === 'alien' ? alienSvg : astronautSvg;
	const wins = typeof player.wins === 'number' ? player.wins : 0;

	const handleGuessClick = () => {
		if (!canGuessWord || !onGuessWholeWord) return;
		onGuessWholeWord();
	};

	return (
		<div
			className={`
        flex items-center gap-3 px-4 py-2 rounded-2xl shadow-lg
        bg-slate-900/80 border-2
        ${isActive ? 'border-cyan-400 ring-2 ring-cyan-300/60' : 'border-slate-700'}
        ${align === 'left' ? 'ml-4' : 'mr-4 flex-row-reverse'}
      `}
			style={{ borderColor: player.color }}>
			<img
				src={icon}
				alt={player.name}
				className='w-9 h-9'
			/>
			<div className='text-sm leading-tight'>
				<div className='font-bold tracking-wide'>
					{player.name}
				</div>
				<div className='text-xs text-slate-300'>
					{wins} victoria{wins === 1 ? '' : 's'}
				</div>
				{isActive && <div className='mt-0.5 text-[0.65rem] font-semibold text-lime-300'>TU TURNO</div>}

				{/* Botón para adivinar palabra completa, solo turno activo */}
				{isActive && canGuessWord && (
					<button
						type='button'
						onClick={handleGuessClick}
						className='mt-1 inline-flex items-center rounded-full border border-cyan-400/70 bg-slate-900/70 px-2 py-[2px] text-[0.65rem] uppercase tracking-wide text-cyan-100 hover:bg-cyan-500/30 hover:border-cyan-300 transition-colors'>
						Adivinar palabra
					</button>
				)}
			</div>
		</div>
	);
}
