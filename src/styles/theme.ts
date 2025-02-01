// src/styles/theme.ts
import { defineConfig, createSystem } from "@chakra-ui/react";

const config = defineConfig({
  cssVarsRoot: ":where(:root, :host)",
  cssVarsPrefix: "ck",

  globalCss: {
    "html, body": {
      margin: 0,
      padding: 0,
      fontFamily: "Paperlogy, sans-serif",
      backgroundColor: "var(--general-white)",
      color: "var(--general-black)",
    },
  },

  theme: {
    breakpoints: {
      sm: "320px",
      md: "768px",
      lg: "960px",
      xl: "1200px",
    },
    tokens: {
      colors: {
        primary: { value: "#09CCFF" },
        secondary: { value: "#79B4C3" },
        success: { value: "#44E166" },
        danger: { value: "#F06969" },
        warning: { value: "#DCE015" },
        black: { value: "#000000" },
        grey: {
          100: { value: "#A0A0A0" },
          200: { value: "#98AFBA" },
          300: { value: "#344A53" },
        },
        white: { value: "#FFFFFF" },
      },
      fontSizes: {
        xs: { value: "11px" },
        sm: { value: "13px" },
        md: { value: "16px" },
        lg: { value: "20px" },
        xl: { value: "24px" },
      },
      fontWeights: {
        thin: { value: "100" },
        light: { value: "200" },
        extralight: { value: "300" },
        normal: { value: "400" },
        medium: { value: "500" },
        semibold: { value: "600" },
        bold: { value: "700" },
        extrabold: { value: "800" },
        black: { value: "900" },
      },
    },
  },
});

export default createSystem(config);
