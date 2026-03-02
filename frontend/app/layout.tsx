import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/features/auth/context/auth-context";

export const metadata: Metadata = {
  title: "App Auth",
  description: "Sistema de autenticación profesional",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
