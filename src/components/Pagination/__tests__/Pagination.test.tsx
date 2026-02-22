import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Pagination } from "../Pagination";

describe("Pagination", () => {
  it("shows page info", () => {
    render(
      <Pagination currentPage={2} totalPages={5} onPageChange={vi.fn()} />,
    );
    expect(screen.getByText("2 of 5")).toBeInTheDocument();
  });

  it("disables previous button on first page", () => {
    render(
      <Pagination currentPage={1} totalPages={3} onPageChange={vi.fn()} />,
    );
    expect(screen.getByLabelText("Previous page")).toBeDisabled();
  });

  it("disables next button on last page", () => {
    render(
      <Pagination currentPage={3} totalPages={3} onPageChange={vi.fn()} />,
    );
    expect(screen.getByLabelText("Next page")).toBeDisabled();
  });

  it("enables both buttons on middle page", () => {
    render(
      <Pagination currentPage={2} totalPages={3} onPageChange={vi.fn()} />,
    );
    expect(screen.getByLabelText("Previous page")).not.toBeDisabled();
    expect(screen.getByLabelText("Next page")).not.toBeDisabled();
  });

  it("calls onPageChange with previous page", async () => {
    const onPageChange = vi.fn();
    const user = userEvent.setup();
    render(
      <Pagination currentPage={2} totalPages={3} onPageChange={onPageChange} />,
    );

    await user.click(screen.getByLabelText("Previous page"));
    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  it("calls onPageChange with next page", async () => {
    const onPageChange = vi.fn();
    const user = userEvent.setup();
    render(
      <Pagination currentPage={2} totalPages={3} onPageChange={onPageChange} />,
    );

    await user.click(screen.getByLabelText("Next page"));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });
});
