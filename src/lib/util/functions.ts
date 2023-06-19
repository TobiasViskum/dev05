export function firstLetterUppercase(str: string) {
  const capitalizedStr = str.charAt(0).toUpperCase() + str.slice(1);

  return capitalizedStr;
}
