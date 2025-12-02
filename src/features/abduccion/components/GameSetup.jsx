import { useState } from 'react';
import Card from '../../../shared/components/Card';
import NeonButton from '../../../shared/components/NeonButton';
import HowToPlayModal from './HowToPlayModal';
import { TOPICS, DIFFICULTIES } from '../../../data/wordLists';
import { DIFFICULTY_CONFIG } from '../constants';

export default function GameSetup({ config, onChangeConfig, onStart, players, onUpdatePlayerName }) {
	const [isHowToPlayOpen, setIsHowToPlayOpen] = useState(false);
	const currentDiff = DIFFICULTY_CONFIG[config.difficulty];

	const topicButtons = [
		{ id: TOPICS.ANIMALS, label: 'Animales', emoji: '🐾' },
		{ id: TOPICS.FOOD, label: 'Comida', emoji: '🍔' },
		{ id: TOPICS.SCIFI, label: 'Ciencia ficción', emoji: '🚀' },
	];

	const difficultyButtons = [
		{ id: DIFFICULTIES.EASY, label: 'Fácil' },
		{ id: DIFFICULTIES.MEDIUM, label: 'Medio' },
		{ id: DIFFICULTIES.HARD, label: 'Difícil' },
	];

	return (
		<div className='flex items-center justify-center'>
			<Card className='w-full max-w-3xl bg-slate-900/80'>
				<h1 className='mb-6 text-center text-3xl font-extrabold tracking-wide text-neon-cyan'>SELECCIÓN DE PARTIDA</h1>

				{/* Nombres de jugadores */}
				<div className='mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2'>
					{players?.map((p) => (
						<div key={p.id} className='flex flex-col gap-1'>
							<label className='text-xs font-bold text-slate-400 uppercase tracking-wider ml-1'>
								{p.label}
							</label>
							<input
								type='text'
								value={p.name}
								onChange={(e) => onUpdatePlayerName(p.id, e.target.value)}
								className='
                  w-full px-3 py-2 rounded-xl
                  bg-slate-800/50 border border-slate-600 text-white
                  focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan
                  transition-all
                '
								placeholder={`Nombre ${p.label}`}
							/>
						</div>
					))}
				</div>

				<div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
					{/* Tema de palabras */}
					<div>
						<h2 className='mb-3 text-sm font-semibold text-slate-200 uppercase tracking-wide'>Tema de palabras</h2>
						<div className='flex flex-col gap-3'>
							{topicButtons.map((t) => {
								const selected = config.topic === t.id;
								return (
									<button
										key={t.id}
										type='button'
										onClick={() => onChangeConfig({ topic: t.id })}
										className={`
                      flex items-center justify-between rounded-2xl px-4 py-2 text-sm font-semibold
                      border transition
                      ${
												selected
													? 'border-neon-green bg-slate-800 text-neon-green shadow-[0_0_15px_rgba(190,242,100,0.7)]'
													: 'border-slate-600 bg-slate-900/60 text-slate-200 hover:border-neon-green/70'
											}
                    `}>
										<span className='flex items-center gap-2'>
											<span className='text-lg'>{t.emoji}</span>
											<span className='uppercase'>{t.label}</span>
										</span>
									</button>
								);
							})}
						</div>
					</div>

					{/* Nivel de dificultad */}
					<div>
						<h2 className='mb-3 text-sm font-semibold text-slate-200 uppercase tracking-wide'>Nivel de dificultad</h2>
						<div className='flex flex-col gap-3'>
							{difficultyButtons.map((d) => {
								const selected = config.difficulty === d.id;
								const diffCfg = DIFFICULTY_CONFIG[d.id];

								const borderClass = selected
									? 'border-neon-pink shadow-[0_0_15px_rgba(244,114,182,0.7)] text-neon-pink'
									: 'border-slate-600 text-slate-200 hover:border-neon-pink/70';

								return (
									<button
										key={d.id}
										type='button'
										onClick={() => onChangeConfig({ difficulty: d.id })}
										className={`
                      flex items-center justify-between rounded-2xl px-4 py-2 text-sm font-semibold
                      bg-slate-900/60 ${borderClass} transition
                    `}>
										<span className='uppercase'>{d.label}</span>
										<span className='text-xs text-slate-300'>{diffCfg.maxErrors} errores</span>
									</button>
								);
							})}
						</div>

						<p className='mt-4 text-xs text-slate-400 text-right'>
							{currentDiff ? `${currentDiff.maxErrors} errores permitidos` : ''}
						</p>
					</div>
				</div>

				<div className='mt-6 flex justify-end gap-4'>
					<button
						type='button'
						onClick={() => setIsHowToPlayOpen(true)}
						className='
              px-6 py-2 rounded-2xl font-semibold text-sm uppercase tracking-wide
              text-slate-400 border border-slate-600
              hover:bg-slate-800 hover:text-white hover:border-slate-400
              transition-colors
            '>
						Cómo jugar
					</button>

					<NeonButton
						color='pink'
						onClick={onStart}>
						¡Jugar!
					</NeonButton>
				</div>
			</Card>

			<HowToPlayModal
				open={isHowToPlayOpen}
				onClose={() => setIsHowToPlayOpen(false)}
			/>
		</div>
	);
}
