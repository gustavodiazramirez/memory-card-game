import { useState, useEffect, useCallback } from "react";
import { GameCard, GameState, Character } from "../types/game.types";
import { RickMortyService } from "@/core/services/rick-morty.service";

const PAIRS_COUNT = 6;
const INITIAL_DISPLAY_TIME = 3000;
const FLIP_DELAY = 1000;

export const useGameLogic = () => {
  const [gameState, setGameState] = useState<GameState>({
    cards: [],
    flippedCards: [],
    matchedPairs: 0,
    turns: 0,
    isGameStarted: false,
    isGameFinished: false,
    isShowingInitialCards: false,
    isProcessing: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Baraja un array
  const shuffleArray = <T>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Crea las cartas del juego
  const createGameCards = (characters: Character[]): GameCard[] => {
    const cards: GameCard[] = [];

    characters.forEach((character) => {
      cards.push({
        id: `${character.id}-1`,
        characterId: character.id,
        image: character.image,
        name: character.name,
        status: character.status,
        species: character.species,
        isFlipped: true,
        isMatched: false,
      });

      cards.push({
        id: `${character.id}-2`,
        characterId: character.id,
        image: character.image,
        name: character.name,
        status: character.status,
        species: character.species,
        isFlipped: true,
        isMatched: false,
      });
    });

    return shuffleArray(cards);
  };

  // Verifica si dos cartas coinciden usando useEffect
  useEffect(() => {
    if (gameState.flippedCards.length !== 2) return;

    const [firstCard, secondCard] = gameState.flippedCards;
    const isMatch = firstCard.characterId === secondCard.characterId;

    const timer = setTimeout(() => {
      setGameState((prev) => {
        if (isMatch) {
          // Coinciden: marcar como emparejadas
          const updatedCards = prev.cards.map((card) =>
            card.id === firstCard.id || card.id === secondCard.id
              ? { ...card, isMatched: true }
              : card,
          );

          const newMatchedPairs = prev.matchedPairs + 1;

          return {
            ...prev,
            cards: updatedCards,
            flippedCards: [],
            matchedPairs: newMatchedPairs,
            isGameFinished: newMatchedPairs === PAIRS_COUNT,
            isProcessing: false,
          };
        } else {
          // No coinciden: voltear de nuevo
          const updatedCards = prev.cards.map((card) =>
            card.id === firstCard.id || card.id === secondCard.id
              ? { ...card, isFlipped: false }
              : card,
          );

          return {
            ...prev,
            cards: updatedCards,
            flippedCards: [],
            isProcessing: false,
          };
        }
      });
    }, FLIP_DELAY);

    return () => clearTimeout(timer);
  }, [gameState.flippedCards]);

  // Inicia un nuevo juego
  const startNewGame = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const characters =
        await RickMortyService.getRandomCharacters(PAIRS_COUNT);

      // Precargar imágenes
      await Promise.all(
        characters.map((character) => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(character);
            img.onerror = () =>
              reject(new Error(`Error cargando: ${character.name}`));
            img.src = character.image;
          });
        }),
      );

      const cards = createGameCards(characters);

      setGameState({
        cards,
        flippedCards: [],
        matchedPairs: 0,
        turns: 0,
        isGameStarted: true,
        isGameFinished: false,
        isShowingInitialCards: true,
        isProcessing: false,
      });

      setIsLoading(false);

      // Voltear cartas después de mostrarlas
      setTimeout(() => {
        setGameState((prev) => ({
          ...prev,
          cards: prev.cards.map((card) => ({ ...card, isFlipped: false })),
          isShowingInitialCards: false,
        }));
      }, INITIAL_DISPLAY_TIME);
    } catch (err) {
      setError("Error al cargar los personajes. Por favor, intenta de nuevo.");
      console.error("Error starting game:", err);
      setIsLoading(false);
    }
  }, []);

  // Maneja el click en una carta
  const handleCardClick = useCallback((cardId: string) => {
    setGameState((prev) => {
      // Validaciones
      if (
        prev.isShowingInitialCards ||
        prev.isProcessing ||
        !prev.isGameStarted ||
        prev.isGameFinished ||
        prev.flippedCards.length >= 2
      ) {
        return prev;
      }

      const clickedCard = prev.cards.find((card) => card.id === cardId);

      if (!clickedCard || clickedCard.isFlipped || clickedCard.isMatched) {
        return prev;
      }

      // Voltear la carta
      const updatedCards = prev.cards.map((card) =>
        card.id === cardId ? { ...card, isFlipped: true } : card,
      );

      const newFlippedCards = [...prev.flippedCards, clickedCard];

      // Actualizar estado
      return {
        ...prev,
        cards: updatedCards,
        flippedCards: newFlippedCards,
        turns: newFlippedCards.length === 2 ? prev.turns + 1 : prev.turns,
        isProcessing: newFlippedCards.length === 2,
      };
    });
  }, []);

  // Reinicia el juego
  const resetGame = useCallback(() => {
    startNewGame();
  }, [startNewGame]);

  return {
    gameState,
    isLoading,
    error,
    startNewGame,
    handleCardClick,
    resetGame,
  };
};
