import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  component: Button,
  title: "Primitives/Button",
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = { args: { children: "Save changes", variant: "primary" } };
export const Secondary: Story = { args: { children: "Cancel", variant: "secondary" } };
export const Ghost: Story = { args: { children: "Dismiss", variant: "ghost" } };
