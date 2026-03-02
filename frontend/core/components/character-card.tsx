"use client";

import { Character } from "@/core/types/character.types";

interface CharacterCardProps {
  character: Character;
  onClick?: () => void;
  className?: string;
}

export function CharacterCard({
  character,
  onClick,
  className = "",
}: CharacterCardProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl overflow-hidden shadow-lg w-40 h-52 sm:w-48 sm:h-60 md:w-53 md:h-65 mb-4 flex flex-col ${onClick ? "cursor-pointer hover:shadow-xl transition-shadow" : ""} ${className}`}
    >
      {/* Imagen del personaje */}
      <div className="relative w-full h-32 sm:h-36 md:h-44 bg-white">
        <img
          src={character.image}
          alt={character.name}
          className="w-32 h-32 sm:w-36 sm:h-36 md:w-44 md:h-44 object-cover object-center mx-auto mt-2 sm:mt-3 md:mt-4 rounded-lg"
        />
      </div>
      {/* Información del personaje */}
      <div className="p-2 pl-3 sm:p-2.5 sm:pl-4 md:p-3 md:pl-5 flex flex-col gap-0.5 flex-1 bg-white overflow-hidden mt-2 sm:mt-2.5 md:mt-3">
        <h3 className="font-bold text-sm sm:text-sm md:text-base text-gray-900 leading-tight line-clamp-1">
          {character.name}
        </h3>
        <p className="text-xs text-gray-600 truncate">
          {character.status} - {character.species}
        </p>
      </div>
    </div>
  );
}
