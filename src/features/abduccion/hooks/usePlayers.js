// src/features/abduccion/hooks/usePlayers.js
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'abduccion_vaca_players_v1';

/**
 * Maneja el estado de los jugadores (p.ej. victorias).
 * initialPlayers: [{ id, label, name, type, color, wins? }]
 */
export function usePlayers(initialPlayers) {
	const [players, setPlayers] = useState(() => {
		// cargar de localStorage si existe
		if (typeof window !== 'undefined') {
			try {
				const raw = window.localStorage.getItem(STORAGE_KEY);
				if (raw) {
					const parsed = JSON.parse(raw);
					if (Array.isArray(parsed) && parsed.length > 0) {
						return parsed;
					}
				}
			} catch {
				// ignoramos error y caemos al default
			}
		}

		// si no hay nada almacenado, inicializamos con wins=0
		return (
			initialPlayers?.map((p) => ({
				...p,
				wins: typeof p.wins === 'number' ? p.wins : 0,
			})) || []
		);
	});

	// persistir cambios de jugadores (incluye victorias) en localStorage
	useEffect(() => {
		if (typeof window === 'undefined') return;
		try {
			window.localStorage.setItem(STORAGE_KEY, JSON.stringify(players));
		} catch {
			// si falla, no rompemos el render
		}
	}, [players]);

	function addWin(playerId) {
		setPlayers((prev) => prev.map((p) => (p.id === playerId ? { ...p, wins: (p.wins || 0) + 1 } : p)));
	}

	function resetWins() {
		setPlayers((prev) => prev.map((p) => ({ ...p, wins: 0 })));
	}

	return {
		players,
		addWin,
		resetWins,
	};
}
