// src/shared/components/NeonButton.jsx

const colorMap = {
	green: {
		bg: 'bg-neon-green text-slate-900',
		glow: 'shadow-[0_0_18px_rgba(190,242,100,0.8)]',
		hover: 'hover:bg-lime-300',
	},
	cyan: {
		bg: 'bg-neon-cyan text-slate-900',
		glow: 'shadow-[0_0_18px_rgba(56,189,248,0.8)]',
		hover: 'hover:bg-sky-300',
	},
	pink: {
		bg: 'bg-neon-pink text-slate-900',
		glow: 'shadow-[0_0_18px_rgba(244,114,182,0.9)]',
		hover: 'hover:bg-pink-300',
	},
};

export default function NeonButton({ children, color = 'green', className = '', ...props }) {
	const palette = colorMap[color] || colorMap.green;

	return (
		<button
			type='button'
			className={`px-6 py-2 rounded-2xl font-semibold text-sm uppercase tracking-wide
        ${palette.bg} ${palette.glow} ${palette.hover}
        transition transform hover:scale-105 active:scale-95
        border border-white/40
        ${className}
      `}
			{...props}>
			{children}
		</button>
	);
}
