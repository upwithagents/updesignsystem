import * as RadixToast from "@radix-ui/react-toast";
import { createContext, useCallback, useContext, useState, type ReactNode } from "react";

interface ToastMessage {
  id: number;
  title: string;
  description?: string;
}

interface ToastContextValue {
  showToast: (title: string, description?: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const showToast = useCallback((title: string, description?: string) => {
    setMessages((prev) => [...prev, { id: Date.now(), title, description }]);
  }, []);

  const dismiss = useCallback((id: number) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      <RadixToast.Provider swipeDirection="right">
        {children}
        {messages.map((m) => (
          <RadixToast.Root
            key={m.id}
            duration={4000}
            onOpenChange={(open) => !open && dismiss(m.id)}
            className="rounded-[--radius-md] border border-[--border] bg-[--background] p-4 shadow-lg"
          >
            <RadixToast.Title className="text-sm font-medium text-[--foreground]">
              {m.title}
            </RadixToast.Title>
            {m.description && (
              <RadixToast.Description className="text-sm text-[--muted-foreground]">
                {m.description}
              </RadixToast.Description>
            )}
          </RadixToast.Root>
        ))}
        <RadixToast.Viewport className="fixed bottom-4 right-4 flex flex-col gap-2" />
      </RadixToast.Provider>
    </ToastContext.Provider>
  );
}
