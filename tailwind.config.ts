import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        midnight: {
          50: "#edf4ff",
          100: "#d4e2ff",
          200: "#a9c7ff",
          300: "#7aa6ff",
          400: "#4f82ff",
          500: "#2f61ff",
          600: "#2349cc",
          700: "#1d389f",
          800: "#172e80",
          900: "#11215f",
          950: "#091233"
        },
        glass: "rgba(15, 23, 42, 0.55)"
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(94, 234, 212, 0.18), 0 20px 60px rgba(4, 12, 29, 0.55)",
        soft: "0 18px 60px rgba(2, 6, 23, 0.28)"
      },
      backgroundImage: {
        "aurora-radial": "radial-gradient(circle at top left, rgba(45, 212, 191, 0.22), transparent 30%), radial-gradient(circle at top right, rgba(99, 102, 241, 0.24), transparent 26%), linear-gradient(180deg, rgba(2, 6, 23, 1), rgba(8, 15, 34, 1))"
      },
      fontFamily: {
        sans: ["var(--font-body)", "sans-serif"],
        display: ["var(--font-display)", "sans-serif"]
      },
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" }
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" }
        }
      },
      animation: {
        floaty: "floaty 6s ease-in-out infinite",
        shimmer: "shimmer 12s linear infinite"
      }
    }
  },
  plugins: []
};

export default config;