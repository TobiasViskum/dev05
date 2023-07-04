"use client";
import { twMerge } from "tailwind-merge";
import { forwardRef, useEffect, useRef, useState } from "react";
import { handlers } from "./handlers";
import { inputValidation } from "./inputValidation";
import { useDebouncedState } from "@mantine/hooks";

interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  children?: React.ReactNode;
  onlyIntegers?: boolean;
  onlyNumbers?: boolean;
  onlyLetters?: boolean;
  maxCharacters?: number;
  minValue?: number;
  maxValue?: number;
  useComma?: boolean;
  maxDecimals?: number;
  feedbackClassName?: string;
  showFullKeyboard?: boolean;
  disableFeedback?: boolean;
  disableSelection?: boolean;
  focusNextElementOnEnter?: boolean;
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
    showFullKeyboard,
    disableFeedback,
    className,
    inputMode,
    feedbackClassName,
    disableSelection,
    pattern,
    onChange,
    onFocus,
    onBlur,
    onKeyDown,
    focusNextElementOnEnter,
    placeholder,
    enterKeyHint,
    value,
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

  function displayMessage(newMessage: string) {
    if (typeof disableFeedback !== "undefined" && disableFeedback) return;
    setMessage(newMessage);
    setIsMessageVisible(true);
    debouncedFunction();
  }

  return (
    <div className="relative h-full w-full">
      <p
        className={twMerge(
          "absolute -bottom-3 right-2 z-10 rounded-md bg-first px-1 py-0.5 text-center text-3xs text-active transition-opacity duration-500",
          isMessageVisible ? "opacity-100" : "opacity-0",
          feedbackClassName
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
            if (focusNextElementOnEnter) {
              if (inputRef.current) {
                const nextElement = findNextInput(inputRef.current);
                if (nextElement) nextElement.focus();
              }
            }
          }
          onKeyDown && onKeyDown(e);
        }}
        onChange={(e) => {
          const value = e.target.value;
          if (value === "" || validateInput(value)) {
            setInputValue(value);
            handlers.handleChange(e, placeholder);
            onChange && onChange(e);
          }
        }}
        onFocus={(e) => {
          handlers.handleFocus(e, disableSelection);
          onFocus && onFocus(e);
        }}
        onBlur={(e) => {
          handlers.handleBlur(e, placeholder);

          onBlur && onBlur(e);
        }}
        placeholder={placeholder && placeholder}
        className={twMerge(
          "rounded-md border border-solid bg-white px-2 py-1.5 text-center text-sm text-black placeholder-gray-500 focus:outline focus:outline-[var(--text-active)]",
          className
        )}
      />
    </div>
  );
  function findNextInput(element: HTMLInputElement) {
    const inputs = Array.from(document.querySelectorAll("input"));
    const index = inputs.indexOf(element);
    return inputs[index + 1] || null;
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

  function validateInput(value: string) {
    const validateResult =
      inputValidation.maxCharacters(value, maxCharacters, displayMessage) &&
      inputValidation.onlyLetters(value, onlyLetters, displayMessage) &&
      inputValidation.onlyIntegers(value, onlyIntegers, displayMessage) &&
      inputValidation.onlyNumbers(
        value,
        onlyNumbers,
        useComma,
        displayMessage
      ) &&
      inputValidation.minMaxValue(value, minValue, maxValue, displayMessage) &&
      inputValidation.maxDecimals(value, maxDecimals, useComma, displayMessage);
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
