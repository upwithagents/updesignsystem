import { useMemo, useState, type ReactNode } from "react";

export interface Column<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (row: T) => ReactNode;
}

export interface TableProps<T> {
  columns: Column<T>[];
  rows: T[];
}

type SortState<T> = { key: keyof T; direction: "asc" | "desc" } | null;

export function Table<T extends object>({ columns, rows }: TableProps<T>) {
  const [sort, setSort] = useState<SortState<T>>(null);

  const sortedRows = useMemo(() => {
    if (!sort) return rows;
    const { key, direction } = sort;
    return [...rows].sort((a, b) => {
      const av = a[key];
      const bv = b[key];
      const cmp = av < bv ? -1 : av > bv ? 1 : 0;
      return direction === "asc" ? cmp : -cmp;
    });
  }, [rows, sort]);

  function toggleSort(key: keyof T) {
    setSort((prev) => {
      if (!prev || prev.key !== key) return { key, direction: "asc" };
      if (prev.direction === "asc") return { key, direction: "desc" };
      return null;
    });
  }

  return (
    <table className="w-full border-collapse text-sm">
      <thead>
        <tr className="border-b border-(--border) text-left text-(--muted-foreground)">
          {columns.map((col) => (
            <th
              key={String(col.key)}
              className={`px-3 py-2 font-medium ${col.sortable ? "cursor-pointer select-none" : ""}`}
              onClick={col.sortable ? () => toggleSort(col.key) : undefined}
            >
              {col.label}
              {sort?.key === col.key ? (sort.direction === "asc" ? " ▲" : " ▼") : ""}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedRows.map((row, i) => (
          <tr key={i} className="border-b border-(--border) text-(--foreground)">
            {columns.map((col) => (
              <td key={String(col.key)} className="px-3 py-2">
                {col.render ? col.render(row) : String(row[col.key])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
