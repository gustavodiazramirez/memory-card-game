"use client";

import { Character } from "@/core/types/character.types";

interface CharacterCardProps {
  character: Character;
  onClick?: () => void;
  className?: string;
}

export function CharacterCard({ character, onClick, className = "" }: CharacterCardProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl overflow-hidden shadow-lg h-65 w-53 mb-3 flex flex-col ${onClick ? "cursor-pointer hover:shadow-xl transition-shadow" : ""} ${className}`}
    >
      {/* Imagen del personaje */}
      <div className="relative w-full h-44 bg-white">
        <img
          src={character.image}
          alt={character.name}
          className="w-44 h-44 object-cover object-center mx-auto mt-4 rounded-lg"
        />
      </div>
      {/* Información del personaje */}
      <div className="p-3 pl-5 flex flex-col gap-0.5 flex-1 bg-white overflow-hidden mt-3">
        <h3 className="font-bold text-base text-gray-900 leading-tight line-clamp-1">
          {character.name}
        </h3>
        <p className="text-xs text-gray-600 truncate">
          {character.status} - {character.species}
        </p>
      </div>
    </div>
  );
}
