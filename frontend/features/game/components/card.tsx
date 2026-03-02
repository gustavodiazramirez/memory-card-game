import { GameCard as GameCardType } from "../types/game.types";
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
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg h-65 w-55 mb-2 flex flex-col">
        {card.isFlipped ? (
          <>
            {/* Imagen del personaje */}
            <div className="relative w-full h-44 bg-white">
              <img
                src={card.image}
                alt={card.name}
                className="w-44 h-44 object-cover object-center mx-auto mt-4 rounded-lg"
              />
            </div>
            {/* Información del personaje */}
            <div className="p-3 pl-5 flex flex-col gap-0.5 flex-1 bg-white overflow-hidden mt-3">
              <h3 className="font-bold text-base text-gray-900 leading-tight line-clamp-1">
                {card.name}
              </h3>
              <p className="text-xs text-gray-600 truncate">
                {card.status} - {card.species}
              </p>
            </div>
          </>
        ) : (
          <div className="w-full h-72 flex items-center justify-center p-6 bg-card-back">
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
    </div>
  );
}
