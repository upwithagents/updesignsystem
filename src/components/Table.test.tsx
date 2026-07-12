import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { Table } from "./Table";

interface Row {
  name: string;
  amount: number;
}

const rows: Row[] = [
  { name: "Groceries", amount: 42 },
  { name: "Rent", amount: 1200 },
  { name: "Coffee", amount: 5 },
];

describe("Table", () => {
  it("renders rows in the given order by default", () => {
    render(
      <Table<Row>
        columns={[
          { key: "name", label: "Name" },
          { key: "amount", label: "Amount", sortable: true },
        ]}
        rows={rows}
      />
    );
    const cells = screen.getAllByRole("row").slice(1).map((r) => within(r).getAllByRole("cell")[0].textContent);
    expect(cells).toEqual(["Groceries", "Rent", "Coffee"]);
  });

  it("sorts ascending then descending when a sortable header is clicked", () => {
    render(
      <Table<Row>
        columns={[
          { key: "name", label: "Name" },
          { key: "amount", label: "Amount", sortable: true },
        ]}
        rows={rows}
      />
    );
    fireEvent.click(screen.getByRole("columnheader", { name: /amount/i }));
    let cells = screen.getAllByRole("row").slice(1).map((r) => within(r).getAllByRole("cell")[0].textContent);
    expect(cells).toEqual(["Coffee", "Groceries", "Rent"]);

    fireEvent.click(screen.getByRole("columnheader", { name: /amount/i }));
    cells = screen.getAllByRole("row").slice(1).map((r) => within(r).getAllByRole("cell")[0].textContent);
    expect(cells).toEqual(["Rent", "Groceries", "Coffee"]);
  });
});
