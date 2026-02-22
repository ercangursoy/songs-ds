import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FilterButton } from "../FilterButton";

describe("FilterButton", () => {
  const defaultProps = {
    label: "Genre",
    isActive: false,
    isOpen: false,
    onClick: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders label", () => {
    render(<FilterButton {...defaultProps} />);
    expect(screen.getByText("Genre")).toBeInTheDocument();
  });

  it("shows activeLabel when provided", () => {
    render(
      <FilterButton {...defaultProps} activeLabel="Genre: Rock" isActive />,
    );
    expect(screen.getByText("Genre: Rock")).toBeInTheDocument();
  });

  it("calls onClick on click", async () => {
    const user = userEvent.setup();
    render(<FilterButton {...defaultProps} />);

    await user.click(screen.getByRole("button"));
    expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
  });

  it("sets aria-expanded when open", () => {
    render(<FilterButton {...defaultProps} isOpen />);
    expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "true");
  });

  it("sets data-active when active", () => {
    render(<FilterButton {...defaultProps} isActive />);
    expect(screen.getByRole("button").parentElement).toHaveAttribute(
      "data-active",
      "true",
    );
  });

  it("shows clear button when active and onClear provided", () => {
    render(<FilterButton {...defaultProps} isActive onClear={vi.fn()} />);
    expect(screen.getByLabelText("Clear Genre filter")).toBeInTheDocument();
  });

  it("does not show clear button when inactive", () => {
    render(<FilterButton {...defaultProps} onClear={vi.fn()} />);
    expect(
      screen.queryByLabelText("Clear Genre filter"),
    ).not.toBeInTheDocument();
  });

  it("clear button calls onClear without triggering onClick", async () => {
    const onClear = vi.fn();
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(
      <FilterButton
        {...defaultProps}
        isActive
        onClick={onClick}
        onClear={onClear}
      />,
    );

    await user.click(screen.getByLabelText("Clear Genre filter"));
    expect(onClear).toHaveBeenCalledTimes(1);
    expect(onClick).not.toHaveBeenCalled();
  });
});
