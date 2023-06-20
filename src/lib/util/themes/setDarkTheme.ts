"use client";

export default function setDarkTheme() {
  const docElement = document.documentElement;

  const settings: { [key: string]: string } = {
    "--bg-transparent": "0.5",
    "--bg-first-preset": "5, 5, 5",
    "--bg-second-preset": "29, 29, 29",
    "--bg-third-preset": "50, 50, 50",

    "--bg-first": "rgb(var(--bg-first-preset))",
    "--bg-first-transparent":
      "rgba(var(--bg-first-preset), var(--bg-transparent))",
    "--bg-second": "rgb(var(--bg-second-preset))",
    "--bg-second-transparent":
      "rgba(var(--bg-second-preset), var(--bg-transparent))",
    "--bg-third": "rgb(var(--bg-third-preset))",
    "--bg-news": "rgb(46, 209, 87)",
    "--bg-alert": "rgb(245, 83, 99)",
    "--bg-btn-active": "rgb(8, 42, 82)",
    "--bg-btn-inactive": "rgb(46, 47, 55)",

    "--text-first": "rgb(251, 251, 252)",
    "--text-second": "rgb(132, 132, 132)",
    "--text-active": "rgb(4, 136, 255)",
    "--text-btn-active": "rgb(133, 190, 254)",
    "--text-btn-inactive": "rgb(191, 193, 201)",
    "--text-news": "rgb(46, 209, 88)",
    "--text-alert": "rgb(245, 83, 99)",

    "--border-text-white": "rgb(251, 251, 252)",
    "--border-first": "#050505",
    "--border-second": "#17181b",
    "--border-active": "rgb(147, 51, 234)",
    "--border-inactive": "#2b2c2f",
    "--border-image-gray": "#848484",

    "--outline-active": "rgb(20, 63, 113)",
    "--outline-inactive": "rgb(43, 44, 47)",

    "--placeholder-first": "#fbfbfc",
    "--placeholder-second": "#848484",

    "--box-shadow-first": "#fbfbfc",
  };

  Object.keys(settings).forEach(function (key) {
    docElement.style.setProperty(key, settings[key]);
  });
  return;
}
