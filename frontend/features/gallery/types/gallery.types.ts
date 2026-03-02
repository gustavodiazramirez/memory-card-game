import { Character } from '@/core/types/character.types';

export interface GalleryState {
  characters: Character[];
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;
}
