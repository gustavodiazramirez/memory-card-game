"use client";

interface TextButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

export function TextButton({ onClick, children, className = "" }: TextButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-sm font-medium ${className}`}
    >
      {children}
    </button>
  );
}
