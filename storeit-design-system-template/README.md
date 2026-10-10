# StoreIt / Extern — TypeScript Design System Starter

A small, editable design-system foundation for a Next.js App Router project using React, TypeScript, and Tailwind CSS v4.

## Included

- Design tokens in `src/design-system/tokens.ts`
- Reusable `Button`, `Card`, and `Badge` components
- Barrel exports
- Tailwind CSS v4 theme tokens and baseline styles for `app/globals.css`
- ESLint flat-config example for ESLint 9
- Setup notes for editor icons and Tailwind IntelliSense

## Important

This is a **copy-in starter**, not a replacement for your whole Next.js project. Review each file before merging it into your existing project. In particular, merge the CSS into your existing `app/globals.css` instead of blindly overwriting it.

## Install the optional class-name helper

From your project root:

```powershell
npm install clsx
```

The template does not require `tailwind-merge`; add it only if you want automatic Tailwind class conflict resolution.

## Suggested structure

```text
app/
  globals.css
src/
  design-system/
    tokens.ts
    index.ts
    components/
      button.tsx
      card.tsx
      badge.tsx
eslint.config.mjs   # example; merge with your existing config
```

## Example usage

```tsx
import { Badge, Button, Card } from "@/src/design-system";

export default function Example() {
  return (
    <main className="mx-auto max-w-5xl space-y-6 p-6">
      <Card>
        <Badge tone="accent">Storage status</Badge>
        <h1 className="mt-3 text-2xl font-semibold">Your media vault</h1>
        <p className="mt-2 text-sm text-muted">
          A clear starting point for your StoreIt interface.
        </p>
        <div className="mt-5">
          <Button>Upload files</Button>
        </div>
      </Card>
    </main>
  );
}
```

If your TypeScript path alias `@/*` is not configured, use a relative import or add the alias in `tsconfig.json`.

## Editor icons and Tailwind squiggles

Installing ESLint and Tailwind packages does not itself install VS Code file icons or editor extensions.

- **Purple icon for ESLint/config files:** controlled by your VS Code file icon theme and extensions. It is not a required config feature.
- **Tailwind class suggestions / squiggles:** install and enable the official **Tailwind CSS IntelliSense** VS Code extension. Tailwind v4 projects generally use CSS-first configuration (`@import "tailwindcss";` and `@theme`), so a `tailwind.config.js` file may not be needed.
- **ESLint diagnostics in VS Code:** install/enable the official ESLint extension and reload the VS Code window.

## Notes

- Tailwind CSS v4 is CSS-first; this template uses `@theme` in `app/globals.css`.
- `eslint-config-standard@17` expects ESLint 8, so it is intentionally not included in the ESLint 9 example.
- Merge the ESLint example with your existing `eslint.config.mjs`; do not replace Next.js's lint setup without checking it first.
