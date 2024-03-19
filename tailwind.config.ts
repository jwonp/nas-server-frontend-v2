import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      "sm": "640px",

      "md": "768px",

      "lg": "1024px",

      "xl": "1280px",

      "2xl": "1536px",

      "mobile": "415px",
      "file": "458px",

      "login": "650px",
    },
    listStyleType: {
      none: "none",
      disc: "disc",
      decimal: "decimal",
      square: "square",
      roman: "upper-roman",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      gridTemplateColumns: {
        "16": "repeat(16,minmax(0,1fr))",
        "20": "repeat(20,minmax(0,1fr))",
        "layout": "240px 1fr",
        "listBarTitle": "40px 1fr",
        "adminTemporaryAccount":"360px 1fr"
      },
      gridTemplateRows: {
        "modal": "80px 56px 1fr 48px",

      },
      lineHeight: {
        "12": "3rem",
        "14": "3.5rem",
      },
    },
  },
  plugins: [],
};
export default config;
