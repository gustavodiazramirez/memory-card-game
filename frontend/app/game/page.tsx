import ProtectedRoute from '@/features/auth/components/protected-route';
import GameBoard from '@/features/game/components/game-board';

export default function GamePage() {
  return (
    <ProtectedRoute>
      <GameBoard />
    </ProtectedRoute>
  );
}
