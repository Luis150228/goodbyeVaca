// src/shared/components/Layout.jsx
import Particles from './Particles';

export default function Layout({ children }) {
	return (
		<div className='relative min-h-screen w-full bg-space-gradient text-white flex items-center justify-center overflow-hidden'>
			<div className='absolute inset-0 z-0 pointer-events-none'>
				<Particles
					particleColors={['#ffffff', '#ffffff']}
					particleCount={260}
					particleSpread={10}
					speed={0.12}
					particleBaseSize={80}
					sizeRandomness={0}
					moveParticlesOnHover={true}
					particleHoverFactor={1.2}
					alphaParticles={false}
					disableRotation={false}
					pixelRatio={window.devicePixelRatio || 1}
					className='w-full h-full'
				/>
			</div>

			<div className='relative w-full max-w-6xl mx-auto px-4 py-6 z-10'>{children}</div>
			<footer className='absolute bottom-2 w-full text-center text-xs text-slate-500/50 z-20 pointer-events-none font-mono tracking-widest'>
				created by Rangel Diaz
			</footer>
		</div>
	);
}
