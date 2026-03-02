"use client";

import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

interface FormInputProps {
  id: string;
  name: string;
  label: string;
  type?: "text" | "password" | "email";
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  showPasswordToggle?: boolean;
}

export function FormInput({
  id,
  name,
  label,
  type = "text",
  value,
  onChange,
  required = false,
  disabled = false,
  placeholder = "",
  showPasswordToggle = false,
}: FormInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = showPasswordToggle && showPassword ? "text" : type;

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-bold text-form-text mb-2"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          name={name}
          type={inputType}
          required={required}
          disabled={disabled}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full px-4 py-2 bg-transparent border border-input-border rounded-lg text-form-text placeholder-form-text/50 focus:outline-none focus:border-button-primary disabled:opacity-50 disabled:cursor-not-allowed ${
            showPasswordToggle ? "pr-12" : ""
          }`}
          placeholder={placeholder}
        />
        {showPasswordToggle && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-form-text/60 hover:text-form-text"
            disabled={disabled}
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        )}
      </div>
    </div>
  );
}
