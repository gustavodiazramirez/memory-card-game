interface LoadingProps {
  message?: string;
}

export function Loading({ message = 'Cargando...' }: LoadingProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="mb-6">
          <div className="inline-block relative">
            <div className="w-16 h-16 border-4 border-button-border border-t-button-primary rounded-full animate-spin"></div>
          </div>
        </div>
        <p className="text-lg text-card font-medium">{message}</p>
      </div>
    </div>
  );
}
