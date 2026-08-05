/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0D1117",
          soft: "#11161D",
        },
        surface: {
          DEFAULT: "#161B22",
          raised: "#1C232C",
        },
        line: "#2A323D",
        muted: "#8B95A3",
        parchment: "#E6E8EB",
        gold: {
          DEFAULT: "#C9A227",
          soft: "#8A6F1E",
          glow: "#E4C34E",
        },
        crimson: {
          DEFAULT: "#A6314A",
          soft: "#7A2436",
        },
        sage: {
          DEFAULT: "#4F8767",
          soft: "#396350",
        },
        sky: {
          DEFAULT: "#3E7BA6",
          soft: "#2E5C7E",
        },
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(0,0,0,0.4), 0 8px 24px -12px rgba(0,0,0,0.5)",
        modal: "0 24px 60px -12px rgba(0,0,0,0.65)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(4px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        modalIn: {
          "0%": { opacity: 0, transform: "scale(0.96) translateY(8px)" },
          "100%": { opacity: 1, transform: "scale(1) translateY(0)" },
        },
        stamp: {
          "0%": { opacity: 0, transform: "scale(1.4) rotate(-8deg)" },
          "60%": { opacity: 1, transform: "scale(0.95) rotate(-8deg)" },
          "100%": { opacity: 0, transform: "scale(1) rotate(-8deg)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.25s ease-out",
        modalIn: "modalIn 0.22s cubic-bezier(0.16, 1, 0.3, 1)",
        stamp: "stamp 0.9s ease-out forwards",
      },
    },
  },
  plugins: [],
};
