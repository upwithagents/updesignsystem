import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Dialog } from "./Dialog";
import { Button } from "./Button";

const meta: Meta<typeof Dialog> = { component: Dialog, title: "Overlays/Dialog" };
export default meta;
type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="Delete item?"
        trigger={<Button onClick={() => setOpen(true)}>Open dialog</Button>}
      >
        This can't be undone.
      </Dialog>
    );
  },
};
