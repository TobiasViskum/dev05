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

export function getDecimalAmount(str: string, useComma?: boolean | undefined) {
  const splitStr = useComma ? str.split(",") : str.split(".");
  if (splitStr.length <= 1) return 0;
  return splitStr[1].length;
}
