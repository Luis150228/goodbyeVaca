// src/features/abduccion/components/GuessWordModal.jsx
import { useState, useEffect } from 'react';
import Card from '../../../shared/components/Card';
import NeonButton from '../../../shared/components/NeonButton';

export default function GuessWordModal({ open, onClose, onSubmit }) {
	const [word, setWord] = useState('');

	// Reset input when modal opens
	useEffect(() => {
		if (open) {
			setWord('');
		}
	}, [open]);

	if (!open) return null;

	const handleSubmit = (e) => {
		e.preventDefault();
		if (word.trim()) {
			onSubmit(word.trim());
		}
	};

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]'>
			<Card className='w-full max-w-md text-center'>
				<h2 className='mb-6 text-2xl font-bold text-white drop-shadow-[0_0_10px_rgba(190,242,100,0.8)]'>
					¿Cuál es la palabra?
				</h2>

				<form onSubmit={handleSubmit} className='flex flex-col gap-6'>
					<input
						type='text'
						value={word}
						onChange={(e) => setWord(e.target.value)}
						placeholder='Escribe la palabra completa...'
						className='
              w-full px-4 py-3
              bg-slate-900/50
              border-2 border-neon-cyan/50
              rounded-xl
              text-white text-lg text-center tracking-widest uppercase
              placeholder:text-slate-500 placeholder:normal-case placeholder:tracking-normal
              focus:outline-none focus:border-neon-cyan focus:shadow-[0_0_15px_rgba(56,189,248,0.5)]
              transition-all duration-300
            '
						autoFocus
					/>

					<div className='flex gap-4 justify-center'>
						<button
							type='button'
							onClick={onClose}
							className='
                px-6 py-2 rounded-2xl font-semibold text-sm uppercase tracking-wide
                text-slate-300 border border-slate-600
                hover:bg-slate-800 hover:text-white
                transition-colors
              '>
							Cancelar
						</button>

						<NeonButton type='submit' color='cyan' disabled={!word.trim()}>
							Adivinar
						</NeonButton>
					</div>
				</form>
			</Card>
		</div>
	);
}
