// src/shared/hooks/useSound.js
import { useCallback, useEffect, useRef } from 'react';

/**
 * Hook sencillo para reproducir sonidos.
 *
 * const { play } = useSound('/sounds/error.wav', { volume: 0.5 });
 */
export function useSound(src, { volume = 1.0 } = {}) {
	const audioRef = useRef(null);

	useEffect(() => {
		if (!src) return;
		const audio = new Audio(src);
		audio.volume = volume;
		audioRef.current = audio;

		return () => {
			// limpieza
			audio.pause();
			audioRef.current = null;
		};
	}, [src, volume]);

	const play = useCallback(() => {
		if (!audioRef.current) return;
		// reinicia para sonidos cortos repetidos
		audioRef.current.currentTime = 0;
		audioRef.current.play().catch(() => {
			// por si el navegador bloquea autoplay, no pasa nada
		});
	}, []);

	return { play };
}
