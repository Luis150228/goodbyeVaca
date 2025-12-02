// src/shared/hooks/useKeyPress.js
import { useEffect } from 'react';

/**
 * Llama callback cuando se presiona alguna de las teclas indicadas.
 *
 * keys: array de letras (ej. ['a','b','c']) en minúsculas.
 * callback: (key: string, event: KeyboardEvent) => void
 */
export function useKeyPress(keys, callback) {
	useEffect(() => {
		if (!Array.isArray(keys) || typeof callback !== 'function') return;

		const normalized = keys.map((k) => k.toLowerCase());

		function handleKeyDown(e) {
			const key = e.key.toLowerCase();
			if (normalized.includes(key)) {
				callback(key, e);
			}
		}

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [keys, callback]);
}
