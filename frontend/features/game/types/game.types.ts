import { Character } from '@/core/types/character.types';

export interface GameCard {
  id: string; 
  characterId: number;
  image: string;
  name: string;
  status: string;
  species: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface GameState {
  cards: GameCard[];
  flippedCards: GameCard[];
  matchedPairs: number;
  turns: number;
  isGameStarted: boolean;
  isGameFinished: boolean;
  isShowingInitialCards: boolean;
  isProcessing: boolean;
}

// Re-export Character for convenience
export type { Character };
