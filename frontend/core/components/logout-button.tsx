"use client";

import { LogOut } from "lucide-react";

interface LogoutButtonProps {
  onLogout: () => void;
}

export function LogoutButton({ onLogout }: LogoutButtonProps) {
  return (
    <button
      onClick={onLogout}
      className="fixed top-12 left-12 w-12 h-12 bg-button-border rounded-full flex items-center justify-center text-background hover:opacity-80 transition-opacity shadow-lg z-10 cursor-pointer"
      title="Cerrar sesión"
    >
      <LogOut size={20} />
    </button>
  );
}
