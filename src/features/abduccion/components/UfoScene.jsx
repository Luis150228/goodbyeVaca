// src/features/abduccion/components/UfoScene.jsx
import ufoSvg from '../../../assets/ufo-placeholder.svg';
import cowSvg from '../../../assets/cow-placeholder.svg';
import hillsSvg from '../../../assets/hills.svg';
import moonSvg from '../../../assets/moon.svg';
import { RAY_STAGES } from '../constants';

export default function UfoScene({ wrongCount, maxErrors, status }) {
	const isLost = status === 'lost';
	const isWon = status === 'won';

	const safeMax = Math.max(1, maxErrors || RAY_STAGES.length - 1);
	const clampedWrong = Math.max(0, Math.min(wrongCount, safeMax));
	const progress = clampedWrong / safeMax;

	const stageIndex = Math.round(progress * (RAY_STAGES.length - 1));
	const stage = RAY_STAGES[stageIndex];

	// Animación del OVNI
	let ufoAnimationClass = 'animate-[fly-in-top-right_1s_ease-out_forwards]';
	if (isLost || isWon) {
		ufoAnimationClass = 'animate-[fly-away-top-left_1.5s_ease-in_forwards]';
	}

	// Animación de la Vaca
	let cowAnimationClass = '';
	if (isLost) {
		cowAnimationClass = 'animate-[abduct-cow_1s_ease-in_forwards]';
	} else if (isWon) {
		cowAnimationClass = 'animate-[celebrate-cow_1s_ease-in-out_infinite]';
	}

	return (
		<div className='relative w-full max-w-4xl h-72 flex items-end justify-center'>
			{/* Colinas: llenan el ancho, ancladas abajo, más altas y sin cortes visibles */}
			<img
				src={hillsSvg}
				alt='colinas'
				className='
          pointer-events-none
          fixed inset-x-0 bottom-0
          w-full max-w-none
          object-cover
          z-0
          origin-bottom
          scale-y-110
		  -translate-y-32
        '
			/>

			{/* Luna con gloss / glow tipo OVNI */}
			<img
				src={moonSvg}
				alt='luna'
				className='
          absolute right-10 top-4 w-16 opacity-90
          drop-shadow-[0_0_20px_rgba(255,255,255,0.7)]
        '
			/>

			{/* OVNI */}
			<div className={`absolute top-4 z-10 ${ufoAnimationClass}`}>
				<div className='flex flex-col items-center animate-[wobble-float_6s_ease-in-out_infinite]'>
					<img
						src={ufoSvg}
						alt='OVNI'
						className={`
            w-40
            drop-shadow-[0_0_25px_rgba(34,197,94,0.8)]
            transition-transform duration-300
            ${stage !== 'off' ? 'translate-y-1 animate-[pulse-subtle_2s_ease-in-out_infinite]' : ''}
          `}
					/>

					{/* Rayo */}
					<div
						className={`
            relative w-28 mt-2 origin-top
            transition-all duration-300
            ${stage === 'off' ? 'h-0 opacity-0' : 'opacity-100'}
          `}
						style={{
							height:
								stage === 'dim'
									? '40px'
									: stage === 'lower-legs'
									? '80px'
									: stage === 'waist'
									? '120px'
									: stage === 'chest'
									? '150px'
									: '190px',
						}}>
						<div
							className='
              absolute inset-0
              bg-gradient-to-b
              from-lime-300/80 via-lime-400/50 to-emerald-500/0
              blur-sm rounded-b-full
            '
						/>
					</div>
				</div>
			</div>

			{/* Vaca */}
			<div
				className='relative z-10 transition-transform duration-300'
				style={{
					transform:
						stage === 'off'
							? 'translateY(0)'
							: stage === 'dim'
							? 'translateY(-4px)'
							: stage === 'lower-legs'
							? 'translateY(-12px)'
							: stage === 'waist'
							? 'translateY(-24px)'
							: stage === 'chest'
							? 'translateY(-40px)'
							: 'translateY(-80px)',
				}}>
				<img
					src={cowSvg}
					alt='vaca aburrida'
					className={`
            w-28
            drop-shadow-[0_0_15px_rgba(15,23,42,0.8)]
            ${cowAnimationClass}
          `}
				/>
			</div>
		</div>
	);
}
