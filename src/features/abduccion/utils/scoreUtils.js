// src/features/abduccion/utils/scoreUtils.js

/**
 * Número de errores de un jugador específico.
 */
export function getWrongCountForPlayer(guesses, playerId) {
	return guesses.filter((g) => g.playerId === playerId && !g.isCorrect).length;
}

/**
 * Último jugador que acertó una letra.
 * Útil para decidir quién "ganó" al completar la palabra.
 */
export function getLastCorrectPlayer(guesses, players) {
	const lastCorrect = [...guesses].filter((g) => g.isCorrect).at(-1);
	if (!lastCorrect) return null;
	return players.find((p) => p.id === lastCorrect.playerId) || null;
}
