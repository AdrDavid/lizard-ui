import { useId, ComponentProps, CSSProperties, ReactNode } from 'react'

export type lzInputProps = Omit<ComponentProps<"input">, "size"> & {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  color?: string;
  textColor?: string;
  labelColor?: string;
  borderColor?: string;
  labelClassName?: string;
  labelStyle?: CSSProperties;
  hoverBorderColor?: string;
  label?: string;
}

export function LzInput({
  variant = "primary",
  size = "md",
  fullWidth = false,
  color,
  textColor,
  labelColor,
  borderColor,
  className,
  labelClassName,
  label,
  labelStyle,
  children,
  type = "text",
  style,
  id,
  hoverBorderColor,
  ...props
}: lzInputProps) {

  const generatedId = useId();
  const inputId = id ?? generatedId;

  const classes = [
    "lz-input",
    `lz-input--${variant}`,
    `lz-input--${size}`,
    fullWidth && "lz-input--full",
    className,
  ].filter(Boolean).join(" ")


  const colorStyles = {
    "--lz-color-primary": color,
    "--lz-input-color": textColor,
    "--lz-input-border": borderColor,
    "--lz-input-border-hover": hoverBorderColor,
  } as CSSProperties

  const fieldStyles = {
    "--lz-field-label-color": labelColor,

  } as CSSProperties

  return (
    <div className={fullWidth ? "lz-field lz-field--full" : "lz-field"}
    style={fieldStyles}>
      {label && (
        <label htmlFor={inputId} className={["lz-field__label", labelClassName].filter(Boolean).join(" ")}
        style={labelStyle}>
          {label}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        className={classes}
        style={{ ...colorStyles, ...style }}
        {...props}
      />
    </div>
  )
}
