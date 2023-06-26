/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0%" },
          "100%": { opacity: "100%" },
        },
        "fade-out": {
          "100%": { opacity: "100%" },
          "0%": { opacity: "0%" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.25s ease-in-out",
        "fade-out": "fade-out 0.25s ease-in-out",
      },
      fontSize: {
        "2xs": "0.7rem",
        "3xs": "0.675rem",
        "4xs": "0.65rem",
        "5xs": "0.6rem",
        "6xs": "0.55rem",
        "7xs": "0.5rem",
      },
      width: {
        "half": "50%",
      },
      height: {
        "half": "50%",
      },
      screens: {
        "dt": { "raw": "(hover: hover)" },
        "touch": { "raw": "(hover: none)" },
        "w-autofill": { "raw": ":-webkit-autofill" },
        "standalone": { "raw": "(display-mode: standalone)" },
        "browser": { "raw": "(display-mode: browser)" },
        "tn": "350px",
        "vsm": "660px",
      },
      backgroundColor: {
        "first": "var(--bg-first)",
        "first-transparent": "var(--bg-first-transparent)",
        "second": "var(--bg-second)",
        "second-transparent": "var(--bg-second-transparent)",
        "third": "var(--bg-third)",
        "news": "var(--bg-news)",
        "alert": "var(--bg-alert)",
        "btn-active": "var(--bg-btn-active)",
        "btn-inactive": "var(--bg-btn-inactive)7",
        "fitness": "var(--bg-fitness)",
        "dog": "var(--bg-dog)",
        "chat": "var(--bg-chat)",
        "cardio": "var(--bg-cardio)",
        "compete": "var(--bg-compete)",
      },
      textColor: {
        "first": "var(--text-first)",
        "second": "var(--text-second)",
        "active": "var(--text-active)",
        "btn-active": "var(--text-btn-active)",
        "btn-inactive": "var(--text-btn-inactive)",
        "news": "var(--text-news)",
        "alert": "var(--text-alert)",
      },
      borderColor: {
        "text-white": "var(--border-text-white)",
        "first": "var(--border-first)",
        "second": "var(--border-second)",
        "active": "var(--border-active)",
        "inactive": "var(--border-inactive)",
        "image-gray": "var(--border-image-gray)",
      },
      borderRadius: {
        "me": "var(--border-4)",
      },
      minWidth: {
        "tiny": `var(--min-width-tiny)`,
        "small": `var(--min-width-small)`,
      },
      maxWidth: {
        "tiny": `var(--max-width-tiny)`,
        "small": `var(--max-width-small)`,
      },
      outlineColor: {
        "active": "var(--outline-active)",
        "inactive": "var(--outline-inactive)",
      },
      placeholderColor: {
        "first": "var(--placeholder-first)",
        "second": "var(--placeholder-second)",
      },
      gridTemplateRows: {
        "1-min-content": "var(--grid-template-rows-1-min)",
        "2-min-content": "var(--grid-template-rows-2-min)",
        "3-min-content": "var(--grid-template-rows-3-min)",
        "auto-min-content": "var(--grid-template-rows-auto-min)",
      },
      gridAutoRows: {
        "0": "var(--grid-auto-rows-0)",
      },
      gridTemplateColumns: {
        "auto-min-max-1": `var(--grid-template-cols-auto-minmax-1)`,
      },
      transitionProperty: {
        "grid": "var(--transition-prop-grid)",
        "modal": "opacity, background-color",
      },
      boxShadowColor: {
        "first": "var(--box-shadow-first)",
      },
      boxShadow: {
        "circle-sm": "var(--box-shadow-circle-sm)",
        "circle-md": "var(--box-shadow-circle-md)",
        "circle-lg": "var(--box-shadow-circle-lg)",
        "circle-xl": "var(--box-shadow-circle-xl)",
        "circle-2xl": "var(--box-shadow-circle-2xl)",
        "circle-3xl": "var(--box-shadow-circle-3xl)",
        "circle-4xl": "var(--box-shadow-circle-4xl)",
        "circle-5xl": "var(--box-shadow-circle-5xl)",
        "br-md": "var(--box-shadow-br-md)",
        "br-lg": "var(--box-shadow-br-lg)",
      },
    },
  },
  plugins: [],
};
