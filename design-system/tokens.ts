/** Typed references to the canonical Volcano tokens in app/globals.css. */
export const designTokens = {
  color: {
    navy: "var(--ds-accent-navy)",
    orange: "var(--ds-accent-orange)",
    clay: "var(--ds-accent-clay)",
    background: "var(--ds-bg-primary)",
    surface: "var(--ds-bg-surface)",
    ink: "var(--ds-text-main)",
    muted: "var(--ds-text-muted)",
    border: "var(--ds-border-color)",
  },
  radius: {
    none: "var(--ds-radius-none)",
    sm: "var(--ds-radius-sm)",
    md: "var(--ds-radius-md)",
    lg: "var(--ds-radius-lg)",
    xl: "var(--ds-radius-xl)",
    pill: "var(--ds-radius-pill)",
  },
  spacing: {
    page: "var(--ds-space-page)",
    section: "var(--ds-space-section)",
    control: "var(--ds-space-control)",
  },
  typography: {
    heading: "var(--ds-font-heading)",
    body: "var(--ds-font-body)",
  },
  motion: {
    fast: "var(--ds-motion-fast)",
    standard: "var(--ds-motion-standard)",
  },
} as const;

export type DesignTokens = typeof designTokens;
