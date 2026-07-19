import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = { component: Badge, title: "Primitives/Badge" };
export default meta;
type Story = StoryObj<typeof Badge>;
export const Accent: Story = { args: { children: "New", tone: "accent" } };
export const Success: Story = { args: { children: "Paid", tone: "success" } };
export const Danger: Story = { args: { children: "Overdue", tone: "danger" } };
export const Warning: Story = { args: { children: "Pending", tone: "warning" } };
export const Steel: Story = { args: { children: "Archived", tone: "steel" } };
