interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
  retryLabel?: string;
}

export function ErrorState({
  message,
  onRetry,
  retryLabel = "Intentar de nuevo",
}: ErrorStateProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="bg-card rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-form-text">{message}</p>
        </div>
        {onRetry && (
          <button
            onClick={onRetry}
            className="w-full py-3 px-4 bg-button-primary border-b-4 border-l-4 border-button-border rounded-lg font-medium tracking-widest text-white hover:bg-button-hover shadow-lg cursor-pointer transition-all"
          >
            {retryLabel}
          </button>
        )}
      </div>
    </div>
  );
}
