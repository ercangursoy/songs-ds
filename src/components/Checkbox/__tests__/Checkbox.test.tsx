import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Checkbox } from "../Checkbox";

describe("Checkbox", () => {
  it("renders unchecked by default", () => {
    render(<Checkbox checked={false} onChange={vi.fn()} />);
    expect(screen.getByRole("checkbox")).toHaveAttribute(
      "aria-checked",
      "false",
    );
  });

  it("renders checked state", () => {
    render(<Checkbox checked={true} onChange={vi.fn()} />);
    expect(screen.getByRole("checkbox")).toHaveAttribute(
      "aria-checked",
      "true",
    );
  });

  it("calls onChange(true) when clicking unchecked", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Checkbox checked={false} onChange={onChange} />);

    await user.click(screen.getByRole("checkbox"));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("calls onChange(false) when clicking checked", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Checkbox checked={true} onChange={onChange} />);

    await user.click(screen.getByRole("checkbox"));
    expect(onChange).toHaveBeenCalledWith(false);
  });

  it("passes ariaLabel", () => {
    render(
      <Checkbox checked={false} onChange={vi.fn()} ariaLabel="Select item" />,
    );
    expect(screen.getByLabelText("Select item")).toBeInTheDocument();
  });
});
