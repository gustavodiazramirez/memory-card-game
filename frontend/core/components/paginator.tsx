"use client";

interface PaginatorProps {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
  isLoading?: boolean;
}

export function Paginator({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
  isLoading = false,
}: PaginatorProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4">
      <button
        onClick={onPrevious}
        disabled={currentPage === 1 || isLoading}
        className="w-full sm:w-auto py-2 px-6 bg-button-primary border-b-4 border-l-4 border-button-border rounded-lg font-bold text-sm sm:text-base text-white hover:bg-button-hover shadow-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-all"
      >
        Anterior
      </button>

      <div className="text-form-text text-sm sm:text-base font-medium">
        Página {currentPage} de {totalPages}
      </div>

      <button
        onClick={onNext}
        disabled={currentPage === totalPages || isLoading}
        className="w-full sm:w-auto py-2 px-6 bg-button-primary border-b-4 border-l-4 border-button-border rounded-lg font-bold text-sm sm:text-base text-white hover:bg-button-hover shadow-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-all"
      >
        Siguiente
      </button>
    </div>
  );
}
