import type { Meta, StoryObj } from "@storybook/react";
import { PortalHeader } from "./PortalHeader";

const apps = [
  { slug: "walletup", name: "WalletUp", icon: "💰" },
  { slug: "sheetup", name: "SheetUp", icon: "🎼" },
];

const meta: Meta<typeof PortalHeader> = {
  component: PortalHeader,
  title: "Layout/PortalHeader",
};
export default meta;

type Story = StoryObj<typeof PortalHeader>;

export const LoggedOut: Story = { args: { apps: [] } };
export const LoggedIn: Story = {
  args: { apps, currentSlug: "sheetup", userName: "Laci", userEmail: "laci@example.com" },
};
