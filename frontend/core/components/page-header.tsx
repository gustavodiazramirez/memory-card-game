"use client";

import Image from "next/image";

interface PageHeaderProps {
  title: string;
}

export function PageHeader({ title }: PageHeaderProps) {
  return (
    <>
      {/* Logo */}
      <div className="flex justify-center mb-2 sm:mb-4">
        <Image
          src="/ricky_morty_logo.svg"
          alt="Rick and Morty"
          width={200}
          height={60}
          priority
          className="w-40 sm:w-90 h-auto"
        />
      </div>

      {/* Badge */}
      <div className="flex justify-center mb-2 sm:mb-4">
        <div className="bg-button-border px-4 py-1 rounded-full">
          <p className="text-background font-bold text-sm sm:text-base">
            {title}
          </p>
        </div>
      </div>
    </>
  );
}
