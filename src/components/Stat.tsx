import { Card } from "./Card";

export interface StatProps {
  label: string;
  value: string;
  delta?: { value: string; tone: "positive" | "negative" };
  /** Shows a live instrument hairline across the card's top edge. */
  live?: boolean;
}

export function Stat({ label, value, delta, live = false }: StatProps) {
  return (
    <Card className={`relative ${live ? "before:absolute before:-top-px before:left-3.5 before:right-3.5 before:h-0.5 before:rounded-full before:bg-linear-to-r before:from-transparent before:via-(--color-accent) before:to-transparent" : ""}`}>
      <p className="text-sm text-(--muted-foreground)">{label}</p>
      <p className="mt-1 font-(family-name:--font-mono) text-2xl font-medium tabular-nums text-(--foreground)">{value}</p>
      {delta && (
        <p
          className={`mt-1 text-sm ${
            delta.tone === "positive" ? "text-(--color-success)" : "text-(--color-danger)"
          }`}
        >
          {delta.value}
        </p>
      )}
    </Card>
  );
}
