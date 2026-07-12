import type { HTMLAttributes } from "react";

export function Card({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-[--radius-lg] border border-[--border] bg-[--background] p-4 ${className}`}
      {...props}
    />
  );
}
