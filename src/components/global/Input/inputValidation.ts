function maxCharacters(newInput: string, maxCharacters: number | undefined) {
  if (typeof maxCharacters === "undefined") return true;
  if (newInput.length <= maxCharacters) return true;
  return false;
}

function onlyLetters(newInput: string, onlyLetters: boolean | undefined) {
  if (typeof onlyLetters === "undefined") return true;
  if (/^[a-zA-Z]+$/.test(newInput)) return true;
  return false;
}

function onlyIntegers(newInput: string, onlyIntegers: boolean | undefined) {
  if (typeof onlyIntegers === "undefined") return true;
  if (newInput.includes(".") || newInput.includes(",")) return false;
  if (newInput === "-") return true;
  if (isNaN(Number(newInput))) return false;
  if (Number.isInteger(Number(newInput))) return true;
  return false;
}

function onlyNumbers(
  newInput: string,
  onlyNumbers: boolean | undefined,
  useComma: boolean | undefined
) {
  if (typeof onlyNumbers === "undefined") return true;
  if (newInput === "-") return true;
  if (useComma && newInput.includes(".")) return false;
  if (useComma) newInput = newInput.replace(",", ".");

  if (!isNaN(Number(newInput))) return true;
  return false;
}

function minMaxValue(
  newInput: string,
  minValue: number | undefined,
  maxValue: number | undefined
) {
  if (newInput === "-" && typeof minValue !== "undefined" && minValue >= 0) {
    return false;
  }

  const number = Number(newInput);

  let hasPassedMin = true;
  let hasPassedMax = true;
  if (typeof minValue !== "undefined" && number < minValue)
    hasPassedMin = false;
  if (typeof maxValue !== "undefined" && number > maxValue)
    hasPassedMax = false;
  if (hasPassedMin && hasPassedMax) return true;
  return false;
}

function maxDecimals(
  newInput: string,
  maxDecimals: number | undefined,
  useComma: boolean | undefined
) {
  if (newInput === "-") return true;
  if (typeof maxDecimals === "undefined") return true;

  const splitNumber = useComma ? newInput.split(",") : newInput.split(".");

  if (splitNumber.length <= 1) return true;
  if (splitNumber[1].length <= maxDecimals) return true;
  return false;
}

export const inputValidation = {
  maxCharacters: maxCharacters,
  onlyLetters: onlyLetters,
  onlyIntegers: onlyIntegers,
  onlyNumbers: onlyNumbers,
  minMaxValue: minMaxValue,
  maxDecimals: maxDecimals,
};
