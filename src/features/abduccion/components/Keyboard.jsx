// features/abduccion/components/Keyboard.jsx
const LETTERS = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('');

export default function Keyboard({ guesses, onSelectLetter, disabled, players }) {
	function getLetterState(letter) {
		const g = guesses.find((g) => g.letter === letter.toLowerCase());
		if (!g) return null;
		return g;
	}

	const playerColors = players.reduce((acc, p) => {
		acc[p.id] = p.color; // ej: '#38bdf8', '#f97316'
		return acc;
	}, {});

	return (
		<div className='max-w-3xl mx-auto grid grid-cols-9 gap-2'>
			{LETTERS.map((letter) => {
				const state = getLetterState(letter);
				const baseClasses = 'py-2 rounded-xl font-semibold text-lg transition transform active:scale-95';
				let extra = 'bg-slate-800/70 text-slate-100 hover:bg-slate-700';

				if (state) {
					if (state.isCorrect) {
						extra = 'bg-emerald-500 text-slate-900 cursor-default';
					} else {
						extra = 'bg-slate-900 text-slate-500 cursor-default line-through';
					}
				}

				const colorBorder = state && !state.isCorrect ? { borderColor: playerColors[state.playerId] || '#f97316' } : {};

				return (
					<button
						key={letter}
						disabled={disabled || !!state}
						onClick={() => onSelectLetter(letter)}
						className={`${baseClasses} border-2 ${extra}`}
						style={colorBorder}>
						{letter}
					</button>
				);
			})}
		</div>
	);
}
