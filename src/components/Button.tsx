import { forwardRef, type ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-linear-to-b from-(--color-accent-hot) to-(--color-accent) text-(--color-accent-foreground) shadow-[0_1px_2px_color-mix(in_srgb,var(--color-accent)_35%,transparent),0_6px_22px_color-mix(in_srgb,var(--color-accent)_28%,transparent)] hover:brightness-105",
  secondary: "bg-(--muted) text-(--foreground) hover:bg-(--border)",
  ghost: "bg-transparent text-(--foreground) hover:bg-(--muted)",
};

const sizeClasses: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className = "", ...props }, ref) => (
    <button
      ref={ref}
      className={`rounded-(--radius-md) font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    />
  )
);
Button.displayName = "Button";
