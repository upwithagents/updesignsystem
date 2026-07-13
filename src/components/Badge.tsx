import type { HTMLAttributes } from "react";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: "accent" | "success" | "danger" | "neutral";
}

const toneClasses: Record<NonNullable<BadgeProps["tone"]>, string> = {
  accent: "bg-(--color-accent) text-(--color-accent-foreground)",
  success: "bg-(--color-success) text-(--color-accent-foreground)",
  danger: "bg-(--color-danger) text-(--color-accent-foreground)",
  neutral: "bg-(--muted) text-(--muted-foreground)",
};

export function Badge({ tone = "neutral", className = "", ...props }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-(--radius-pill) px-2.5 py-0.5 text-xs font-medium ${toneClasses[tone]} ${className}`}
      {...props}
    />
  );
}
