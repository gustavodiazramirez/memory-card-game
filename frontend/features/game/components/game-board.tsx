"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/context/auth-context";
import { useGameLogic } from "../hooks/useGameLogic";
import {
  Loading,
  ErrorState,
  LogoutButton,
  ActionButton,
  PageHeader,
} from "@/core/components";
import GameModal from "./game-modal";
import Card from "./card";

export default function GameBoard() {
  const router = useRouter();
  const { logout } = useAuth();
  const {
    gameState,
    isLoading,
    error,
    startNewGame,
    handleCardClick,
    resetGame,
  } = useGameLogic();

  // Iniciar el juego automáticamente al montar el componente
  useEffect(() => {
    if (!gameState.isGameStarted) {
      startNewGame();
    }
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const handleGallery = () => {
    router.push("/gallery");
  };

  if (isLoading) {
    return <Loading message="Cargando juego..." />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={startNewGame} />;
  }

  // Vista del juego
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-2 sm:p-4">
      <LogoutButton onLogout={handleLogout} />

      <div className="w-full max-w-5xl">
        <PageHeader title="Juego de memoria" />

        {/* Botones Galería y Reiniciar */}
        <div className="flex justify-center gap-3 pb-4">
          <ActionButton onClick={handleGallery}>Galería</ActionButton>
          <ActionButton onClick={resetGame}>Reiniciar</ActionButton>
        </div>

        {/* Contenedor principal del juego */}
        <div className="bg-card rounded-2xl shadow-2xl p-3 sm:p-6">
          <div className="flex justify-between items-center mb-3 sm:mb-4 px-4">
            <div className="lg">
              <span className="font-bold">Aciertos:</span>{" "}
              {gameState.matchedPairs}/6
            </div>
            <div className="text-form-text text-sm sm:text-lg">
              <span className="font-bold">Turnos:</span> {gameState.turns}
            </div>
          </div>

          {/* Grid de cartas */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 justify-items-center">
            {gameState.cards.map((card) => (
              <Card
                key={card.id}
                card={card}
                onClick={handleCardClick}
                disabled={
                  gameState.isProcessing ||
                  gameState.isShowingInitialCards ||
                  gameState.isGameFinished
                }
              />
            ))}
          </div>
        </div>
      </div>

      {/* Modal de victoria */}
      <GameModal
        isOpen={gameState.isGameFinished}
        turns={gameState.turns}
        onRestart={resetGame}
      />
    </div>
  );
}
