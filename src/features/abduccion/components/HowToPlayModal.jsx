// src/features/abduccion/components/HowToPlayModal.jsx
import Card from '../../../shared/components/Card';
import NeonButton from '../../../shared/components/NeonButton';

export default function HowToPlayModal({ open, onClose }) {
	if (!open) return null;

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]'>
			<Card className='w-full max-w-lg text-left'>
				<h2 className='mb-6 text-2xl font-bold text-center text-white drop-shadow-[0_0_10px_rgba(190,242,100,0.8)]'>
					CÓMO JUGAR
				</h2>

				<div className='space-y-4 text-slate-200 text-sm leading-relaxed mb-8'>
					<p>
						<span className='text-neon-cyan font-bold'>1.</span> Selecciona un tema y un nivel de dificultad para comenzar.
					</p>
					<p>
						<span className='text-neon-cyan font-bold'>2.</span> Adivina la palabra secreta letra por letra.
					</p>
					<p>
						<span className='text-neon-cyan font-bold'>3.</span> Cada error acerca más al <span className='text-neon-green'>OVNI</span> a la pobre vaca.
					</p>
					<p>
						<span className='text-neon-cyan font-bold'>4.</span> Si el OVNI llega a la vaca, ¡será abducida y perderás!
					</p>
					<p>
						<span className='text-neon-cyan font-bold'>5.</span> Puedes intentar adivinar la palabra completa en cualquier momento, pero cuidado: <span className='text-neon-pink font-bold'>si fallas, pierdes inmediatamente.</span>
					</p>
				</div>

				<div className='flex justify-center'>
					<NeonButton onClick={onClose} color='green'>
						Entendido
					</NeonButton>
				</div>
			</Card>
		</div>
	);
}
