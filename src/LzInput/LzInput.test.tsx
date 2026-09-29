import { describe, it, expect, vi } from "vitest";
import { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LzInput } from ".";

describe("LzInput", () => {
  it("links the label to the input", () => {
    render(<LzInput label="Nome" />);
    expect(screen.getByLabelText("Nome")).toBeInstanceOf(HTMLInputElement);
  });

  it("does not render a label when none is passed", () => {
    const { container } = render(<LzInput placeholder="Nome" />);
    expect(container.querySelector("label")).not.toBeInTheDocument();
  });

  it("clicking the label focuses the input", async () => {
    render(<LzInput label="Nome" />);
    await userEvent.click(screen.getByText("Nome"));
    expect(screen.getByLabelText("Nome")).toHaveFocus();
  });

  it("generates a different id for each input", () => {
    render(
      <>
        <LzInput label="Nome" />
        <LzInput label="Nome" />
      </>
    );
    const [first, second] = screen.getAllByLabelText("Nome");
    expect(first.id).not.toBe("");
    expect(first.id).not.toBe(second.id);
  });

  it("uses the id passed as prop", () => {
    render(<LzInput label="CPF" id="cpf" />);
    expect(screen.getByLabelText("CPF")).toHaveAttribute("id", "cpf");
  });

  it("uses type text by default", () => {
    render(<LzInput label="Nome" />);
    expect(screen.getByLabelText("Nome")).toHaveAttribute("type", "text");
  });

  it("accepts other types", () => {
    render(<LzInput label="E-mail" type="email" />);
    expect(screen.getByLabelText("E-mail")).toHaveAttribute("type", "email");
  });

  it("applies the default classes", () => {
    render(<LzInput label="Nome" />);
    expect(screen.getByLabelText("Nome")).toHaveClass("lz-input", "lz-input--primary", "lz-input--md");
  });

  it("applies variant and size classes", () => {
    render(<LzInput label="Nome" variant="ghost" size="sm" />);
    const input = screen.getByLabelText("Nome");
    expect(input).toHaveClass("lz-input--ghost", "lz-input--sm");
    expect(input).not.toHaveClass("lz-input--primary", "lz-input--md");
  });

  it("applies full width on the input and on the field", () => {
    render(<LzInput label="Nome" fullWidth />);
    const input = screen.getByLabelText("Nome");
    expect(input).toHaveClass("lz-input--full");
    expect(input.parentElement).toHaveClass("lz-field", "lz-field--full");
  });

  it("keeps the lib classes when className is passed", () => {
    render(<LzInput label="Nome" className="minha-classe" />);
    expect(screen.getByLabelText("Nome")).toHaveClass("lz-input", "minha-classe");
  });

  it("calls onChange while typing", async () => {
    const onChange = vi.fn();
    render(<LzInput label="Nome" onChange={onChange} />);
    await userEvent.type(screen.getByLabelText("Nome"), "abc");
    expect(onChange).toHaveBeenCalledTimes(3);
  });

  it("works as a controlled input", async () => {
    function Controlled() {
      const [value, setValue] = useState("");
      return (
        <>
          <LzInput label="Nome" value={value} onChange={(e) => setValue(e.target.value)} />
          <span data-testid="valor">{value}</span>
        </>
      );
    }

    render(<Controlled />);
    await userEvent.type(screen.getByLabelText("Nome"), "David");
    expect(screen.getByLabelText("Nome")).toHaveValue("David");
    expect(screen.getByTestId("valor")).toHaveTextContent("David");
  });

  it("passes native props to the input", () => {
    render(<LzInput label="Nome" placeholder="Digite" maxLength={10} name="nome" required />);
    const input = screen.getByLabelText("Nome");
    expect(input).toHaveAttribute("placeholder", "Digite");
    expect(input).toHaveAttribute("maxlength", "10");
    expect(input).toHaveAttribute("name", "nome");
    expect(input).toBeRequired();
  });

  it("does not accept typing when disabled", async () => {
    render(<LzInput label="Nome" disabled />);
    const input = screen.getByLabelText("Nome");
    expect(input).toBeDisabled();
    await userEvent.type(input, "abc");
    expect(input).toHaveValue("");
  });

  it("turns the color props into CSS variables", () => {
    render(
      <LzInput
        label="Nome"
        color="#16a34a"
        textColor="#111"
        borderColor="#ccc"
        hoverBorderColor="#999"
      />
    );
    const style = screen.getByLabelText("Nome").style;
    expect(style.getPropertyValue("--lz-color-primary")).toBe("#16a34a");
    expect(style.getPropertyValue("--lz-input-color")).toBe("#111");
    expect(style.getPropertyValue("--lz-input-border")).toBe("#ccc");
    expect(style.getPropertyValue("--lz-input-border-hover")).toBe("#999");
  });

  it("merges style with the color props", () => {
    render(<LzInput label="Nome" color="#16a34a" style={{ width: 200 }} />);
    const style = screen.getByLabelText("Nome").style;
    expect(style.getPropertyValue("--lz-color-primary")).toBe("#16a34a");
    expect(style.width).toBe("200px");
  });

  describe("label customization", () => {
    it("sets the label color variable on the field", () => {
      render(<LzInput label="Nome" labelColor="#16a34a" />);
      const field = screen.getByLabelText("Nome").parentElement!;
      expect(field.style.getPropertyValue("--lz-field-label-color")).toBe("#16a34a");
    });

    it("applies labelClassName keeping the lib class", () => {
      render(<LzInput label="Nome" labelClassName="label-grande" />);
      expect(screen.getByText("Nome")).toHaveClass("lz-field__label", "label-grande");
    });

    it("applies labelStyle", () => {
      render(<LzInput label="Nome" labelStyle={{ fontSize: 18, fontWeight: 700 }} />);
      const label = screen.getByText("Nome");
      expect(label.style.fontSize).toBe("18px");
      expect(label.style.fontWeight).toBe("700");
    });
  });

  it("does not pass the lib props to the HTML", () => {
    render(<LzInput label="Nome" labelColor="#000" borderColor="#ccc" />);
    const input = screen.getByLabelText("Nome");
    expect(input).not.toHaveAttribute("labelcolor");
    expect(input).not.toHaveAttribute("bordercolor");
    expect(input).not.toHaveAttribute("label");
  });
});