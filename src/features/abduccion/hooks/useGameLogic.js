// src/features/abduccion/hooks/useGameLogic.js
import { useMemo, useState } from 'react';
import { getRandomWord, normalizeLetter } from '../utils/wordUtils';
import { DEFAULT_DIFFICULTY, DEFAULT_TOPIC, DIFFICULTY_CONFIG } from '../constants';

export function useGameLogic(players, initialConfig) {
	const baseConfig = {
		topic: DEFAULT_TOPIC,
		difficulty: DEFAULT_DIFFICULTY,
		...initialConfig,
	};

	const defaultMaxErrors =
		baseConfig.maxErrors ||
		DIFFICULTY_CONFIG[baseConfig.difficulty]?.maxErrors ||
		DIFFICULTY_CONFIG[DEFAULT_DIFFICULTY].maxErrors;

	const [config, setConfig] = useState({
		topic: baseConfig.topic,
		difficulty: baseConfig.difficulty,
		maxErrors: defaultMaxErrors,
	});

	const [secretWord, setSecretWord] = useState(() =>
		getRandomWord({
			topic: config.topic,
			difficulty: config.difficulty,
		})
	);

	const [guesses, setGuesses] = useState([]);
	const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
	const [status, setStatus] = useState('playing'); // 'playing' | 'won' | 'lost'

	const wrongGuesses = useMemo(() => guesses.filter((g) => !g.isCorrect), [guesses]);

	const correctLetters = useMemo(() => guesses.filter((g) => g.isCorrect).map((g) => g.letter), [guesses]);

	const maskedWord = useMemo(() => {
		return secretWord
			.split('')
			.map((ch) => (ch === ' ' ? ' ' : correctLetters.includes(normalizeLetter(ch)) ? ch.toUpperCase() : '_'));
	}, [secretWord, correctLetters]);

	function checkEndGame(updatedGuesses, word, maxErrors) {
		const wrongCount = updatedGuesses.filter((g) => !g.isCorrect).length;

		const allRevealed = word
			.split('')
			.filter((ch) => ch !== ' ')
			.every((ch) => updatedGuesses.some((g) => g.isCorrect && normalizeLetter(g.letter) === normalizeLetter(ch)));

		if (allRevealed) return 'won';
		if (wrongCount >= maxErrors) return 'lost';
		return 'playing';
	}

	function guessLetter(letter) {
		if (status !== 'playing') return;

		const normalized = normalizeLetter(letter);

		// ya intentada
		if (guesses.some((g) => normalizeLetter(g.letter) === normalized)) return;

		const isCorrect = normalizeLetter(secretWord).includes(normalized);
		const currentPlayer = players[currentPlayerIndex];

		const nextGuesses = [...guesses, { letter: normalized, isCorrect, playerId: currentPlayer.id }];

		setGuesses(nextGuesses);

		const nextStatus = checkEndGame(nextGuesses, secretWord, config.maxErrors);
		setStatus(nextStatus);

		if (nextStatus === 'playing') {
			setCurrentPlayerIndex((prev) => (prev + 1) % players.length);
		}
	}

	// intento de adivinar TODA la palabra en el turno
	function guessWholeWord(rawAttempt) {
		if (status !== 'playing') return;

		const attempt = (rawAttempt || '').trim();
		if (!attempt) return;

		const normalizeForCompare = (text) =>
			text
				.split('')
				.filter((ch) => ch !== ' ')
				.map((ch) => normalizeLetter(ch))
				.join('');

		const secretNorm = normalizeForCompare(secretWord);
		const attemptNorm = normalizeForCompare(attempt);
		const currentPlayer = players[currentPlayerIndex];

		let nextGuesses = [...guesses];

		if (attemptNorm === secretNorm) {
			// ✅ Adivinó bien: victoria inmediata
			const lettersInSecret = Array.from(new Set(secretNorm.split('')));
			const alreadyCorrect = new Set(guesses.filter((g) => g.isCorrect).map((g) => g.letter));

			const missingLetters = lettersInSecret.filter((l) => !alreadyCorrect.has(l));

			const extraGuesses = missingLetters.map((letter) => ({
				letter,
				isCorrect: true,
				playerId: currentPlayer.id,
				isWordGuess: true,
			}));

			nextGuesses = [
				...nextGuesses,
				...extraGuesses,
				{
					letter: attempt,
					isCorrect: true,
					playerId: currentPlayer.id,
					isWordGuess: true,
				},
			];

			setGuesses(nextGuesses);
			setStatus('won');
		} else {
			// ❌ Se equivocó: pierde la partida y la vaca es abducida
			nextGuesses = [
				...nextGuesses,
				{
					letter: attempt,
					isCorrect: false,
					playerId: currentPlayer.id,
					isWordGuess: true,
				},
			];

			setGuesses(nextGuesses);
			setStatus('lost');
		}
		// no cambiamos de turno, el juego termina aquí
	}

	function resetGame(overrides) {
		setConfig((prev) => {
			const merged = { ...prev, ...(overrides || {}) };
			const maxErrors =
				merged.maxErrors ||
				DIFFICULTY_CONFIG[merged.difficulty]?.maxErrors ||
				DIFFICULTY_CONFIG[DEFAULT_DIFFICULTY].maxErrors;

			const finalConfig = { ...merged, maxErrors };

			setSecretWord(
				getRandomWord({
					topic: finalConfig.topic,
					difficulty: finalConfig.difficulty,
				})
			);
			setGuesses([]);
			setStatus('playing');
			setCurrentPlayerIndex(0);

			return finalConfig;
		});
	}

	return {
		secretWord,
		maskedWord,
		guesses,
		wrongGuesses,
		currentPlayerIndex,
		status,
		guessLetter,
		guessWholeWord,
		resetGame,
		config,
		maxErrors: config.maxErrors,
	};
}
