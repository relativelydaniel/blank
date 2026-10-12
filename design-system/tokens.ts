/** Typed StoreIt design tokens for places where CSS variables aren't available. */
export const designTokens = {
  color: {
    navy: "#0F172A",
    orange: "#B84400",
    clay: "#7B3E2B",
    white: "#FFFFFF",
    ink: "#111315",
    surface: "#F4F5F7",
    muted: "#4B5563",
    border: "#E5E7EB",
    darkBackground: "#0B0F17",
    darkSurface: "#111827",
    darkText: "#F9FAFB",
    darkMuted: "#9CA3AF",
    darkBorder: "#1F2937",
  },
  radius: { none: "0px", sm: "4px", md: "8px", lg: "12px", xl: "16px", pill: "9999px" },
  spacing: { page: "1.5rem", section: "3rem", control: "0.75rem" },
  typography: { heading: '"Playfair Display", Georgia, serif', body: "var(--font-poppins), system-ui, sans-serif" },
  motion: { fast: "150ms", standard: "200ms" },
} as const;

export type DesignTokens = typeof designTokens;
