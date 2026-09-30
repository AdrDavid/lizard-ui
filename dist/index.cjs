Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
let react_jsx_runtime = require("react/jsx-runtime");
let react = require("react");
//#region src/LzButton/index.tsx
function LzButton({ variant = "primary", size = "md", loading = false, fullWidth = false, leftIcon, rightIcon, color, hoverColor, className, textColor, hoverTextColor, borderColor, hoverBorderColor, children, disabled, style, type = "button", ...props }) {
	const classes = [
		"lz-button",
		`lz-button--${variant}`,
		`lz-button--${size}`,
		fullWidth && "lz-button--full",
		className
	].filter(Boolean).join(" ");
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
		type,
		disabled: disabled || loading,
		"aria-busy": loading || void 0,
		className: classes,
		style: {
			"--lz-color-primary": color,
			"--lz-button-bg-hover": hoverColor,
			"--lz-button-color": textColor,
			"--lz-button-color-hover": hoverTextColor,
			"--lz-button-border": borderColor,
			"--lz-button-border-hover": hoverBorderColor,
			...style
		},
		...props,
		children: [
			loading ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
				className: "lz-button__spinner",
				"aria-hidden": "true"
			}) : leftIcon,
			children,
			!loading && rightIcon
		]
	});
}
//#endregion
//#region src/LzInput/index.tsx
function LzInput({ variant = "primary", size = "md", fullWidth = false, color, textColor, labelColor, borderColor, className, labelClassName, label, labelStyle, children, type = "text", style, id, hoverBorderColor, ...props }) {
	const generatedId = (0, react.useId)();
	const inputId = id ?? generatedId;
	const classes = [
		"lz-input",
		`lz-input--${variant}`,
		`lz-input--${size}`,
		fullWidth && "lz-input--full",
		className
	].filter(Boolean).join(" ");
	const colorStyles = {
		"--lz-color-primary": color,
		"--lz-input-color": textColor,
		"--lz-input-border": borderColor,
		"--lz-input-border-hover": hoverBorderColor
	};
	return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
		className: fullWidth ? "lz-field lz-field--full" : "lz-field",
		style: { "--lz-field-label-color": labelColor },
		children: [label && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("label", {
			htmlFor: inputId,
			className: ["lz-field__label", labelClassName].filter(Boolean).join(" "),
			style: labelStyle,
			children: label
		}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
			id: inputId,
			type,
			className: classes,
			style: {
				...colorStyles,
				...style
			},
			...props
		})]
	});
}
//#endregion
exports.LzButton = LzButton;
exports.LzInput = LzInput;
