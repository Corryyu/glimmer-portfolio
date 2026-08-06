/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // 品牌色（来自原 iOS 设计系统 ShimmerColors）
        brand: {
          primary: "#5B50D6",
          secondary: "#4A90E2",
          tertiary: "#FF6B6B",
        },
        ink: {
          DEFAULT: "#1A1C1E",
          secondary: "#64748B",
          tertiary: "#94A3B8",
        },
        canvas: {
          DEFAULT: "#F8FAFC",
          soft: "#F1F5F9",
          surface: "#FFFFFF",
          border: "#E2E8F0",
        },
        // 情绪配色（来自原 iOS MoodAppearance）
        mood: {
          joy: "#FBBF24",
          peace: "#34D399",
          uneasy: "#A78BFA",
          down: "#60A5FA",
          anger: "#FB7185",
          numb: "#9CA3AF",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"SF Pro Text"',
          '"PingFang SC"',
          '"Helvetica Neue"',
          "system-ui",
          "sans-serif",
        ],
        serif: ['"SF Pro Display"', '"Songti SC"', "Georgia", "serif"],
      },
      maxWidth: {
        site: "1120px",
        prose: "720px",
        app: "480px",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(15,23,42,0.04), 0 8px 24px rgba(74,144,226,0.10)",
        card: "0 1px 2px rgba(15,23,42,0.04), 0 12px 32px rgba(91,80,214,0.08)",
      },
      keyframes: {
        breathe: {
          "0%,100%": { transform: "scale(1)", opacity: "0.85" },
          "50%": { transform: "scale(1.12)", opacity: "1" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        breathe: "breathe 4s ease-in-out infinite",
        fadeUp: "fadeUp 0.5s ease-out both",
      },
    },
  },
  plugins: [],
};
