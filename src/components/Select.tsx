import * as RadixSelect from "@radix-ui/react-select";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
}

export function Select({ options, value, onValueChange, placeholder = "Select..." }: SelectProps) {
  return (
    <RadixSelect.Root value={value} onValueChange={onValueChange}>
      <RadixSelect.Trigger className="flex h-10 w-full items-center justify-between rounded-(--radius-md) border border-(--border) bg-(--background) px-3 text-sm text-(--foreground) focus:outline-none focus:ring-2 focus:ring-(--color-accent)">
        <RadixSelect.Value placeholder={placeholder} />
      </RadixSelect.Trigger>
      <RadixSelect.Portal>
        <RadixSelect.Content className="overflow-hidden rounded-(--radius-md) border border-(--border) bg-(--background) shadow-lg">
          <RadixSelect.Viewport className="p-1">
            {options.map((opt) => (
              <RadixSelect.Item
                key={opt.value}
                value={opt.value}
                className="cursor-pointer rounded-(--radius-md) px-3 py-2 text-sm text-(--foreground) outline-none data-[highlighted]:bg-(--muted)"
              >
                <RadixSelect.ItemText>{opt.label}</RadixSelect.ItemText>
              </RadixSelect.Item>
            ))}
          </RadixSelect.Viewport>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
}
