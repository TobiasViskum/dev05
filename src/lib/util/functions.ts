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

export function roundToDecimals(number: number, decimals: number) {
  return number
    .toFixed(decimals)
    .toString()
    .replace(/\.0+$/, "")
    .replace(".", ",");
}

export function debounce(fn: () => void, delay: number) {
  let timer: NodeJS.Timeout | null;
  return () => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(fn, delay);
  };
}
