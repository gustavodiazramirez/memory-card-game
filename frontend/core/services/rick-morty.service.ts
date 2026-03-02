import { Character } from '../types/character.types';

const API_BASE_URL = 'https://rickandmortyapi.com/api';

export class RickMortyService {
  /**
   * Obtiene personajes aleatorios de la API
   * @param count Número de personajes únicos a obtener
   * @returns Array de personajes
   */
  static async getRandomCharacters(count: number = 6): Promise<Character[]> {
    try {
      // La API tiene más de 800 personajes, generamos IDs aleatorios
      const randomIds = this.generateRandomIds(count, 1, 826);
      const characters: Character[] = [];

      // Obtener cada personaje por ID
      for (const id of randomIds) {
        const response = await fetch(`${API_BASE_URL}/character/${id}`);
        if (!response.ok) {
          throw new Error(`Error fetching character ${id}`);
        }
        const character: Character = await response.json();
        characters.push(character);
      }

      return characters;
    } catch (error) {
      console.error('Error fetching characters:', error);
      throw error;
    }
  }

  /**
   * Obtiene múltiples personajes por sus IDs
   * @param ids Array de IDs de personajes
   * @returns Array de personajes
   */
  static async getCharactersByIds(ids: number[]): Promise<Character[]> {
    try {
      const idsString = ids.join(',');
      const response = await fetch(`${API_BASE_URL}/character/${idsString}`);
      
      if (!response.ok) {
        throw new Error('Error fetching characters');
      }

      const characters: Character[] = await response.json();
      return Array.isArray(characters) ? characters : [characters];
    } catch (error) {
      console.error('Error fetching characters:', error);
      throw error;
    }
  }

  /**
   * Obtiene personajes con paginación
   * @param page Número de página (empieza en 1)
   * @returns Objeto con información de paginación y personajes
   */
  static async getCharactersPage(page: number = 1): Promise<{
    info: { count: number; pages: number; next: string | null; prev: string | null };
    results: Character[];
  }> {
    try {
      const response = await fetch(`${API_BASE_URL}/character?page=${page}`);
      
      if (!response.ok) {
        throw new Error('Error fetching characters page');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching characters page:', error);
      throw error;
    }
  }

  /**
   * Genera un array de IDs aleatorios únicos
   * @param count Cantidad de IDs a generar
   * @param min ID mínimo
   * @param max ID máximo
   * @returns Array de IDs únicos
   */
  private static generateRandomIds(count: number, min: number, max: number): number[] {
    const ids = new Set<number>();
    
    while (ids.size < count) {
      const randomId = Math.floor(Math.random() * (max - min + 1)) + min;
      ids.add(randomId);
    }

    return Array.from(ids);
  }
}
