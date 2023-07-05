"use client";

import { forwardRef, useEffect, useRef, useState } from "react";
import { Input } from "../Input";
import { twJoin, twMerge } from "tailwind-merge";
import { Button } from "../Button";
import { CustomInputProps } from "../Input/Input";

interface DropdownItem {
  title: string;
  id: number;
  description?: string;
}

interface InputProps
  extends React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    CustomInputProps {
  children?: React.ReactNode;
  dropDownItems?: DropdownItem[];
  disableCreate?: boolean;
  onUpdate?: ({ title, description, id }: DropdownItem) => void;
  styling?: {
    main?: string;
    feedbackText?: string;
    dropdownContainer?: string;
    item?: string;
    itemTitle?: string;
    itemDescription?: string;
    itemFocus?: string;
    itemTitleFocus?: string;
    itemDescriptionFocus?: string;
  };
}

const DropDown = forwardRef<HTMLInputElement, InputProps>(function DropDown(
  {
    children,
    ref,
    onChange,
    onFocus,
    onUpdate,
    styling,
    className,
    focusNextInputOnEnter,
    disableCreate,
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
  const canClose = useRef(true);
  const inputRef = useRef<HTMLInputElement | null>(null);

  function getAmountOfFoundItems() {
    return (
      dropDownItems &&
      dropDownItems.filter(
        (item) =>
          item.title.toLowerCase().includes(searchInput.toLowerCase()) ||
          item.id?.toString() === searchInput
      ).length
    );
  }

  useEffect(() => {
    if (hasMounted.current) {
      const dropDownItem = dropDownItems?.find(
        (obj) => obj.title === searchInput
      );
      if (onUpdate && hasSentUpdate.current === false) {
        if (dropDownItem) {
          onUpdate(dropDownItem);
        } else {
          onUpdate({ title: searchInput, id: -1 });
        }
      }
    }

    hasSentUpdate.current = false;
    if (dropDownItems) {
      let newItems = dropDownItems.filter(
        (item) =>
          item.title.toLowerCase().includes(searchInput.toLowerCase()) ||
          item.id?.toString() === searchInput
      );
      if (newItems.length === 0 && disableCreate !== true) {
        newItems = [{ title: `Create: "${searchInput}"`, id: 1 }];
      }
      setItems(newItems);
    }
  }, [searchInput, dropDownItems, onUpdate, disableCreate]);
  useEffect(() => {
    if (isDropDownVisible) {
      setFocusedItem(null);
    }
  }, [isDropDownVisible]);

  useEffect(() => {
    if (focusedItem === null && document.activeElement !== inputRef.current) {
      setIsDropDownVisible(false);
    }
  }, [focusedItem]);

  useEffect(() => {
    document.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      if (target.ariaLabel !== "dropDownItem" && target !== inputRef.current) {
        setIsDropDownVisible(false);
      }
    });

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
            if (canClose.current === false) {
              setIsDropDownVisible(false);
              canClose.current = true;
            }
          }
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div
      className={twMerge("relative h-full w-full @container", styling?.main)}
      ref={containerRef}
    >
      <Input
        focusNextInputOnEnter={focusNextInputOnEnter}
        maxCharacters={55}
        onKeyDown={(e) => {
          const target = e.target as HTMLInputElement;
          if (e.key === "ArrowUp") {
            e.preventDefault();
            handleUpKey(e);
          } else if (e.key === "ArrowDown") {
            e.preventDefault();
            handleDownKey(e);
          } else if (e.key === "Enter") {
            setIsDropDownVisible(false);
            target.blur();
          } else if (e.key === "Tab") {
            if (e.shiftKey) {
              setIsDropDownVisible(false);
            }
          }
        }}
        // onBlur={() => {
        //   if (focusedItem === null) {
        //     setIsDropDownVisible(false);
        //   }
        // }}
        enterKeyHint="search"
        value={searchInput}
        ref={(node) => {
          inputRef.current = node;
          if (typeof forwardRef === "function") {
            forwardRef(node);
          } else if (forwardRef) {
            forwardRef.current = node;
          }
        }}
        onChange={(e) => {
          handleChange(e);

          onChange && onChange(e);
        }}
        onFocus={(e) => {
          handleFocus(e);
          onFocus && onFocus(e);
        }}
        styling={{ main: styling?.main }}
        {...props}
      />
      <div
        className="absolute mt-2 grid w-full justify-items-center transition-grid"
        style={{
          gridTemplateRows: isDropDownVisible ? "1fr" : "0fr",
          transitionDuration: `${Math.min(500, 250 + items.length * 25)}ms`,
        }}
      >
        <div
          className={twJoin(
            " grid max-h-64 w-full origin-top justify-items-center gap-x-2 gap-y-2 overflow-hidden rounded-md bg-first",
            "px-2 transition-all [&>*:nth-child(1)]:mt-2 @md:[&>*:nth-child(2)]:mt-2",
            "[&>*:nth-last-child(1)]:mb-2 @md:[&>*:nth-last-child(2)]:mb-2",
            items.length === 1 ? "grid-cols-1" : "@md:grid-cols-2",
            styling?.dropdownContainer
          )}
        >
          {items.map((item, index) => {
            return (
              <Button
                onFocus={() => {
                  setFocusedItem(item);
                }}
                onClick={() => {
                  setIsDropDownVisible(false);
                  if (inputRef.current && focusNextInputOnEnter) {
                    const next = findNextInput(inputRef.current);
                    if (next) {
                      next.focus();
                    }
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Tab") {
                    if (!e.shiftKey) {
                      if (item.id === items.slice(-1)[0].id) {
                        setFocusedItem(null);
                      }
                    } else if (e.shiftKey) {
                      if (item.id === items[0].id) {
                        setFocusedItem(null);
                      }
                    }
                  } else if (e.key === "Enter" || e.key === " ") {
                    setIsDropDownVisible(false);
                    if (item.title.includes('Create: "')) {
                      setSearchInput(item.title.slice(9, -1));
                    } else {
                      setSearchInput(item.title);
                    }

                    if (e.key === "Enter") {
                      if (inputRef.current && focusNextInputOnEnter) {
                        const next = findNextInput(inputRef.current);
                        if (next) {
                          next.focus();
                        }
                      }
                    }
                  }
                }}
                aria-label="dropDownItem"
                id={item.id?.toString()}
                tabIndex={isDropDownVisible ? 0 : -1}
                key={index}
                styling={{
                  mainClass: twMerge(
                    "overflow-hidden border-inactive bg-first",
                    items.length === 1 ? "w-full @md:w-1/2" : "w-full",
                    styling?.item
                  ),
                  mainFocusClass: twMerge(
                    item.id === focusedItem?.id
                      ? "ring-blue-500"
                      : styling?.itemFocus
                  ),
                }}
              >
                <p
                  id={item.id?.toString()}
                  aria-label="dropDownItem"
                  className={twMerge(
                    "overflow-hidden break-words text-sm",
                    styling?.itemTitle,
                    item.id === focusedItem?.id
                      ? twMerge("", styling?.itemTitleFocus)
                      : ""
                  )}
                >
                  {item.title}
                </p>
                <p
                  id={item.id?.toString()}
                  aria-label="dropDownItem"
                  className={twMerge(
                    "text-2xs text-second",
                    styling?.itemDescription,
                    item.id === focusedItem?.id
                      ? twMerge("", styling?.itemDescriptionFocus)
                      : ""
                  )}
                >
                  {item.description}
                </p>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
  function findNextInput(element: HTMLInputElement) {
    const inputs = Array.from(document.querySelectorAll("input"));
    const index = inputs.indexOf(element);
    return inputs[index + 1] || null;
  }
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchInput(e.target.value);
  }
  function handleFocus(e: React.FocusEvent<HTMLInputElement>) {
    setIsDropDownVisible(true);
  }
  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    // setTimeout(() => {
    //   if (canClose.current) {
    //     setIsDropDownVisible(false);
    //   }
    // }, 25);
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
            setFocusedItem(dropDownItems[dropDownItems.length - 2]);
          } else {
            setFocusedItem(dropDownItems[i - 2]);
          }
        } else {
          if (dropDownItems[i - 2] == undefined) {
            setFocusedItem(dropDownItems[dropDownItems.length - 1]);
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
