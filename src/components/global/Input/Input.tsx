"use client";
import { twMerge } from "tailwind-merge";
import { forwardRef, useRef, useState } from "react";
import { handlers } from "./handlers";
import { inputValidation } from "./inputValidation";

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
    className,
    inputMode,
    pattern,
    onChange,
    onFocus,
    onBlur,
    placeholder,
    value,
    children,
    ...props
  },
  ref
) {
  const [inputValue, setInputValue] = useState("");

  propValidation();

  const inputRef = useRef<HTMLInputElement | null>(null);

  function getInputMode() {
    if (onlyIntegers || onlyNumbers) {
      return "decimal";
    } else return inputMode;
  }
  function getPattern() {
    if (onlyIntegers) {
      return "[0-9]*";
    } else if (onlyNumbers) {
      const sep = useComma ? "," : ".";
      if (minValue && minValue >= 0) return `[0-9]${sep}*`;
      return `-?[0-9]${sep}*`;
    } else return pattern;
  }

  return (
    <>
      <input
        value={inputValue}
        spellCheck={false}
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
        {...props}
        onChange={(e) => {
          const value = e.target.value;
          if (
            value === "" ||
            (inputValidation.maxCharacters(value, maxCharacters) &&
              inputValidation.onlyLetters(value, onlyLetters) &&
              inputValidation.onlyIntegers(value, onlyIntegers) &&
              inputValidation.onlyNumbers(value, onlyNumbers, useComma) &&
              inputValidation.minMaxValue(value, minValue, maxValue) &&
              inputValidation.maxDecimals(value, maxDecimals, useComma))
          ) {
            setInputValue(value);
            handlers.handleChange(e, placeholder);
            onChange && onChange(e);
          }
        }}
        onFocus={(e) => {
          handlers.handleFocus(e);
          onFocus && onFocus(e);
        }}
        onBlur={(e) => {
          handlers.handleBlur(e, placeholder);
          onBlur && onBlur(e);
        }}
        placeholder={placeholder && placeholder}
        className={twMerge(
          "rounded-md border border-solid bg-white py-1.5 text-center text-sm text-black placeholder-gray-500 outline-none",
          className
        )}
      />
    </>
  );

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
});

export default Input;
