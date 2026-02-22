import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DataTable } from "../DataTable";
import type { Column, SortConfig } from "@/types";

interface TestRow {
  name: string;
  age: string;
}

const columns: Column<TestRow>[] = [
  { key: "name", label: "Name", sortable: true, width: "50%" },
  { key: "age", label: "Age", sortable: false, width: "50%" },
];

const data: TestRow[] = [
  { name: "Alice", age: "30" },
  { name: "Bob", age: "25" },
  { name: "Charlie", age: "35" },
];

const sortConfig: SortConfig<TestRow> = { key: "name", direction: "asc" };

describe("DataTable", () => {
  it("renders correct number of rows", () => {
    render(
      <DataTable
        data={data}
        columns={columns}
        sortConfig={sortConfig}
        onSort={vi.fn()}
        rowKey={(r) => r.name}
      />,
    );
    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(4); // 1 header + 3 body
  });

  it("renders column headers", () => {
    render(
      <DataTable
        data={data}
        columns={columns}
        sortConfig={sortConfig}
        onSort={vi.fn()}
        rowKey={(r) => r.name}
      />,
    );
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Age")).toBeInTheDocument();
  });

  it("renders cell data", () => {
    render(
      <DataTable
        data={data}
        columns={columns}
        sortConfig={sortConfig}
        onSort={vi.fn()}
        rowKey={(r) => r.name}
      />,
    );
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("30")).toBeInTheDocument();
  });

  it("calls onSort when sortable header is clicked", async () => {
    const onSort = vi.fn();
    const user = userEvent.setup();
    render(
      <DataTable
        data={data}
        columns={columns}
        sortConfig={sortConfig}
        onSort={onSort}
        rowKey={(r) => r.name}
      />,
    );

    await user.click(screen.getByText("Name"));
    expect(onSort).toHaveBeenCalledWith("name");
  });

  it("does not call onSort when non-sortable header is clicked", async () => {
    const onSort = vi.fn();
    const user = userEvent.setup();
    render(
      <DataTable
        data={data}
        columns={columns}
        sortConfig={sortConfig}
        onSort={onSort}
        rowKey={(r) => r.name}
      />,
    );

    await user.click(screen.getByText("Age"));
    expect(onSort).not.toHaveBeenCalled();
  });

  it("shows aria-sort on active sorted column", () => {
    render(
      <DataTable
        data={data}
        columns={columns}
        sortConfig={sortConfig}
        onSort={vi.fn()}
        rowKey={(r) => r.name}
      />,
    );
    expect(screen.getByText("Name").closest("th")).toHaveAttribute(
      "aria-sort",
      "ascending",
    );
  });

  it("does not show aria-sort on non-sorted column", () => {
    render(
      <DataTable
        data={data}
        columns={columns}
        sortConfig={sortConfig}
        onSort={vi.fn()}
        rowKey={(r) => r.name}
      />,
    );
    expect(screen.getByText("Age").closest("th")).not.toHaveAttribute(
      "aria-sort",
    );
  });
});
