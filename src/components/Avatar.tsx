import * as RadixAvatar from "@radix-ui/react-avatar";

export interface AvatarProps {
  src?: string;
  alt: string;
  fallback: string;
}

export function Avatar({ src, alt, fallback }: AvatarProps) {
  return (
    <RadixAvatar.Root className="inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-(--radius-pill) bg-(--muted)">
      {src && <RadixAvatar.Image src={src} alt={alt} className="h-full w-full object-cover" />}
      <RadixAvatar.Fallback className="text-sm font-medium text-(--muted-foreground)">
        {fallback}
      </RadixAvatar.Fallback>
    </RadixAvatar.Root>
  );
}
