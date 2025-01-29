import React, { useState, useRef, useEffect } from "react";
import clsx from "clsx";
type NonEmptyArray<T> = [T, ...T[]];
interface MenuBarProps {
  items: NonEmptyArray<string>;
  defaultItem: string | undefined;
  onTabChange?: (activeTab: string) => void;
}
const MenuBar = ({ items, defaultItem, onTabChange }: MenuBarProps) => {
  //runtime validation
  if (items.length < 1) {
    throw new Error(`MenuBar: items array must contain atleast one item `);
  }
  if (defaultItem && !items.includes(defaultItem)) {
    throw new Error(
      `MenuBar: defaultItem "${defaultItem}" can not be found in list of items given in [${items}]`
    );
  }
  if (!defaultItem) {
    defaultItem = items[0];
  }
  //basic states
  const [isActive, setActive] = useState<string>(defaultItem);
  const [borderWidth, setBorderWidth] = useState<number>(0);
  const [borderLeft, setBorderLeft] = useState<number>(0);
  const itemsRef = useRef<Map<string, HTMLButtonElement> | null>(null);

  //get the latest mapping between items and ref
  const getMap = () => {
    if (!itemsRef.current) {
      itemsRef.current = new Map();
    }
    return itemsRef.current;
  };

  //update the slider states when isActive changes
  useEffect(() => {
    if (onTabChange) {
      onTabChange(isActive);
    }

    const map = getMap();
    const activeButton = map.get(isActive);
    if (activeButton) {
      setBorderWidth(activeButton.offsetWidth);
      setBorderLeft(activeButton.offsetLeft);
    }
  }, [isActive]);

  return (
    <div className="flex relative gap-6 pb-2 mb-20">
      {items.map((item) => {
        return (
          <button
            key={item}
            ref={(element: HTMLButtonElement | null) => {
              if (!element) {
                throw Error("MenuBar: Html button element ref is null");
              }
              const map = getMap();
              map.set(item, element);
              return () => {
                map.delete(item);
              };
            }}
            className={clsx(
              "text-4 text-item-foreground transition-colors",
              isActive === item && "text-white"
            )}
            onClick={() => setActive(item)}
          >
            {item}
          </button>
        );
      })}
      {/* Animated border line */}
      <div
        className="absolute bottom-0 h-[2px] bg-white transition-all duration-300 z-10 ease-in-out"
        style={{
          width: `${borderWidth}px`,
          left: `${borderLeft}px`,
        }}
      />
      {/* Base border line */}
      <div className="absolute bottom-0 h-[2px] bg-item transition-all duration-300 w-full" />
    </div>
  );
};

export default MenuBar;
