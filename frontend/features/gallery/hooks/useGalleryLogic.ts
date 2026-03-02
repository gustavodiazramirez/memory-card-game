import { useState, useCallback } from 'react';
import { GalleryState } from '../types/gallery.types';
import { RickMortyService } from '@/core/services/rick-morty.service';

export const useGalleryLogic = () => {
  const [galleryState, setGalleryState] = useState<GalleryState>({
    characters: [],
    currentPage: 1,
    totalPages: 1,
    isLoading: true,
    error: null,
  });

  const loadCharacters = useCallback(async (page: number) => {
    setGalleryState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const data = await RickMortyService.getCharactersPage(page);
      
      setGalleryState({
        characters: data.results,
        currentPage: page,
        totalPages: data.info.pages,
        isLoading: false,
        error: null,
      });

      // Scroll al inicio de la página
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setGalleryState((prev) => ({
        ...prev,
        isLoading: false,
        error: 'Error al cargar los personajes. Por favor, intenta de nuevo.',
      }));
      console.error('Error loading characters:', err);
    }
  }, []);

  const nextPage = useCallback(() => {
    if (galleryState.currentPage < galleryState.totalPages) {
      loadCharacters(galleryState.currentPage + 1);
    }
  }, [galleryState.currentPage, galleryState.totalPages, loadCharacters]);

  const previousPage = useCallback(() => {
    if (galleryState.currentPage > 1) {
      loadCharacters(galleryState.currentPage - 1);
    }
  }, [galleryState.currentPage, loadCharacters]);

  const goToPage = useCallback((page: number) => {
    if (page >= 1 && page <= galleryState.totalPages) {
      loadCharacters(page);
    }
  }, [galleryState.totalPages, loadCharacters]);

  return {
    galleryState,
    loadCharacters,
    nextPage,
    previousPage,
    goToPage,
  };
};
