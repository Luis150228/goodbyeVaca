// src/features/abduccion/utils/wordUtils.js
import { WORD_LISTS } from '../../../data/wordLists';

/**
 * Normaliza una letra o palabra:
 * - minúsculas
 * - sin acentos
 */
export function normalizeLetter(str) {
	if (!str) return '';
	return str
		.toString()
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '');
}

/**
 * Obtiene todas las palabras filtradas por tema y dificultad (si se dan).
 */
export function getWordsByFilters({ topic, difficulty } = {}) {
	const normalizedTopic = topic || null;
	const normalizedDifficulty = difficulty || null;

	const filteredBlocks = WORD_LISTS.filter((block) => {
		if (normalizedTopic && block.topic !== normalizedTopic) return false;
		if (normalizedDifficulty && block.difficulty !== normalizedDifficulty) return false;
		return true;
	});

	// si no hay coincidencias, usamos TODO el catálogo
	const blocksToUse = filteredBlocks.length > 0 ? filteredBlocks : WORD_LISTS;

	return blocksToUse.flatMap((b) => b.words);
}

/**
 * Elige una palabra aleatoria, opcionalmente filtrando por tema y dificultad.
 */
export function getRandomWord(filters = {}) {
	const pool = getWordsByFilters(filters);
	if (pool.length === 0) return 'vaca'; // fallback absurdo

	const idx = Math.floor(Math.random() * pool.length);
	return pool[idx];
}
