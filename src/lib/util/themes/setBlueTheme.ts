"use client";

export default function setBlueTheme() {
  const docElement = document.documentElement;

  const settings: { [key: string]: string } = {
    "--bg-transparent": "0.5",
    "--bg-first-preset": "18, 21, 47",
    "--bg-second-preset": "36, 44, 76",
    "--bg-third-preset": "17, 17, 17",

    "--bg-first": "rgb(var(--bg-first-preset))",
    "--bg-first-transparent":
      "rgba(var(--bg-first-preset), var(--bg-transparent))",
    "--bg-second": "rgb(var(--bg-second-preset))",
    "--bg-second-transparent":
      "rgba(var(--bg-second-preset), var(--bg-transparent))",
    "--bg-third":
      "linear-gradient(22.5deg, rgb(41, 56, 110) 0%, rgba(31, 44, 89, 1) 70%)",
    "--bg-news": "rgb(46, 209, 87)",
    "--bg-alert": "rgb(245, 83, 99)",
    "--bg-btn-active": "rgb(8, 42, 82)",
    "--bg-btn-inactive": "rgb(46, 47, 55)",
    "--bg-fitness": "rgb(250, 130, 31)",
    "--bg-dog": "rgb(19, 177, 90)",
    "--bg-chat": "rgb(26, 113, 184)",
    "--bg-cardio": "rgb(178, 34, 197)",
    "--bg-compete": "rgb(241, 47, 73)",
    "--bg-fitness-group": "rgba(31, 44, 89, 1)",

    "--text-first": "rgb(251, 251, 252)",
    "--text-second": "rgb(147 197 253)",
    "--text-active": "rgb(4, 136, 255)",
    "--text-btn-active": "rgb(133, 190, 254)",
    "--text-btn-inactive": "rgb(191, 193, 201)",
    "--text-news": "rgb(46, 209, 88)",
    "--text-alert": "rgb(245, 83, 99)",

    "--border-text-white": "rgb(251, 251, 252)",
    "--border-first": "#050505",
    "--border-second": "#17181b",
    "--border-active": "#143f71",
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
