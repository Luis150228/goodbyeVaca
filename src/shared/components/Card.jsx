// src/shared/components/Card.jsx

export default function Card({ children, className = '' }) {
	return (
		<div
			className={`relative rounded-3xl border border-purple-400/70 bg-slate-900/80 px-6 py-5 shadow-[0_0_25px_rgba(168,85,247,0.7)] ${className}`}>
			{children}
		</div>
	);
}
