import { montserrat } from "@/app/ui/fonts";
import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [
    require("tailwind-scrollbar"),
    require("tailwindcss/plugin")(({ addVariant }) => {
      addVariant("search-cancel", "&::-webkit-search-cancel-button");
    }),
  ],
  theme: {
    fontSize: {
      xs: "0.75rem",
      sm: "0.75rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.125rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      title: "var(--title)",
      subtitle: "var(--subtitle)",
    },
    extend: {
      fontFamily: {
        montserrat: '"Montserrat"',
        mono: '"Roboto Mono"',
        amita: '"Amita"',
      },
      screens: {
        xlg: "1600px",
        badgeBR: "1020px",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        hoverColor: "hsl(var(--hover-color))",
        primaryLight: "var(--primary-light)",
        primaryMedium: "var(--primary-medium)",
        primaryDark: "var(--primary-dark)",
        cyan100: "var(--cyan-100)",
        cyan200: "var(--cyan-200)",
        cyan300: "var(--cyan-300)",
        item: {
          DEFAULT: "hsl(var(--item))",
          foreground: "hsl(var(--item-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      boxShadow: {
        outset: "var(--shadow-outset)",
        inset: "var(--shadow-inset)",
      },
      fontSize: {
        small: "var(--text-small)",
        medium: "var(--text-medium)",
        large: "var(--text-large)",
      },

      letterSpacing: {
        DEFAULT: "var(--letter-spacing)",
      },
      transitionDuration: {
        DEFAULT: "var(--transition)",
      },
      keyframes: {
        slide: {
          from: {
            left: "100%",
          },
          to: {
            left: "-3rem",
          },
        },
        slideR: {
          from: {
            left: "-3rem",
          },
          to: {
            left: "100%",
          },
        },
      },
    },
  },
} satisfies Config;
