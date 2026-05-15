import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#09111f",
        slate: "#5b667a",
        mist: "#eef3f8",
        panel: "#ffffff",
        accent: {
          DEFAULT: "#0f766e",
          soft: "#d7f3ef",
          dark: "#0b4f4a",
        },
        gold: "#d97706",
      },
      boxShadow: {
        card: "0 18px 45px rgba(9, 17, 31, 0.08)",
      },
      backgroundImage: {
        "admin-grid":
          "radial-gradient(circle at top, rgba(15, 118, 110, 0.12), transparent 35%), linear-gradient(rgba(9, 17, 31, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(9, 17, 31, 0.04) 1px, transparent 1px)",
      },
      backgroundSize: {
        "admin-grid": "auto, 24px 24px, 24px 24px",
      },
    },
  },
  plugins: [],
};

export default config;
