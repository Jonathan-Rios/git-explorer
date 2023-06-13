import { createStitches } from "@stitches/react";

export const { styled, getCssText, globalCss } = createStitches({
  theme: {
    fonts: {
      default: "Inter, sans-serif",
    },

    space: {
      px: "1px",
      1: "0.25rem",
      2: "0.5rem",
      3: "0.75rem",
      4: "1rem",
      5: "1.25rem",
      6: "1.5rem",
      7: "1.75rem",
      8: "2rem",
      10: "2.5rem",
    },

    fontSizes: {
      _12: "0.75rem", // 12px
      _14: "0.875rem", // 14px
      _16: "1rem", // 16px
      _18: "1.125rem", // 18px
      _20: "1.25rem", // 20px
      _24: "1.5rem", // 24px
    },

    fontWeights: {
      regular: "400",
      medium: "500",
      bold: "700",
    },

    lineHeights: {
      shorter: "125%",
      short: "140%",
      base: "160%",
      tall: "180%",
    },

    colors: {
      white: "#FFFFFF",
      black: "#000000",

      background: "#1A1A1A",

      green700: "#015F43",
      green500: "#00875F",
      green250: "#00B37E",

      red700: "#AA2834",
      red500: "#F75A68",

      gray100: "#E1E1E6",
      gray200: "#C4C4CC",
      gray300: "#7C7C8A",
      gray400: "#323238",
      gray500: "#29292E",
      gray600: "#202024",
      gray700: "#121214",

      shadow: "rgba(0,0,0,0.5)",
    },

    radii: {
      xs: "2.5px",
      sm: "5px",
      md: "10px",
      lg: "20px",
      full: "99999px",
    },
  },
});
