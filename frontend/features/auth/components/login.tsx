"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/auth-context";
import { Loading, ActionButton, TextButton, FormInput } from "@/core/components";
import Image from "next/image";

export default function Login() {
  const router = useRouter();
  const { login, isAuthenticated, isLoading: authLoading } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/game');
    }
  }, [isAuthenticated, router]);

  // No renderizar el formulario si ya está autenticado
  if (authLoading || isAuthenticated) {
    return <Loading />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validación básica
    if (!username.trim() || !password.trim()) {
      setError("Por favor completa todos los campos");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      await login({ username: username.trim(), password });
      router.push('/game');
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al iniciar sesión");
    } finally {
      setIsLoading(false);
    }
  };

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
                {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
              </ActionButton>
            </div>

            {/* Link crear cuenta */}
            <div className="text-center pt-2 text-link-register">
              <TextButton onClick={() => router.push("/register")}>
                ¿No tienes una cuenta?{" "}
                <span className="underline hover:cursor-pointer">
                  Regístrate
                </span>
              </TextButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
