import { CSSProperties, ComponentProps, ReactNode } from "react";
//#region src/LzButton/index.d.ts
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
};
export declare function LzButton({ variant, size, loading, fullWidth, leftIcon, rightIcon, color, hoverColor, className, textColor, hoverTextColor, borderColor, hoverBorderColor, children, disabled, style, type, ...props }: lzButtonProps): import("react").JSX.Element;
//#endregion
//#region src/LzInput/index.d.ts
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
};
export declare function LzInput({ variant, size, fullWidth, color, textColor, labelColor, borderColor, className, labelClassName, label, labelStyle, children, type, style, id, hoverBorderColor, ...props }: lzInputProps): import("react").JSX.Element;
//#endregion