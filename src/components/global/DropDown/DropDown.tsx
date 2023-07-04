"use client";

import { forwardRef, useEffect, useRef, useState } from "react";
import { Input } from "../Input";
import { twJoin, twMerge } from "tailwind-merge";

interface DropdownItem {
  title: string;
  id?: number;
  description?: string;
}

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
  showFullKeyboard?: boolean;
  disableFeedback?: boolean;
  disableSelection?: boolean;
  focusNextElementOnEnter?: boolean;
  dropDownItems?: DropdownItem[];
  onUpdate?: ({ title, description, id }: DropdownItem) => void;
  styling?: {
    main?: string;
    feedback?: string;
    dropdownContainer?: string;
    dropdownItem?: string;
    dropDownItemTitle?: string;
    dropDownItemDescription?: string;
    dropDownItemFocus?: string;
    dropDownItemTitleFocus?: string;
    dropDownItemDescriptionFocus?: string;
  };
}

const DropDown = forwardRef<HTMLInputElement, InputProps>(function DropDown(
  {
    children,
    ref,
    onChange,
    onFocus,
    onBlur,
    onUpdate,
    styling,
    dropDownItems,
    ...props
  },
  forwardRef
) {
  const [isDropDownVisible, setIsDropDownVisible] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [items, setItems] = useState(dropDownItems ? dropDownItems : []);
  const [focusedItem, setFocusedItem] = useState<DropdownItem | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const hasSentUpdate = useRef(false);
  const hasMounted = useRef(false);

  useEffect(() => {
    if (hasMounted.current) {
      const dropDownItem = dropDownItems?.find(
        (obj) => obj.title === searchInput
      );
      if (onUpdate && hasSentUpdate.current === false) {
        if (dropDownItem) {
          onUpdate(dropDownItem);
        } else {
          onUpdate({ title: searchInput });
        }
      }
    }

    hasSentUpdate.current = false;
    if (dropDownItems) {
      let newItems = dropDownItems.filter(
        (item) =>
          item.title.includes(searchInput) ||
          item.id?.toString() === searchInput
      );
      if (newItems.length === 0) {
        newItems = [{ title: `Create: "${searchInput}"`, id: 1 }];
      }
      setItems(newItems);
    }
  }, [searchInput, dropDownItems, onUpdate]);
  useEffect(() => {
    if (isDropDownVisible) {
      setFocusedItem(null);
    }
  }, [isDropDownVisible]);

  useEffect(() => {
    hasMounted.current = true;
    if (containerRef.current) {
      containerRef.current.addEventListener("click", (e) => {
        const target = e.target as HTMLElement;

        if (target.ariaLabel === "dropDownItem") {
          const id = Number(target.id);
          const dropDownItem = dropDownItems?.find((obj) => obj.id === id);

          if (dropDownItem) {
            hasSentUpdate.current = true;
            onUpdate && onUpdate(dropDownItem);
            setSearchInput(dropDownItem.title);
          }
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div
      className={twMerge(
        "relative z-10 h-full w-full @container",
        styling?.main
      )}
      ref={containerRef}
    >
      <Input
        maxCharacters={55}
        onKeyDown={(e) => {
          const target = e.target as HTMLInputElement;
          if (e.key === "ArrowUp") {
            e.preventDefault();
            handleUpKey(e);
          } else if (e.key === "ArrowDown") {
            e.preventDefault();
            handleDownKey(e);
          } else if (e.key === "Enter" || e.key === " ") {
            if (focusedItem !== null) {
              setSearchInput(focusedItem.title);
              target.blur();
            }
          }
        }}
        enterKeyHint="search"
        value={searchInput}
        ref={forwardRef}
        onChange={(e) => {
          handleChange(e);

          onChange && onChange(e);
        }}
        onFocus={(e) => {
          handleFocus(e);
          onFocus && onFocus(e);
        }}
        onBlur={(e) => {
          handleBlur(e);
          onBlur && onBlur(e);
        }}
        {...props}
      />
      <div
        className={twJoin(
          "absolute mt-2 grid max-h-64 w-full origin-top justify-items-center gap-x-2 gap-y-2 overflow-y-auto bg-first px-2 pb-3 pt-1.5 transition-transform duration-500",
          items.length === 1 ? "grid-cols-1" : "@md:grid-cols-2",
          isDropDownVisible ? "scale-y-100" : "scale-y-0",
          styling?.dropdownContainer
        )}
      >
        {items.map((item, index) => {
          return (
            <button
              aria-label={items.length === 1 ? "" : "dropDownItem"}
              id={item.id?.toString()}
              tabIndex={-1}
              key={index}
              className={twMerge(
                "z-10 overflow-hidden rounded-md border border-inactive bg-first p-1 text-center",
                items.length === 1 ? "w-full @md:w-1/2" : "w-full",
                styling?.dropdownItem,
                item.id === focusedItem?.id
                  ? twMerge("ring-2", styling?.dropDownItemFocus)
                  : ""
              )}
            >
              <p
                id={item.id?.toString()}
                aria-label={items.length === 1 ? "" : "dropDownItem"}
                className={twMerge(
                  "z-10 overflow-hidden break-words text-sm",
                  styling?.dropDownItemTitle
                )}
              >
                {item.title}
              </p>
              <p
                id={item.id?.toString()}
                aria-label={items.length === 1 ? "" : "dropDownItem"}
                className={twMerge(
                  "z-10 text-2xs text-second",
                  styling?.dropDownItemDescription
                )}
              >
                {item.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchInput(e.target.value);
  }
  function handleFocus(e: React.FocusEvent<HTMLInputElement>) {
    setIsDropDownVisible(true);
  }
  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    setTimeout(() => {
      setIsDropDownVisible(false);
    }, 25);
  }
  function handleUpKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (dropDownItems) {
      if (focusedItem === null) {
        if (dropDownItems.length % 2 === 0) {
          setFocusedItem(dropDownItems[dropDownItems.length - 1]);
        } else {
          setFocusedItem(dropDownItems[dropDownItems.length - 2]);
        }
        return;
      }
      const i = dropDownItems.findIndex((obj) => obj.id === focusedItem.id);
      if (containerRef.current && containerRef.current.clientWidth < 16 * 28) {
        if (dropDownItems[i - 1] === undefined) {
          setFocusedItem(dropDownItems[dropDownItems.length - 1]);
        } else {
          setFocusedItem(dropDownItems[i - 1]);
        }
      } else {
        if ((i + 1) % 2 === 0) {
          if (dropDownItems[i - 2] == undefined) {
            setFocusedItem(dropDownItems[dropDownItems.length - 1]);
          } else {
            setFocusedItem(dropDownItems[i - 2]);
          }
        } else {
          if (dropDownItems[i - 2] == undefined) {
            setFocusedItem(dropDownItems[dropDownItems.length - 2]);
          } else {
            setFocusedItem(dropDownItems[i - 2]);
          }
        }
      }
    }
  }
  function handleDownKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (dropDownItems) {
      if (focusedItem === null) {
        setFocusedItem(dropDownItems[0]);
        return;
      }
      const i = dropDownItems.findIndex((obj) => obj.id === focusedItem.id);
      if (containerRef.current && containerRef.current.clientWidth < 16 * 28) {
        if (dropDownItems[i + 1] === undefined) {
          setFocusedItem(dropDownItems[0]);
        } else {
          setFocusedItem(dropDownItems[i + 1]);
        }
      } else {
        if ((i + 1) % 2 === 0) {
          if (dropDownItems[i + 2] == undefined) {
            setFocusedItem(dropDownItems[0]);
          } else {
            setFocusedItem(dropDownItems[i + 2]);
          }
        } else {
          if (dropDownItems[i + 2] == undefined) {
            setFocusedItem(dropDownItems[1]);
          } else {
            setFocusedItem(dropDownItems[i + 2]);
          }
        }
      }
    }
  }
});

export default DropDown;
