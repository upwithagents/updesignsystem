import type { Meta, StoryObj } from "@storybook/react";
import { Ascent } from "./Ascent";

const meta: Meta<typeof Ascent> = {
  component: Ascent,
  title: "Primitives/Ascent",
  decorators: [
    (Story) => (
      <div style={{ width: 500, height: 320 }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof Ascent>;

export const Static: Story = { args: { motion: false } };
export const Motion: Story = { args: { motion: true } };
