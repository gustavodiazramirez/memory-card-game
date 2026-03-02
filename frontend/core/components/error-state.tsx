interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
  retryLabel?: string;
}

export function ErrorState({ 
  message, 
  onRetry, 
  retryLabel = 'Intentar de nuevo' 
}: ErrorStateProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="bg-card rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <div className="text-center mb-6">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <svg 
              className="w-8 h-8 text-red-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12" 
              />
            </svg>
          </div>
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
