import { API_CONFIG } from '@/core/config/api.config';
import { httpClient } from '@/core/services/http-client';
import { tokenService } from '@/core/services/token.service';
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  User,
} from '@/core/types/auth.types';

export const authService = {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await httpClient.post(
        API_CONFIG.ENDPOINTS.LOGIN,
        credentials
      );

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Error en el login' }));
        throw new Error(error.message || 'Credenciales inválidas');
      }

      const data: LoginResponse = await response.json();
      tokenService.setTokens(data.accessToken, data.refreshToken);
      tokenService.setUser(data.user);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Error al conectar con el servidor');
    }
  },

  async register(userData: RegisterRequest): Promise<RegisterResponse> {
    try {
      const response = await httpClient.post(
        API_CONFIG.ENDPOINTS.REGISTER,
        userData
      );

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Error en el registro' }));
        throw new Error(error.message || 'No se pudo crear la cuenta');
      }

      const data: RegisterResponse = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Error al conectar con el servidor');
    }
  },

  getCurrentUser(): User | null {
    if (!tokenService.hasValidTokens()) {
      return null;
    }

    return tokenService.getUser();
  },

  async logout(): Promise<void> {
    const refreshToken = tokenService.getRefreshToken();
    
    // Limpiar tokens localmente primero
    tokenService.clearTokens();
    
    // Intentar invalidar la sesión en el servidor (sin bloquear si falla)
    if (refreshToken) {
      try {
        await httpClient.post('/sessions/logout', { refreshToken });
      } catch {
        // Ignorar errores del servidor al hacer logout
        // Ya limpiamos los tokens localmente
      }
    }
  },
};
