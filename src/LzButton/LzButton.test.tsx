import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LzButton } from ".";

describe("LzButton", () => {
  it("renders the text", () => {
    render(<LzButton>Salvar</LzButton>);
    expect(screen.getByRole("button", { name: "Salvar" })).toBeInTheDocument();
  });

  it("uses type button by default", () => {
    render(<LzButton>Salvar</LzButton>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
  });

  it("accepts type submit", () => {
    render(<LzButton type="submit">Enviar</LzButton>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
  });

  it("applies the default classes", () => {
    render(<LzButton>Salvar</LzButton>);
    expect(screen.getByRole("button")).toHaveClass("lz-button", "lz-button--primary", "lz-button--md");
  });

  it("applies variant and size classes", () => {
    render(<LzButton variant="outline" size="lg">Salvar</LzButton>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("lz-button--outline", "lz-button--lg");
    expect(button).not.toHaveClass("lz-button--primary", "lz-button--md");
  });

  it("applies the full width class", () => {
    render(<LzButton fullWidth>Salvar</LzButton>);
    expect(screen.getByRole("button")).toHaveClass("lz-button--full");
  });

  it("keeps the lib classes when className is passed", () => {
    render(<LzButton className="minha-classe">Salvar</LzButton>);
    expect(screen.getByRole("button")).toHaveClass("lz-button", "minha-classe");
  });

  it("does not add empty classes", () => {
    render(<LzButton>Salvar</LzButton>);
    const className = screen.getByRole("button").className;
    expect(className).not.toContain("false");
    expect(className).not.toContain("undefined");
  });

  it("calls onClick when clicked", async () => {
    const onClick = vi.fn();
    render(<LzButton onClick={onClick}>Salvar</LzButton>);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when disabled", async () => {
    const onClick = vi.fn();
    render(<LzButton disabled onClick={onClick}>Salvar</LzButton>);
    await userEvent.click(screen.getByRole("button"));
    expect(onClick).not.toHaveBeenCalled();
  });

  describe("loading", () => {
    it("disables the button and sets aria-busy", () => {
      render(<LzButton loading>Salvar</LzButton>);
      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute("aria-busy", "true");
    });

    it("does not call onClick", async () => {
      const onClick = vi.fn();
      render(<LzButton loading onClick={onClick}>Salvar</LzButton>);
      await userEvent.click(screen.getByRole("button"));
      expect(onClick).not.toHaveBeenCalled();
    });

    it("shows the spinner in place of the icons", () => {
      render(
        <LzButton loading leftIcon={<span>esquerda</span>} rightIcon={<span>direita</span>}>
          Salvar
        </LzButton>
      );
      const button = screen.getByRole("button");
      expect(button.querySelector(".lz-button__spinner")).toBeInTheDocument();
      expect(screen.queryByText("esquerda")).not.toBeInTheDocument();
      expect(screen.queryByText("direita")).not.toBeInTheDocument();
      expect(button).toHaveTextContent("Salvar");
    });

    it("does not set aria-busy when not loading", () => {
      render(<LzButton>Salvar</LzButton>);
      expect(screen.getByRole("button")).not.toHaveAttribute("aria-busy");
    });
  });

  it("renders the icons", () => {
    render(
      <LzButton leftIcon={<span>esquerda</span>} rightIcon={<span>direita</span>}>
        Salvar
      </LzButton>
    );
    expect(screen.getByText("esquerda")).toBeInTheDocument();
    expect(screen.getByText("direita")).toBeInTheDocument();
  });

  it("turns the color props into CSS variables", () => {
    render(
      <LzButton
        color="#16a34a"
        hoverColor="#14532d"
        textColor="#fff"
        hoverTextColor="#000"
        borderColor="#111"
        hoverBorderColor="#222"
      >
        Salvar
      </LzButton>
    );
    const style = screen.getByRole("button").style;
    expect(style.getPropertyValue("--lz-color-primary")).toBe("#16a34a");
    expect(style.getPropertyValue("--lz-button-bg-hover")).toBe("#14532d");
    expect(style.getPropertyValue("--lz-button-color")).toBe("#fff");
    expect(style.getPropertyValue("--lz-button-color-hover")).toBe("#000");
    expect(style.getPropertyValue("--lz-button-border")).toBe("#111");
    expect(style.getPropertyValue("--lz-button-border-hover")).toBe("#222");
  });

  it("does not set variables for props that were not passed", () => {
    render(<LzButton>Salvar</LzButton>);
    expect(screen.getByRole("button").style.getPropertyValue("--lz-color-primary")).toBe("");
  });

  it("merges style with the color props", () => {
    render(<LzButton color="#16a34a" style={{ borderRadius: 999 }}>Salvar</LzButton>);
    const style = screen.getByRole("button").style;
    expect(style.getPropertyValue("--lz-color-primary")).toBe("#16a34a");
    expect(style.borderRadius).toBe("999px");
  });

  it("passes native props to the button", () => {
    render(<LzButton aria-label="salvar veículo" name="acao" value="salvar">Salvar</LzButton>);
    const button = screen.getByRole("button", { name: "salvar veículo" });
    expect(button).toHaveAttribute("name", "acao");
    expect(button).toHaveAttribute("value", "salvar");
  });

  it("does not pass the lib props to the HTML", () => {
    render(<LzButton color="#16a34a" hoverColor="#000" textColor="#fff">Salvar</LzButton>);
    const button = screen.getByRole("button");
    expect(button).not.toHaveAttribute("color");
    expect(button).not.toHaveAttribute("hovercolor");
    expect(button).not.toHaveAttribute("textcolor");
  });
});