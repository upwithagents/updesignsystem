import { forwardRef, type ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "bg-[--color-accent] text-[--color-accent-foreground] hover:bg-[--color-accent-hover]",
  secondary: "bg-[--muted] text-[--foreground] hover:bg-[--border]",
  ghost: "bg-transparent text-[--foreground] hover:bg-[--muted]",
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
      className={`rounded-[--radius-pill] font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    />
  )
);
Button.displayName = "Button";
