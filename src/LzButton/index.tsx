import { ComponentProps, CSSProperties, ReactNode } from 'react'

export type lzButtonProps = ComponentProps<"button"> & {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  color?: string;
  hoverColor?: string;
  textColor?: string;
  hoverTextColor?: string;
  borderColor?: string;
  hoverBorderColor?: string;
}

export function LzButton(
  {
    variant = "primary",
    size = "md",
    loading = false,
    fullWidth = false,
    leftIcon,
    rightIcon,
    color,
    hoverColor,
    className,
    textColor,
    hoverTextColor,
    borderColor,
    hoverBorderColor,
    children,
    disabled,
    style,
    type = "button",
    ...props
  }: lzButtonProps
) {

  const classes = [
    "lz-button",
    `lz-button--${variant}`,
    `lz-button--${size}`,
    fullWidth && "lz-button--full",
    className,
  ].filter(Boolean).join(" ");

  const colorStyles = {
    "--lz-color-primary": color,
    "--lz-button-bg-hover": hoverColor,
    "--lz-button-color": textColor,
    "--lz-button-color-hover": hoverTextColor,
    "--lz-button-border": borderColor,
    "--lz-button-border-hover": hoverBorderColor,
  } as CSSProperties;

  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={classes}
      style={{ ...colorStyles, ...style }}
      {...props}
    >

      {loading ? <span className='lz-button__spinner' aria-hidden="true" /> : leftIcon}
      {children}
      {!loading && rightIcon}

    </button>
  )
}
