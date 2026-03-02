import { GameCard as GameCardType } from "../types/game.types";
import { CharacterCard } from "@/core/components";
import Image from "next/image";

interface CardProps {
  card: GameCardType;
  onClick: (cardId: string) => void;
  disabled: boolean;
}

export default function Card({ card, onClick, disabled }: CardProps) {
  const handleClick = () => {
    if (!disabled && !card.isFlipped && !card.isMatched) {
      onClick(card.id);
    }
  };

  return (
    <div
      className={`relative cursor-pointer transition-all duration-300 w-fit h-fit ${
        card.isMatched ? "opacity-0 pointer-events-none" : "opacity-100"
      } ${!card.isFlipped && !card.isMatched ? "hover:scale-102" : ""}`}
      onClick={handleClick}
    >
      {card.isFlipped ? (
        <CharacterCard
          character={{
            id: card.characterId,
            name: card.name,
            status: card.status,
            species: card.species,
            image: card.image,
          }}
          className="mb-2"
        />
      ) : (
        <div className="rounded-2xl overflow-hidden shadow-lg w-40 h-52 sm:w-48 sm:h-60 md:w-53 md:h-65 mb-2 flex items-center justify-center p-4 sm:p-5 md:p-6 bg-card-back">
          <Image
            src="/ricky_morty_img.svg"
            alt="Rick and Morty"
            width={150}
            height={150}
            className="w-auto h-auto max-w-full max-h-full object-contain"
          />
        </div>
      )}
    </div>
  );
}
