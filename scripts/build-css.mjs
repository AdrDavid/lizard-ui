import { readdirSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const tokens = join("src", "styles", "tokens.css");

const components = readdirSync("src", { recursive: true })
  .filter((file) => file.endsWith(".css"))
  .map((file) => join("src", file))
  .filter((file) => file !== tokens)
  .sort();

const css = [tokens, ...components]
  .map((file) => readFileSync(file, "utf8"))
  .join("\n");

mkdirSync("dist", { recursive: true });
writeFileSync("dist/styles.css", css);