import { useRouter } from 'next/navigation';

interface GameModalProps {
  isOpen: boolean;
  turns: number;
  onRestart: () => void;
}

export default function GameModal({ isOpen, turns, onRestart }: GameModalProps) {
  const router = useRouter();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-2xl shadow-2xl p-8 max-w-md w-full border-4 border-button-border">
        {/* Título */}
        <div className="text-center mb-6">
          <div className="mx-auto w-20 h-20 bg-button-primary/10 rounded-full flex items-center justify-center mb-4">
            <svg 
              className="w-12 h-12 text-button-primary" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-button-primary mb-2">
            ¡Felicidades!
          </h2>
          <p className="text-form-text text-lg">
            Has completado el juego en
          </p>
          <p className="text-4xl font-bold text-button-primary mt-2">
            {turns} {turns === 1 ? 'turno' : 'turnos'}
          </p>
        </div>

        {/* Botones */}
        <div className="flex flex-col gap-3">
          <button
            onClick={onRestart}
            className="w-full py-3 px-4 bg-button-primary border-b-4 border-l-4 border-button-border rounded-lg font-medium tracking-widest text-white hover:bg-button-hover shadow-lg cursor-pointer transition-all"
          >
            Jugar de nuevo
          </button>
          <button
            onClick={() => router.push('/game')}
            className="w-full py-3 px-4 bg-transparent border border-button-border rounded-lg font-medium text-form-text hover:bg-button-border/20 transition-all"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
}
