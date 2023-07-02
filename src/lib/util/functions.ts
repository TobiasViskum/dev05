export function firstLetterUppercase(str: string) {
  const capitalizedStr = str.charAt(0).toUpperCase() + str.slice(1);

  return capitalizedStr;
}

export function roundToOneDecimal(number: number) {
  return number.toFixed(1).toString().replace(/\.0+$/, "").replace(".", ",");
}
export function roundToTwoDecimals(number: number) {
  return number.toFixed(2).toString().replace(/\.0+$/, "").replace(".", ",");
}
