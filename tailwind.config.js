/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // 이 줄을 추가합니다
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        accent: "var(--color-accent)",
        muted: "var(--color-muted)",
        appBackgroundLight: "var(--app-background-light)",
        appBackgroundDark: "var(--app-background-dark)",
        appTextLight: "var(--app-text-light)",
        appTextDark: "var(--app-text-dark)",
      },
    },
  },
  plugins: [],
};
