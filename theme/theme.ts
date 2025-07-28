import { createTheme } from "@shopify/restyle";

export const lightTheme = createTheme({
  colors: {
    // Main background colors
    background: "#f5f5f5",
    backgroundPink: "#fce7f3", // Light pink background
    backgroundGradient: "#f9fafb", // Subtle gradient base

    // Text colors
    text: "#1f2937", // Dark gray for main text
    textLight: "#6b7280", // Light gray for secondary text
    textMuted: "#9ca3af", // Very light gray for muted text

    // Brand colors
    primary: "#ec4899", // Pink primary
    primaryLight: "#f9a8d4", // Light pink
    secondary: "#8b5cf6", // Purple secondary

    // Category colors
    categoryRomance: "#fce7f3", // Light pink
    categoryHistory: "#dbeafe", // Light blue
    categoryMystery: "#e9d5ff", // Light purple
    categorySpiritual: "#fef3c7", // Light yellow
    categoryFantasy: "#d1fae5", // Light green

    // Book cover gradients
    bookTeal: "#14b8a6",
    bookTealDark: "#0d9488",
    bookYellow: "#f59e0b",
    bookOrange: "#ea580c",
    bookBlue: "#3b82f6",
    bookPurple: "#8b5cf6",
    bookPink: "#ec4899",
    bookGreen: "#10b981",

    // UI elements
    border: "#e5e7eb",
    borderLight: "#f3f4f6",
    shadow: "#00000010",
    overlay: "#00000040",

    // Interactive elements
    cardBackground: "#ffffff",
    inputBackground: "#f3f4f6",
    buttonBackground: "#ec4899",

    // Status colors
    success: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444",

    // Icon colors
    iconGray: "#6b7280",
    iconLight: "#9ca3af",
  },

  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 48,
  },

  borderRadii: {
    s: 8,
    m: 12,
    l: 16,
    xl: 20,
    round: 50,
  },

  textVariants: {
    defaults: {
      fontSize: 14,
      color: "text",
      fontFamily: "System",
    },
    header: {
      fontSize: 20,
      fontWeight: "bold",
      color: "text",
      lineHeight: 28,
    },
    subheader: {
      fontSize: 16,
      fontWeight: "600",
      color: "text",
      lineHeight: 24,
    },
    body: {
      fontSize: 14,
      color: "text",
      lineHeight: 20,
    },
    bodySmall: {
      fontSize: 12,
      color: "textLight",
      lineHeight: 16,
    },
    caption: {
      fontSize: 11,
      color: "textMuted",
      lineHeight: 14,
    },
    button: {
      fontSize: 14,
      fontWeight: "600",
      color: "text",
    },
    bookTitle: {
      fontSize: 12,
      fontWeight: "bold",
      color: "text",
      lineHeight: 16,
    },
    bookAuthor: {
      fontSize: 10,
      color: "textLight",
      lineHeight: 14,
    },
    categoryLabel: {
      fontSize: 11,
      fontWeight: "500",
      color: "text",
      textAlign: "center",
    },
  },

  cardVariants: {
    defaults: {
      backgroundColor: "cardBackground",
      shadowColor: "shadow",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 2,
    },
    elevated: {
      backgroundColor: "cardBackground",
      shadowColor: "shadow",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 4,
    },
    bookCover: {
      shadowColor: "shadow",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 3,
    },
  },

  buttonVariants: {
    defaults: {
      backgroundColor: "buttonBackground",
      borderRadius: "round",
      paddingHorizontal: "m",
      paddingVertical: "s",
    },
    primary: {
      backgroundColor: "primary",
    },
    secondary: {
      backgroundColor: "inputBackground",
    },
    category: {
      backgroundColor: "inputBackground",
      borderRadius: "l",
      width: 64,
      height: 64,
      justifyContent: "center",
      alignItems: "center",
    },
  },
});

export const darkTheme = createTheme({
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    background: "#f5f5f5",
    backgroundPink: "#374151",
    backgroundGradient: "#1f2937",
    text: "#f9fafb",
    textLight: "#d1d5db",
    textMuted: "#9ca3af",
    cardBackground: "#1f2937",
    inputBackground: "#374151",
    border: "#4b5563",
    borderLight: "#374151",
    card: "#f5f5f5",
  },
});

export type Theme = typeof lightTheme;
export const theme = lightTheme;
