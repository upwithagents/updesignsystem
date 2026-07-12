import * as RadixDialog from "@radix-ui/react-dialog";
import type { ReactNode } from "react";

export interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: ReactNode;
  trigger?: ReactNode;
}

export function Dialog({ open, onOpenChange, title, children, trigger }: DialogProps) {
  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
      {trigger && <RadixDialog.Trigger asChild>{trigger}</RadixDialog.Trigger>}
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="fixed inset-0 bg-black/40" />
        <RadixDialog.Content className="fixed left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-[--radius-lg] border border-[--border] bg-[--background] p-6">
          <RadixDialog.Title className="text-base font-semibold text-[--foreground]">
            {title}
          </RadixDialog.Title>
          <div className="mt-3 text-sm text-[--foreground]">{children}</div>
          <RadixDialog.Close asChild>
            <button
              aria-label="Close"
              className="absolute right-4 top-4 text-[--muted-foreground] hover:text-[--foreground]"
            >
              ✕
            </button>
          </RadixDialog.Close>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
}
