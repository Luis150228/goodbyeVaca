// src/features/abduccion/constants.js
import { DIFFICULTIES, TOPICS } from '../../data/wordLists';

export const DIFFICULTY_CONFIG = {
	[DIFFICULTIES.EASY]: {
		id: DIFFICULTIES.EASY,
		label: 'Fácil',
		maxErrors: 3,
	},
	[DIFFICULTIES.MEDIUM]: {
		id: DIFFICULTIES.MEDIUM,
		label: 'Medio',
		maxErrors: 6,
	},
	[DIFFICULTIES.HARD]: {
		id: DIFFICULTIES.HARD,
		label: 'Difícil',
		maxErrors: 9,
	},
};

export const DEFAULT_TOPIC = TOPICS.ANIMALS;
export const DEFAULT_DIFFICULTY = DIFFICULTIES.MEDIUM;

export const RAY_STAGES = [
	'off', // 0
	'dim', // 1
	'lower-legs', // 2
	'waist', // 3
	'chest', // 4
	'head', // 5
	'full-abduct', // 6
];
