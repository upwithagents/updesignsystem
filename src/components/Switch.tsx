import * as RadixSwitch from "@radix-ui/react-switch";

export interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label: string;
  id?: string;
}

export function Switch({ checked, onCheckedChange, label, id }: SwitchProps) {
  const inputId = id ?? `switch-${label.replace(/\s+/g, "-").toLowerCase()}`;
  return (
    <label htmlFor={inputId} className="inline-flex items-center gap-2 text-sm text-[--foreground]">
      <RadixSwitch.Root
        id={inputId}
        checked={checked}
        onCheckedChange={onCheckedChange}
        className="h-5 w-9 rounded-[--radius-pill] bg-[--muted] data-[state=checked]:bg-[--color-accent] relative transition-colors"
      >
        <RadixSwitch.Thumb className="block h-4 w-4 translate-x-0.5 rounded-[--radius-pill] bg-[--background] transition-transform data-[state=checked]:translate-x-4" />
      </RadixSwitch.Root>
      {label}
    </label>
  );
}
