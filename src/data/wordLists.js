// src/data/wordLists.js

// Temas posibles
export const TOPICS = {
	ANIMALS: 'animals',
	FOOD: 'food',
	SCIFI: 'scifi',
};

// Niveles de dificultad
export const DIFFICULTIES = {
	EASY: 'easy', // menos errores, palabras cortas
	MEDIUM: 'medium',
	HARD: 'hard',
};

/**
 * Cada entrada define un tema + dificultad + lista de palabras.
 * Las palabras van SIN tildes para simplificar la lógica.
 */
export const WORD_LISTS = [
	{
		topic: TOPICS.ANIMALS,
		difficulty: DIFFICULTIES.EASY,
		words: ['vaca', 'gato', 'perro', 'pez', 'oso', 'lobo'],
	},
	{
		topic: TOPICS.ANIMALS,
		difficulty: DIFFICULTIES.MEDIUM,
		words: ['jirafa', 'zorro', 'murcielago', 'hipopotamo', 'camello'],
	},
	{
		topic: TOPICS.ANIMALS,
		difficulty: DIFFICULTIES.HARD,
		words: ['ornitorrinco', 'cefalopodo', 'rinoceronte'],
	},

	{
		topic: TOPICS.FOOD,
		difficulty: DIFFICULTIES.EASY,
		words: ['taco', 'pizza', 'sopa', 'pan', 'flan'],
	},
	{
		topic: TOPICS.FOOD,
		difficulty: DIFFICULTIES.MEDIUM,
		words: ['hamburguesa', 'espagueti', 'ensalada', 'guacamole'],
	},
	{
		topic: TOPICS.FOOD,
		difficulty: DIFFICULTIES.HARD,
		words: ['chilaquiles', 'ratatouille', 'paella'],
	},

	{
		topic: TOPICS.SCIFI,
		difficulty: DIFFICULTIES.EASY,
		words: ['ovni', 'robot', 'laser', 'nave'],
	},
	{
		topic: TOPICS.SCIFI,
		difficulty: DIFFICULTIES.MEDIUM,
		words: ['platillo', 'galaxia', 'asteroide'],
	},
	{
		topic: TOPICS.SCIFI,
		difficulty: DIFFICULTIES.HARD,
		words: ['hiperespacio', 'teletransportacion'],
	},
];
