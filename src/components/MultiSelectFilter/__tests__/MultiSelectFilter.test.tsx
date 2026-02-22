import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MultiSelectFilter } from "../MultiSelectFilter";

const options = ["ABBA", "Billie Eilish", "Dua Lipa", "Queen"];

describe("MultiSelectFilter", () => {
  const defaultProps = {
    label: "Artist",
    options,
    value: [] as string[],
    onChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with label", () => {
    render(<MultiSelectFilter {...defaultProps} />);
    expect(screen.getByText("Artist")).toBeInTheDocument();
  });

  it("opens dropdown on click", async () => {
    const user = userEvent.setup();
    render(<MultiSelectFilter {...defaultProps} />);

    await user.click(screen.getByRole("button", { name: /artist/i }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("renders search input when opened", async () => {
    const user = userEvent.setup();
    render(<MultiSelectFilter {...defaultProps} />);

    await user.click(screen.getByRole("button", { name: /artist/i }));
    expect(screen.getByPlaceholderText("Search Artists")).toBeInTheDocument();
  });

  it("filters options by search query", async () => {
    const user = userEvent.setup();
    render(<MultiSelectFilter {...defaultProps} />);

    await user.click(screen.getByRole("button", { name: /artist/i }));
    await user.type(screen.getByPlaceholderText("Search Artists"), "queen");

    const listbox = screen.getByRole("listbox");
    expect(within(listbox).getByText("Queen")).toBeInTheDocument();
    expect(within(listbox).queryByText("ABBA")).not.toBeInTheDocument();
  });

  it("toggles selection via row click", async () => {
    const user = userEvent.setup();
    render(<MultiSelectFilter {...defaultProps} />);

    await user.click(screen.getByRole("button", { name: /artist/i }));

    const abbaOption = screen.getByText("ABBA").closest('[role="option"]')!;
    await user.click(abbaOption);
    expect(screen.getByText("Selected (1)")).toBeInTheDocument();

    await user.click(abbaOption);
    expect(screen.getByText("Selected (0)")).toBeInTheDocument();
  });

  it("clicking checkbox adds item exactly once (no event bubbling)", async () => {
    const user = userEvent.setup();
    render(<MultiSelectFilter {...defaultProps} />);

    await user.click(screen.getByRole("button", { name: /artist/i }));

    const checkbox = screen.getByLabelText("ABBA");
    await user.click(checkbox);
    expect(screen.getByText("Selected (1)")).toBeInTheDocument();
  });

  it("Apply calls onChange with staged selection", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<MultiSelectFilter {...defaultProps} onChange={onChange} />);

    await user.click(screen.getByRole("button", { name: /artist/i }));

    const abbaOption = screen.getByText("ABBA").closest('[role="option"]')!;
    await user.click(abbaOption);
    const queenOption = screen.getByText("Queen").closest('[role="option"]')!;
    await user.click(queenOption);

    await user.click(screen.getByRole("button", { name: "Apply" }));
    expect(onChange).toHaveBeenCalledWith(["ABBA", "Queen"]);
  });

  it("Clear All resets staged selection", async () => {
    const user = userEvent.setup();
    render(<MultiSelectFilter {...defaultProps} />);

    await user.click(screen.getByRole("button", { name: /artist/i }));

    const abbaOption = screen.getByText("ABBA").closest('[role="option"]')!;
    await user.click(abbaOption);
    expect(screen.getByText("Selected (1)")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Clear All" }));
    expect(screen.getByText("Selected (0)")).toBeInTheDocument();
  });

  it("remove button removes individual item from staged", async () => {
    const user = userEvent.setup();
    render(<MultiSelectFilter {...defaultProps} />);

    await user.click(screen.getByRole("button", { name: /artist/i }));

    const abbaOption = screen.getByText("ABBA").closest('[role="option"]')!;
    await user.click(abbaOption);
    expect(screen.getByText("Selected (1)")).toBeInTheDocument();

    await user.click(screen.getByLabelText("Remove ABBA"));
    expect(screen.getByText("Selected (0)")).toBeInTheDocument();
  });

  it("shows count in active label", () => {
    render(<MultiSelectFilter {...defaultProps} value={["ABBA", "Queen"]} />);
    expect(screen.getByText("Artist (2)")).toBeInTheDocument();
  });

  it("shows clear button when active", () => {
    render(<MultiSelectFilter {...defaultProps} value={["ABBA"]} />);
    expect(screen.getByLabelText("Clear Artist filter")).toBeInTheDocument();
  });

  it("clear button calls onChange with empty array", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(
      <MultiSelectFilter
        {...defaultProps}
        value={["ABBA"]}
        onChange={onChange}
      />,
    );

    await user.click(screen.getByLabelText("Clear Artist filter"));
    expect(onChange).toHaveBeenCalledWith([]);
  });
});
