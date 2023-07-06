"use client";
import { twJoin, twMerge } from "tailwind-merge";
import { forwardRef, useEffect, useRef, useState } from "react";
import { handlers } from "./handlers";
import { getDecimalAmount, inputValidation } from "./inputValidation";
import { flushSync } from "react-dom";

export interface CustomInputProps {
  onlyIntegers?: boolean;
  onlyNumbers?: boolean;
  onlyLetters?: boolean;
  maxCharacters?: number;
  minValue?: number;
  maxValue?: number;
  useComma?: boolean;
  maxDecimals?: number;
  showFullKeyboard?: boolean;
  disableFeedback?: boolean;
  disableSelection?: boolean;
  focusNextInputOnEnter?: boolean;
  smartFocusNextInput?: boolean;
  smartBlur?: boolean;
  dynamicPrefix?: string;
  dynamicSuffix?: string;
  removeDefaultStyling?: boolean;
  allowDanishCharacters?: boolean;
  applyAutocompleteStyling?: boolean;
}

interface InputProps
  extends React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    CustomInputProps {
  children?: React.ReactNode;
  styling?: {
    main?: string;
    feedbackText?: string;
  };
}

let main1Tw =
  "rounded-md border border-solid bg-white px-2 py-1.5 text-center text-sm text-black";
let main2Tw =
  "placeholder-gray-500 focus:outline focus:outline-1 focus:outline-[var(--text-active)]";
const mainTw = twJoin(main1Tw, main2Tw);

