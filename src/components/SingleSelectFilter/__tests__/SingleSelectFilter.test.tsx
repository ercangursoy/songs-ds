import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SingleSelectFilter } from "../SingleSelectFilter";

const options = ["Rock", "Pop", "Hip-Hop"];

describe("SingleSelectFilter", () => {
  it("renders with label", () => {
    render(
      <SingleSelectFilter
        label="Genre"
        options={options}
        value={null}
        onChange={vi.fn()}
      />,
    );
    expect(screen.getByText("Genre")).toBeInTheDocument();
  });

  it("opens dropdown on click", async () => {
    const user = userEvent.setup();
    render(
      <SingleSelectFilter
        label="Genre"
        options={options}
        value={null}
        onChange={vi.fn()}
      />,
    );

    await user.click(screen.getByRole("button", { name: /genre/i }));
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    expect(screen.getByText("Rock")).toBeInTheDocument();
    expect(screen.getByText("Pop")).toBeInTheDocument();
    expect(screen.getByText("Hip-Hop")).toBeInTheDocument();
  });

  it("selects an option and calls onChange", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(
      <SingleSelectFilter
        label="Genre"
        options={options}
        value={null}
        onChange={onChange}
      />,
    );

    await user.click(screen.getByRole("button", { name: /genre/i }));
    await user.click(screen.getByText("Rock"));
    expect(onChange).toHaveBeenCalledWith("Rock");
  });

  it("deselects on re-click (toggles to null)", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(
      <SingleSelectFilter
        label="Genre"
        options={options}
        value="Rock"
        onChange={onChange}
      />,
    );

    await user.click(screen.getByRole("button", { expanded: false }));
    await user.click(screen.getByRole("option", { name: "Rock" }));
    expect(onChange).toHaveBeenCalledWith(null);
  });

  it("shows active label when value is set", () => {
    render(
      <SingleSelectFilter
        label="Genre"
        options={options}
        value="Rock"
        onChange={vi.fn()}
      />,
    );
    expect(screen.getByText(/Genre:/)).toBeInTheDocument();
    expect(screen.getByText("Rock")).toBeInTheDocument();
  });

  it("shows clear button when active", () => {
    render(
      <SingleSelectFilter
        label="Genre"
        options={options}
        value="Rock"
        onChange={vi.fn()}
      />,
    );
    expect(screen.getByLabelText("Clear Genre filter")).toBeInTheDocument();
  });

  it("clears filter via clear button", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(
      <SingleSelectFilter
        label="Genre"
        options={options}
        value="Rock"
        onChange={onChange}
      />,
    );

    await user.click(screen.getByLabelText("Clear Genre filter"));
    expect(onChange).toHaveBeenCalledWith(null);
  });
});
