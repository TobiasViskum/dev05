function maxCharacters(
  newInput: string,
  maxCharacters: number | undefined,
  displayMessage: (message: string, forceHideMessage: boolean) => void,
  forceHideMessage: boolean
) {
  if (typeof maxCharacters === "undefined") return true;
  if (newInput.length <= maxCharacters) return true;
  displayMessage(`Max length`, forceHideMessage);

  return false;
}

function onlyLetters(
  newInput: string,
  onlyLetters: boolean | undefined,
  displayMessage: (message: string, forceHideMessage: boolean) => void,
  forceHideMessage: boolean
) {
  if (typeof onlyLetters === "undefined") return true;
  if (/^[a-zA-Z ]+$/.test(newInput)) return true;
  displayMessage("Letters only", forceHideMessage);

  return false;
}

function onlyIntegers(
  newInput: string,
  onlyIntegers: boolean | undefined,
  displayMessage: (message: string, forceHideMessage: boolean) => void,
  forceHideMessage: boolean
) {
  if (newInput.includes(" ")) return false;
  if (validateZeros(newInput) > 1) return false;
  if (typeof onlyIntegers === "undefined") return true;
  if (newInput.includes(".") || newInput.includes(",")) {
    displayMessage("Integers only", forceHideMessage);
    return false;
  }
  if (newInput === "-") return true;
  if (isNaN(Number(newInput))) {
    displayMessage("Integers only", forceHideMessage);
    return false;
  }
  if (Number.isInteger(Number(newInput))) return true;
  displayMessage("Integers only", forceHideMessage);

  return false;
}

function onlyNumbers(
  newInput: string,
  onlyNumbers: boolean | undefined,
  useComma: boolean | undefined,
  displayMessage: (message: string, forceHideMessage: boolean) => void,
  forceHideMessage: boolean
) {
  if (newInput.includes(" ")) return false;
  if (validateZeros(newInput) > 1) return false;
  if (typeof onlyNumbers === "undefined") return true;
  if (newInput === "-") return true;
  if (useComma && newInput.includes(".")) {
    displayMessage("Numbers only", forceHideMessage);
    return false;
  }
  if (useComma) newInput = newInput.replace(",", ".");

  if (!isNaN(Number(newInput))) return true;
  displayMessage("Numbers only", forceHideMessage);

  return false;
}

function minMaxValue(
  newInput: string,
  minValue: number | undefined,
  maxValue: number | undefined,
  displayMessage: (message: string, forceHideMessage: boolean) => void,
  forceHideMessage: boolean
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
  displayMessage(`${minValue}-${maxValue}`, forceHideMessage);
  return false;
}

function maxDecimals(
  newInput: string,
  maxDecimals: number | undefined,
  useComma: boolean | undefined,
  displayMessage: (message: string, forceHideMessage: boolean) => void,
  forceHideMessage: boolean
) {
  if (newInput === "-") return true;
  if (typeof maxDecimals === "undefined") return true;

  const decimalAmount = getDecimalAmount(newInput, useComma);

  if (decimalAmount === 0) return true;
  if (decimalAmount <= maxDecimals) return true;
  displayMessage(`Max ${maxDecimals} decimals`, forceHideMessage);
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
export function getDecimalAmount(str: string, useComma: boolean | undefined) {
  const splitStr = useComma ? str.split(",") : str.split(".");
  if (splitStr.length <= 1) return 0;
  return splitStr[1].length;
}

function validateZeros(str: string) {
  let count = 0;
  for (const char of str) {
    if (char === "0") {
      count++;
    } else {
      break;
    }
  }

  return count;
}
