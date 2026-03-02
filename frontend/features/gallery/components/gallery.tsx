"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/context/auth-context";
import { useGalleryLogic } from "../hooks/useGalleryLogic";
import {
  Loading,
  ErrorState,
  LogoutButton,
  ActionButton,
  CharacterCard,
  PageHeader,
  Paginator,
} from "@/core/components";

export default function Gallery() {
  const router = useRouter();
  const { logout } = useAuth();
  const { galleryState, loadCharacters, nextPage, previousPage } =
    useGalleryLogic();

  useEffect(() => {
    loadCharacters(1);
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const handlePlayGame = () => {
    router.push("/game");
  };

  if (galleryState.isLoading && galleryState.characters.length === 0) {
    return <Loading message="Cargando galería..." />;
  }

  if (galleryState.error) {
    return (
      <ErrorState
        message={galleryState.error}
        onRetry={() => loadCharacters(galleryState.currentPage)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-2 sm:p-4">
      <LogoutButton onLogout={handleLogout} />

      <div className="w-full max-w-5xl">
        <PageHeader title="Galería de personajes" />

        {/* Botón Jugar */}
        <div className="flex justify-center mb-2 sm:mb-4">
          <ActionButton onClick={handlePlayGame}>Jugar</ActionButton>
        </div>

        {/* Contenedor principal de la galería */}
        <div className="bg-card rounded-2xl shadow-2xl p-3 sm:p-6">
          {/* Título */}
          <div className="mb-3 sm:mb-4 ml-3">
            <h2 className="text-lg sm:text-xl font-bold text-form-text">
              Personajes
            </h2>
          </div>

          {/* Grid de personajes */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 justify-items-center">
            {galleryState.characters.map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </div>

          {/* Paginador */}
          <Paginator
            currentPage={galleryState.currentPage}
            totalPages={galleryState.totalPages}
            onPrevious={previousPage}
            onNext={nextPage}
            isLoading={galleryState.isLoading}
          />
        </div>
      </div>
    </div>
  );
}
