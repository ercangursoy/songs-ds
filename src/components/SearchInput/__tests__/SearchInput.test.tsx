import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SearchInput } from "../SearchInput";

describe("SearchInput", () => {
  const defaultProps = {
    value: "",
    onChange: vi.fn(),
    onClear: vi.fn(),
    placeholder: "Search songs",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with placeholder", () => {
    render(<SearchInput {...defaultProps} />);
    expect(screen.getByPlaceholderText("Search songs")).toBeInTheDocument();
  });

  it("calls onChange when typing", async () => {
    const user = userEvent.setup();
    render(<SearchInput {...defaultProps} />);

    await user.type(screen.getByPlaceholderText("Search songs"), "hello");
    expect(defaultProps.onChange).toHaveBeenCalledTimes(5);
    expect(defaultProps.onChange).toHaveBeenLastCalledWith("o");
  });

  it("hides clear button when value is empty", () => {
    render(<SearchInput {...defaultProps} />);
    const clearBtn = screen.getByLabelText("Clear search");
    expect(clearBtn).not.toHaveAttribute("data-visible");
  });

  it("shows clear button when value is present", () => {
    render(<SearchInput {...defaultProps} value="test" />);
    const clearBtn = screen.getByLabelText("Clear search");
    expect(clearBtn).toHaveAttribute("data-visible", "true");
  });

  it("calls onClear when clear button is clicked", async () => {
    const user = userEvent.setup();
    render(<SearchInput {...defaultProps} value="test" />);

    await user.click(screen.getByLabelText("Clear search"));
    expect(defaultProps.onClear).toHaveBeenCalledTimes(1);
  });
});
