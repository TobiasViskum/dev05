import { setDarkTheme, setBlueTheme } from ".";

export default async function renderTheme(theme: string) {
  if (theme === "dark") {
    setDarkTheme();
  } else if (theme === "blue") {
    setBlueTheme();
  }
}
