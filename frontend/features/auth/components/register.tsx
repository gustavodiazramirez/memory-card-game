'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/auth-context';
import { Loading, ActionButton, TextButton, FormInput } from '@/core/components';
import Image from 'next/image';

export default function Register() {
  const router = useRouter();
  const { register, isAuthenticated, isLoading: authLoading } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/game');
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        router.push('/login');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [success, router]);

  // No renderizar el formulario si ya está autenticado
  if (authLoading || isAuthenticated) {
    return <Loading />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación básica
    if (!username.trim() || !password.trim()) {
      setError('Por favor completa todos los campos');
      return;
    }
    
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    
    setError('');
    setIsLoading(true);

    try {
      await register({ username: username.trim(), password });
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al registrarse');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-full max-w-md px-6">
          <div className="bg-card rounded-2xl shadow-2xl p-8">
            <div className="text-center">
              <div className="bg-green-100 border-2 border-green-400 text-green-700 px-4 py-3 rounded-lg font-semibold">
                ¡Registro exitoso! Redirigiendo al login...
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md px-6">
        <div className="bg-card rounded-2xl shadow-2xl p-8">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <Image
              src="/ricky_morty_logo.svg"
              alt="Rick and Morty"
              width={200}
              height={60}
              priority
            />
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            {/* Usuario */}
            <FormInput
              id="username"
              name="username"
              label="Usuario"
              type="text"
              value={username}
              onChange={setUsername}
              required
              disabled={isLoading}
            />

            {/* Contraseña */}
            <FormInput
              id="password"
              name="password"
              label="Contraseña"
              type="password"
              value={password}
              onChange={setPassword}
              required
              disabled={isLoading}
              showPasswordToggle
            />

            {/* Botón */}
            <div className="pt-2">
              <ActionButton
                type="submit"
                disabled={isLoading}
                fullWidth
              >
                {isLoading ? 'Registrando...' : 'Registrarse'}
              </ActionButton>
            </div>

            {/* Link login */}
            <div className="text-center pt-2 text-link-register">
              <TextButton onClick={() => router.push('/login')}>
                ¿Ya tienes cuenta?{" "}
                <span className="underline hover:cursor-pointer">
                  Inicia sesión
                </span>
              </TextButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
