import { useRouter } from "next/navigation";
import { ActionButton, TextButton } from "@/core/components";

interface GameModalProps {
  isOpen: boolean;
  turns: number;
  onRestart: () => void;
}

export default function GameModal({
  isOpen,
  turns,
  onRestart,
}: GameModalProps) {
  const router = useRouter();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-2xl shadow-2xl p-8 max-w-md w-full border-4 border-button-border">
        {/* Título */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-button-primary mb-2">
            ¡Felicidades!
          </h2>
          <p className="text-form-text text-lg">Has completado el juego en</p>
          <p className="text-4xl font-bold text-button-primary mt-2">
            {turns} {turns === 1 ? "turno" : "turnos"}
          </p>
        </div>

        {/* Botones */}
        <div className="flex flex-col gap-3">
          <ActionButton onClick={onRestart} fullWidth>
            Jugar de nuevo
          </ActionButton>
          <TextButton
            onClick={() => router.push("/gallery")}
            className="w-full py-3 px-4 border border-button-border rounded-lg text-form-text hover:bg-button-border/20 transition-all cursor-pointer"
          >
            Volver al inicio
          </TextButton>
        </div>
      </div>
    </div>
  );
}
