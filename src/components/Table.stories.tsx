import type { Meta, StoryObj } from "@storybook/react";
import { Table } from "./Table";

interface Row {
  name: string;
  amount: number;
}

const meta: Meta<typeof Table<Row>> = { component: Table, title: "Data/Table" };
export default meta;
type Story = StoryObj<typeof Table<Row>>;

export const Default: Story = {
  args: {
    columns: [
      { key: "name", label: "Name" },
      { key: "amount", label: "Amount", sortable: true },
    ],
    rows: [
      { name: "Groceries", amount: 42 },
      { name: "Rent", amount: 1200 },
      { name: "Coffee", amount: 5 },
    ],
  },
};
