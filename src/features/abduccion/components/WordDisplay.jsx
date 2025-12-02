// src/features/abduccion/components/WordDisplay.jsx

export default function WordDisplay({ maskedWord }) {
	// maskedWord puede ser array o string; lo normalizamos
	const chars = Array.isArray(maskedWord) ? maskedWord : String(maskedWord || '').split('');

	return (
		<div className='flex flex-wrap justify-center gap-2 text-4xl font-bold tracking-[0.35em]'>
			{chars.map((ch, idx) => (
				<span
					key={`${ch}-${idx}`}
					className='min-w-[1ch] text-center text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]'>
					{ch === ' ' ? '\u00A0' : ch}
				</span>
			))}
		</div>
	);
}
