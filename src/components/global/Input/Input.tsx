"use client";
import { twMerge } from "tailwind-merge";
import { forwardRef, useEffect, useRef, useState, useCallback } from "react";
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
  dynamicPrefix?: string;
  dynamicSuffix?: string;
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
    inputMode,
    disableSelection,
    pattern,
    onChange,
    onFocus,
    onBlur,
    onKeyDown,
    focusNextInputOnEnter,
    smartFocusNextInput,
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

  const validate = validateInput;

  useEffect(() => {
    if (typeof value === "string") {
      if (value === "" || validate(value)) {
        setInputValue(value);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const debouncedFunction = debounce(() => {
    setIsMessageVisible(false);
  }, 3000);

  function displayMessage(newMessage: string, forceHideMessage: boolean) {
    if (typeof disableFeedback !== "undefined" && disableFeedback) return;
    if (forceHideMessage) return;
    setMessage(newMessage);
    setIsMessageVisible(true);
    debouncedFunction();
  }
  function getPlaceholder() {
    if (placeholder) {
      if (useComma) placeholder.replace(".", ",");
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
          "absolute -bottom-3 right-1 z-10 line-clamp-1 rounded-md bg-first px-1 py-0.5 text-center text-3xs text-active transition-opacity duration-500",
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
          if (e.key === "Enter") {
            inputRef.current?.blur();
            if (focusNextInputOnEnter) {
              if (inputRef.current) {
                findNextInputAndFocus(inputRef.current);
              }
            }
          }
          onKeyDown && onKeyDown(e);
        }}
        onChange={(e) => {
          const value = e.target.value;
          smartFocus(value);
          if (value === "" || validateInput(value)) {
            setInputValue(value);
            handlers.handleChange(e, getPlaceholder());
            onChange && onChange(e);
          }
        }}
        onFocus={(e) => {
          const length1 = dynamicPrefix ? dynamicPrefix.length : 0;
          const length2 = dynamicSuffix ? -dynamicSuffix.length : 0;

          flushSync(() => {
            setInputValue((prev) => prev.slice(length1, length2));
          });

          handlers.handleFocus(e, disableSelection);
          onFocus && onFocus(e);
        }}
        onBlur={(e) => {
          if (inputValue !== "") {
            setInputValue((prev) =>
              [dynamicPrefix, prev, dynamicSuffix].join("")
            );
          }

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
          "rounded-md border border-solid bg-white px-2 py-1.5 text-center text-sm text-black placeholder-gray-500",
          "focus:outline focus:outline-1 focus:outline-[var(--text-active)]",
          styling?.main
        )}
      />
    </div>
  );

  function smartFocus(newInput: string) {
    if (smartFocusNextInput && inputRef.current) {
      const input = inputRef.current;
      const number = useComma
        ? Number(newInput.replace(",", "."))
        : Number(newInput);

      if ((onlyIntegers || onlyNumbers) && isNaN(number)) {
        return;
      } else if (onlyLetters && !isNaN(number)) {
        return;
      }

      if (maxCharacters && newInput.length >= maxCharacters) {
        findNextInputAndFocus(input);
        return;
      }

      if ((onlyIntegers || onlyNumbers) && !isNaN(number)) {
        if (maxValue && number >= maxValue / 10) {
          if (maxDecimals) {
            const decimalAmount = getDecimalAmount(newInput, useComma);
            if (decimalAmount >= maxDecimals) {
              findNextInputAndFocus(input);
              return;
            }
          } else {
            findNextInputAndFocus(input);
            return;
          }
        }
      }
      if (maxDecimals && getDecimalAmount(newInput, useComma) >= maxDecimals) {
        findNextInputAndFocus(input);
        return;
      }
    }
  }

  function findNextInputAndFocus(element: HTMLInputElement) {
    const inputs = Array.from(document.querySelectorAll("input"));
    const index = inputs.indexOf(element);
    const next = inputs[index + 1] || null;
    if (next) {
      next.focus();
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
      try {
        throw new Error(
          "Please only use one input validation method (onlyIntegers, onlyNumbers or onlyLetters)"
        );
      } catch (err) {
        if (err instanceof Error) console.log(err.message);
      }
    }
    if (
      (typeof minValue !== "undefined" ||
        typeof maxValue !== "undefined" ||
        typeof maxDecimals !== "undefined" ||
        typeof useComma !== "undefined") &&
      [onlyIntegers, onlyNumbers].filter((item) => item).length === 0
    ) {
      try {
        throw new Error(
          "minValue, maxValue, maxDecimals and useComma only works with the following validation methods: onlyIntegers and onlyNumbers"
        );
      } catch (err) {
        if (err instanceof Error) console.log(err.message);
      }
    }
  }
  function debounce(fn: () => void, delay: number) {
    let timer: NodeJS.Timeout | null;
    return () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(fn, delay);
    };
  }
});

export default Input;
