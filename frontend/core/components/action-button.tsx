"use client";

interface ActionButtonProps {
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  fullWidth?: boolean;
}

export function ActionButton({
  onClick,
  type = "button",
  children,
  variant = "primary",
  disabled = false,
  fullWidth = false,
}: ActionButtonProps) {
  const baseClasses = "py-3 px-4 bg-button-primary border-b-4 border-l-4 border-button-border rounded-lg font-medium tracking-widest text-white hover:bg-button-hover shadow-lg cursor-pointer transition-all";
  const disabledClasses = "disabled:opacity-50 disabled:cursor-not-allowed";
  const widthClasses = fullWidth ? "w-full" : "w-auto";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${disabledClasses} ${widthClasses}`}
    >
      {children}
    </button>
  );
}