const feedbackTw =
  "rounded-md bg-first px-1 py-0.5 text-active -bottom-2.5 right-1 text-center text-3xs";

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    onlyIntegers,
    onlyNumbers,
    onlyLetters,
    maxCharacters,
    minValue,
    maxValue,
    useComma,
    maxDecimals,
    dynamicPrefix,
    dynamicSuffix,
    showFullKeyboard,
    disableFeedback,
    className,
    allowDanishCharacters,
    inputMode,
    removeDefaultStyling,
    disableSelection,
    pattern,
    onChange,
    onFocus,
    onBlur,
    onKeyDown,
    focusNextInputOnEnter,
    applyAutocompleteStyling,
    smartFocusNextInput,
    smartBlur,
    placeholder,
    enterKeyHint,
    value,
    styling,
    children,
    ...props
  },
  ref
) {
  const [inputValue, setInputValue] = useState("");
  const [isMessageVisible, setIsMessageVisible] = useState(false);
  const [message, setMessage] = useState("");

  propValidation();

  const inputRef = useRef<HTMLInputElement | null>(null);
  const autocompleteTw =
    "outline-none text-first pb-3 autofill:bg-first autofill:hover:bg-first autofill:focus:bg-first autofill:active:bg-first [transition:_background-color_9999s_ease-in-out_0s] autofill:text-first autofill:hover:text-first autofill:focus:text-first autofill:active:text-first autofill:[-webkit-text-fill-color:_var(--text-first)]";

  const validate = validateInput;

  useEffect(() => {
    if (typeof value === "string") {
      if (value === "" || validate(value)) {
        if (value === "") {
          // setInputValue(value);
        } else {
          if (document.activeElement !== inputRef.current) {
            setInputValue([dynamicPrefix, value, dynamicSuffix].join(""));
          }
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const debouncedFunction = debounce(() => {
    setIsMessageVisible(false);
  }, 3000);

  function prettifyInputNumber(newInput: string) {
    if (onlyIntegers || onlyNumbers) {
      let tempInput = Number(newInput.replace(",", ".")).toString();
      tempInput = Number(tempInput).toString();
      if (useComma) tempInput = tempInput.replace(".", ",");
      return tempInput;
    } else {
      return newInput;
    }
  }
  function removePrefixes() {
    const length1 = dynamicPrefix ? dynamicPrefix.length : 0;
    const length2 = dynamicSuffix ? -dynamicSuffix.length : inputValue.length;

    flushSync(() => {
      setInputValue((prev) => prev.slice(length1, length2));
    });
  }
  function addPrefixes() {
    if (inputValue !== "") {
      if (onlyIntegers || onlyNumbers) {
        let tempInput = prettifyInputNumber(inputValue);

        setInputValue(
          [
            dynamicPrefix ? dynamicPrefix : "",
            tempInput,
            dynamicSuffix ? dynamicSuffix : "",
          ].join("")
        );
      } else {
        setInputValue(
          [
            dynamicPrefix ? dynamicPrefix : "",
            inputValue,
            dynamicSuffix ? dynamicSuffix : "",
          ].join("")
        );
      }
    }
  }

  function displayMessage(newMessage: string, forceHideMessage: boolean) {
    if (typeof disableFeedback !== "undefined" && disableFeedback) return;
    if (forceHideMessage) return;
    setMessage(newMessage);
    setIsMessageVisible(true);
    debouncedFunction();
  }
  function getPlaceholder() {
    if (placeholder) {
      if (useComma && (onlyIntegers || onlyNumbers))
        placeholder.replace(".", ",");

      if (placeholder === "" || validateInput(placeholder, true)) {
        return [dynamicPrefix, placeholder, dynamicSuffix].join("");
      }
      return "Invalid";
    } else {
      return "";
    }
  }

  return (
    <div className="relative">
      <p
        className={twMerge(
          !removeDefaultStyling && feedbackTw,
          "absolute z-10 line-clamp-1 transition-opacity duration-500",
          isMessageVisible ? "opacity-100" : "opacity-0",
          styling?.feedbackText
        )}
      >
        {message}
      </p>
      <input
        {...props}
        value={inputValue}
        ref={(node) => {
          inputRef.current = node;
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        inputMode={getInputMode()}
        pattern={getPattern()}
        enterKeyHint={enterKeyHint}
        onKeyDown={(e) => {
          if (e.key === "Enter" && inputRef.current) {
            inputRef.current.blur();
            if (focusNextInputOnEnter) {
              findNextInputAndFocus(inputRef.current);
            }
          }
          onKeyDown && onKeyDown(e);
        }}
        onChange={(e) => {
          const value = e.target.value;
          const didChangeFocus = smartFocus(value);
          if (value === "" || validateInput(value)) {
            if (didChangeFocus) {
              flushSync(() => {
                setInputValue(prettifyInputNumber(value));
              });
            } else {
              setInputValue(value);
            }

            handlers.handleChange(e, getPlaceholder());
            onChange && onChange(e);
          }
        }}
        onFocus={(e) => {
          removePrefixes();

          handlers.handleFocus(e, disableSelection);
          onFocus && onFocus(e);
        }}
        onBlur={(e) => {
          addPrefixes();

          handlers.handleBlur(e, getPlaceholder());
          if (onlyIntegers || onlyNumbers) {
            const endsWithSeparator = useComma
              ? inputValue.endsWith(",")
              : inputValue.endsWith(".");

            if (endsWithSeparator) setInputValue((prev) => prev.slice(0, -1));
          }
          onBlur && onBlur(e);
        }}
        placeholder={getPlaceholder()}
        className={twMerge(
          !removeDefaultStyling && mainTw,
          applyAutocompleteStyling && autocompleteTw,
          styling?.main
        )}
      />
    </div>
  );

  function smartFocus(newInput: string) {
    if ((smartFocusNextInput || smartBlur) && inputRef.current) {
      const smartAction = () => {
        if (smartBlur && inputRef.current) {
          inputRef.current.blur();
        } else if (inputRef.current) {
          findNextInputAndFocus(inputRef.current);
        }
      };

      const number = useComma
        ? Number(newInput.replace(",", "."))
        : Number(newInput);

      if ((onlyIntegers || onlyNumbers) && isNaN(number)) {
        return false;
      } else if (onlyLetters && !isNaN(number)) {
        return false;
      }

      if (maxCharacters && newInput.length >= maxCharacters) {
        smartAction();
        return true;
      }

      if ((onlyIntegers || onlyNumbers) && !isNaN(number)) {
        if (maxValue && number >= maxValue / 10) {
          if (maxDecimals) {
            const decimalAmount = getDecimalAmount(newInput, useComma);
            if (decimalAmount >= maxDecimals) {
              smartAction();
              return true;
            }
          } else {
            smartAction();
            return true;
          }
        }
      }
      if (maxDecimals && getDecimalAmount(newInput, useComma) >= maxDecimals) {
        smartAction();
        return true;
      }
    }
  }

  function findNextInputAndFocus(element: HTMLInputElement) {
    const inputs = Array.from(document.querySelectorAll("input"));
    const index = inputs.indexOf(element);
    const next = inputs[index + 1] || null;
    if (next) {
      next.focus();
    } else {
      if (inputRef.current) {
        inputRef.current.blur();
      }
    }
  }

  function getInputMode() {
    if (showFullKeyboard) return inputMode;
    if (onlyIntegers || onlyNumbers) {
      return "decimal";
    } else return inputMode;
  }
  function getPattern() {
    if (showFullKeyboard) return pattern;
    if (onlyIntegers) {
      return "[0-9]*";
    } else if (onlyNumbers) {
      const sep = useComma ? "," : ".";
      return `[0-9]${sep}*`;
    } else return pattern;
  }

  function validateInput(value: string, forceHideMessage: boolean = false) {
    const validateResult =
      inputValidation.maxCharacters(
        value,
        maxCharacters,
        displayMessage,
        forceHideMessage
      ) &&
      inputValidation.onlyLetters(
        value,
        onlyLetters,
        allowDanishCharacters,
        displayMessage,
        forceHideMessage
      ) &&
      inputValidation.onlyIntegers(
        value,
        onlyIntegers,
        displayMessage,
        forceHideMessage
      ) &&
      inputValidation.onlyNumbers(
        value,
        onlyNumbers,
        useComma,
        displayMessage,
        forceHideMessage
      ) &&
      inputValidation.minMaxValue(
        value,
        minValue,
        maxValue,
        useComma,
        displayMessage,
        forceHideMessage
      ) &&
      inputValidation.maxDecimals(
        value,
        maxDecimals,
        useComma,
        displayMessage,
        forceHideMessage
      );
    return validateResult;
  }

  function propValidation() {
    if (
      [onlyIntegers, onlyNumbers, onlyLetters].filter((item) => item).length > 1
    ) {
      throw new Error(
        "Please only use one input validation method (onlyIntegers, onlyNumbers or onlyLetters)"
      );
    }
    if (
      (typeof minValue !== "undefined" ||
        typeof maxValue !== "undefined" ||
        typeof maxDecimals !== "undefined" ||
        typeof useComma !== "undefined") &&
      [onlyIntegers, onlyNumbers].filter((item) => item).length === 0
    ) {
      throw new Error(
        "minValue, maxValue, maxDecimals and useComma only works with the following validation methods: onlyIntegers and onlyNumbers"
      );
    }
    if (smartFocusNextInput && smartBlur) {
      throw new Error(
        "Cannot have both smartFocusNextInput and smartBlur enabled at the same time"
      );
    }
  }
  function debounce(fn: () => void, delay: number) {
    let timer: NodeJS.Timeout | null;
    return () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(fn, delay);
    };
  }
}) as React.ForwardRefExoticComponent<
  React.PropsWithoutRef<InputProps> & React.RefAttributes<HTMLInputElement>
> & {
  tw: { main: string; feedbackText: string };
};

Input.tw = {
  main: mainTw,
  feedbackText: feedbackTw,
};

export default Input;
