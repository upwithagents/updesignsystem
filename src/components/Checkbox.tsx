import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "./icons/CheckIcon";

export interface CheckboxProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label: string;
  id?: string;
}

export function Checkbox({ checked, onCheckedChange, label, id }: CheckboxProps) {
  const inputId = id ?? `checkbox-${label.replace(/\s+/g, "-").toLowerCase()}`;
  return (
    <label htmlFor={inputId} className="inline-flex items-center gap-2 text-sm text-[--foreground]">
      <RadixCheckbox.Root
        id={inputId}
        checked={checked}
        onCheckedChange={(v) => onCheckedChange(v === true)}
        className="h-4 w-4 rounded-[--radius-md] border border-[--border] bg-[--background] data-[state=checked]:bg-[--color-accent] data-[state=checked]:border-[--color-accent] flex items-center justify-center"
      >
        <RadixCheckbox.Indicator>
          <CheckIcon className="h-3 w-3 text-[--color-accent-foreground]" />
        </RadixCheckbox.Indicator>
      </RadixCheckbox.Root>
      {label}
    </label>
  );
}
