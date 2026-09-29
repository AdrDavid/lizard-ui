# lizard-ui

React components styled with plain CSS, customizable through props, `className`, `style` and CSS variables.

No runtime dependencies. Works with or without Tailwind.

## Installation

Latest version (what's on the `main` branch at install time):

```bash
npm install github:AdrDavid/lizard-ui
```

Specific version:

```bash
npm install github:AdrDavid/lizard-ui#v0.1.0
```

Replace `v0.1.0` with the tag you want. The available versions are listed in the repository's tags.

The installed commit is saved in `package-lock.json`, so a plain `npm install` keeps the same version. To update, run the install command again.

Requires React 18 or later in the project.

## Setup

Import the styles once, in your app's entry file (e.g. `main.tsx`):

```tsx
import "lizard-ui/styles.css";
```

If the project uses Tailwind, import it after Tailwind's CSS.

## Usage

### Basic

```tsx
import { LzButton, LzInput } from "lizard-ui";

export function Example() {
  return (
    <>
      <LzInput label="Name" placeholder="Type your name" />
      <LzButton onClick={() => alert("Clicked")}>Save</LzButton>
    </>
  );
}
```

### Controlled input

The input doesn't keep any state of its own. Use `value` and `onChange` the same way you would with a native `<input>`:

```tsx
import { useState } from "react";
import { LzInput } from "lizard-ui";

export function NameField() {
  const [name, setName] = useState("");

  return (
    <LzInput
      label="Name"
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
  );
}
```

### Form with submit

Buttons are `type="button"` by default. Pass `type="submit"` to the one that submits the form:

```tsx
import { useState, type FormEvent } from "react";
import { LzButton, LzInput } from "lizard-ui";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    console.log({ email, password });
  }

  return (
    <form onSubmit={handleSubmit}>
      <LzInput
        label="E-mail"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        fullWidth
      />
      <LzInput
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        fullWidth
      />
      <LzButton type="button" variant="ghost">Forgot password</LzButton>
      <LzButton type="submit" fullWidth>Sign in</LzButton>
    </form>
  );
}
```

Pressing Enter inside an input also submits the form, and native validations like `required` and `type="email"` work as usual.

### Loading state

Control `loading` with a state while an async action runs. The button is disabled during that time, so it can't be clicked twice:

```tsx
import { useState } from "react";
import { LzButton } from "lizard-ui";

export function SaveButton() {
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);
    try {
      await fetch("/api/vehicles", { method: "POST" });
    } finally {
      setSaving(false);
    }
  }

  return (
    <LzButton loading={saving} onClick={save}>
      {saving ? "Saving..." : "Save"}
    </LzButton>
  );
}
```

The `finally` makes sure the button goes back to normal even if the request fails.

### Icons

`leftIcon` and `rightIcon` accept any React element. Icons that use `currentColor` (like most icon libraries) follow the button's text color:

```tsx
import { Plus, ArrowRight } from "lucide-react";

<LzButton leftIcon={<Plus size={16} />}>New vehicle</LzButton>
<LzButton variant="outline" rightIcon={<ArrowRight size={16} />}>Next</LzButton>
```

While `loading` is `true`, the spinner replaces `leftIcon` and `rightIcon` is hidden.

### Input masks with lizard-utils

Combine `LzInput` with the formatters from [lizard-utils](https://github.com/AdrDavid/lizard-utils) to mask values while the user types, and `onlyNumbers` to send them clean to the API:

```tsx
import { useState } from "react";
import { LzInput } from "lizard-ui";
import { formatCPF, formatPhone, onlyNumbers } from "lizard-utils";

export function PersonForm() {
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("");

  function submit() {
    const payload = {
      cpf: onlyNumbers(cpf),
      phone: onlyNumbers(phone),
    };
    console.log(payload);
  }

  return (
    <>
      <LzInput
        label="CPF"
        inputMode="numeric"
        value={cpf}
        onChange={(e) => setCpf(formatCPF(e.target.value))}
      />
      <LzInput
        label="Phone"
        inputMode="tel"
        value={phone}
        onChange={(e) => setPhone(formatPhone(e.target.value))}
      />
    </>
  );
}
```

`inputMode` opens the numeric keyboard on mobile devices.

### Error state

Use the `danger` variant to highlight a field with an error, and show the message below it:

```tsx
<LzInput
  label="E-mail"
  variant={error ? "danger" : "primary"}
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
{error && <span style={{ color: "#dc2626", fontSize: 13 }}>{error}</span>}
```

### With Tailwind

Tailwind classes passed to `className` override the lib's styles:

```tsx
<LzButton className="rounded-full px-8 shadow-lg">Save</LzButton>
<LzInput label="Search" className="bg-gray-50" labelClassName="uppercase text-xs tracking-wide" />
```

For this to work in every case, import `lizard-ui/styles.css` after Tailwind's CSS.

### Refs and animation libraries

On React 19, `ref` is passed through to the native element, so the components work with `useRef`, form libraries like React Hook Form, and animation libraries like Motion:

```tsx
import { useRef } from "react";
import { motion } from "motion/react";
import { LzButton, LzInput } from "lizard-ui";

const MotionButton = motion.create(LzButton);

export function Example() {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <LzInput label="Name" ref={inputRef} />
      <MotionButton whileHover={{ scale: 1.05 }} onClick={() => inputRef.current?.focus()}>
        Focus the input
      </MotionButton>
    </>
  );
}
```

On React 18, `ref` isn't passed to the native element.

## Components

### LzButton

Accepts every prop of a native `<button>` (`onClick`, `disabled`, `type`, `aria-*`...), plus:

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `"primary" \| "secondary" \| "outline" \| "ghost" \| "danger"` | `"primary"` | Visual style |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Size |
| `loading` | `boolean` | `false` | Shows a spinner and disables the button |
| `fullWidth` | `boolean` | `false` | Takes the full width of the container |
| `leftIcon` | `ReactNode` | | Icon before the text |
| `rightIcon` | `ReactNode` | | Icon after the text |
| `color` | `string` | | Main color (background, or border and text in `outline` / `ghost`) |
| `hoverColor` | `string` | | Background on hover |
| `textColor` | `string` | | Text color |
| `hoverTextColor` | `string` | | Text color on hover |
| `borderColor` | `string` | | Border color |
| `hoverBorderColor` | `string` | | Border color on hover |

The default `type` is `"button"`, so the button doesn't submit forms unless you pass `type="submit"`.

```tsx
<LzButton>Save</LzButton>
<LzButton variant="outline" size="sm">Cancel</LzButton>
<LzButton variant="danger" loading={deleting} onClick={remove}>Delete</LzButton>
<LzButton leftIcon={<PlusIcon />} fullWidth>New vehicle</LzButton>

<LzButton color="#16a34a">Approve</LzButton>
<LzButton
  color="#fff"
  textColor="#111"
  borderColor="#e5e7eb"
  hoverColor="#111"
  hoverTextColor="#fff"
>
  Invert on hover
</LzButton>
```

When only `color` is passed, the hover color is calculated from it.

### LzInput

Accepts every prop of a native `<input>` (`value`, `onChange`, `placeholder`, `type`, `name`, `required`, `disabled`, `maxLength`...), plus:

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | | Label linked to the input |
| `variant` | `"primary" \| "secondary" \| "outline" \| "ghost" \| "danger"` | `"primary"` | Visual style |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Size |
| `fullWidth` | `boolean` | `false` | Takes the full width of the container |
| `color` | `string` | | Focus color |
| `textColor` | `string` | | Text color |
| `borderColor` | `string` | | Border color |
| `hoverBorderColor` | `string` | | Border color on hover |
| `labelColor` | `string` | | Label color |
| `labelClassName` | `string` | | Extra classes for the label |
| `labelStyle` | `CSSProperties` | | Inline style for the label |

The native `size` attribute of `<input>` is replaced by the component's `size`.

The label is linked to the input with a generated unique id, so clicking the label focuses the input. Pass `id` to use your own.

```tsx
<LzInput label="Name" placeholder="Type your name" />
<LzInput label="E-mail" type="email" variant="ghost" />
<LzInput label="Tax ID" variant="danger" />
<LzInput label="Search" size="sm" color="#16a34a" />
<LzInput label="Notes" labelStyle={{ fontSize: 16, fontWeight: 700 }} fullWidth />
```

## Customization

There are three levels, from the most specific to the most general.

### 1. Props

For the most common changes: `variant`, `size` and the color props.

### 2. `className` and `style`

For anything else, on a single component. Your classes win over the lib's without `!important`, because the lib's CSS is inside `@layer components`.

```tsx
<LzButton className="rounded-full px-8">Save</LzButton>
<LzButton style={{ letterSpacing: 1 }}>Save</LzButton>
```

`style` and the color props can be used together.

### 3. CSS variables

To change the theme of the whole project, override the variables in your global CSS:

```css
:root {
  --lz-color-primary: #16a34a;
  --lz-color-secondary: #f59e0b;
  --lz-color-danger: #dc2626;
  --lz-radius: 12px;
  --lz-field-label-color: #1e293b;
}
```

| Variable | Default | Used for |
|---|---|---|
| `--lz-color-primary` | `#2563eb` | Primary button, outline and ghost variants, focus ring |
| `--lz-color-secondary` | `#64748b` | Secondary variant |
| `--lz-color-danger` | `#dc2626` | Danger variant |
| `--lz-radius` | `8px` | Border radius of buttons and inputs |
| `--lz-field-label-color` | `#374151` | Input labels |

## Development

```bash
npm install     # install dependencies
npm test        # run tests in watch mode
npm run build   # generate the dist folder
```

### Playground

The `playground` folder has a Vite app that imports the components straight from `src`, to see them while developing:

```bash
cd playground
npm install
npm run dev
```

It isn't included in the published package.

### Adding a component

1. Create `src/LzName/index.tsx` exporting the component with a named export (`export function LzName`).
2. Create its styles in `src/LzName/LzName.css`, inside `@layer components`. The build adds every `.css` in `src` to `dist/styles.css` automatically.
3. Create the test at `src/LzName/LzName.test.tsx`.
4. Export it in `src/index.ts`:
   ```ts
   export * from "./LzName";
   ```
   Without this line, the component works in the playground but isn't available to projects that install the library.

### Releasing a new version

1. Update the version in `package.json` (e.g. `0.1.0` → `0.2.0`).
2. Commit and create the tag:
   ```bash
   git tag v0.2.0
   git push --tags
   ```
3. In your projects, update the tag in the install command.