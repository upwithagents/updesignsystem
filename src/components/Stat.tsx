import { Card } from "./Card";

export interface StatProps {
  label: string;
  value: string;
  delta?: { value: string; tone: "positive" | "negative" };
}

export function Stat({ label, value, delta }: StatProps) {
  return (
    <Card>
      <p className="text-sm text-[--muted-foreground]">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-[--foreground]">{value}</p>
      {delta && (
        <p
          className={`mt-1 text-sm ${
            delta.tone === "positive" ? "text-[--color-success]" : "text-[--color-danger]"
          }`}
        >
          {delta.value}
        </p>
      )}
    </Card>
  );
}
