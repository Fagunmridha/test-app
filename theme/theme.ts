import { createTheme } from "@shopify/restyle";

// 🌞 লাইট থিম
export const lightTheme = createTheme({
  colors: {
    // 🔲 ব্যাকগ্রাউন্ড
    background: "#f5f5f5",
    backgroundPink: "#fce7f3",
    backgroundGradient: "#f9fafb",

    // 🔤 টেক্সট কালার
    text: "#1f2937",
    textLight: "#6b7280",
    textMuted: "#9ca3af",
    textDark: "#111827",

    // 🎨 ব্র্যান্ড কালার
    primary: "#ec4899", // গোলাপি
    primaryLight: "#f9a8d4",
    secondary: "#8b5cf6", // পার্পল
    orange: "#F97316",

    // 📚 ক্যাটাগরি কালার
    categoryRomance: "#fce7f3",
    categoryHistory: "#dbeafe",
    categoryMystery: "#e9d5ff",
    categorySpiritual: "#fef3c7",
    categoryFantasy: "#d1fae5",

    // 📘 বুক কভার গ্র্যাডিয়েন্ট
    bookTeal: "#14b8a6",
    bookTealDark: "#0d9488",
    bookYellow: "#f59e0b",
    bookOrange: "#ea580c",
    bookBlue: "#3b82f6",
    bookPurple: "#8b5cf6",
    bookPink: "#ec4899",
    bookGreen: "#10b981",

    // 🧱 UI এলিমেন্টস
    cardBackground: "#ffffff",
    inputBackground: "#f3f4f6",
    buttonBackground: "#ec4899",
    shadow: "#00000010",
    overlay: "#00000040",
    border: "#e5e7eb",
    borderLight: "#f3f4f6",

    // 🟢 স্টেট কালার
    success: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444",

    // 🎯 আইকন কালার
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

// 🌙 ডার্ক থিম
export const darkTheme = createTheme({
  ...lightTheme,
  colors: {
    ...lightTheme.colors,
    background: "#1f2937",
    backgroundPink: "#374151",
    backgroundGradient: "#111827",
    text: "#f9fafb",
    textLight: "#d1d5db",
    textMuted: "#9ca3af",
    cardBackground: "#1f2937",
    inputBackground: "#374151",
    border: "#4b5563",
    borderLight: "#374151",
  },
});

export type Theme = typeof lightTheme;
export const theme = lightTheme;
