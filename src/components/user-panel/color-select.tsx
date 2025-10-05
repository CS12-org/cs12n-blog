'use client'; // If using Next.js

import React, { useState } from 'react';
import { Button, Label, ListBox, ListBoxItem, Popover, Select, SelectValue } from 'react-aria-components';
import { FaChevronDown } from 'react-icons/fa6';

type ColorOption = {
  label: string;
  value: string;
  bgColorClass: string; // Tailwind class, e.g., 'bg-lavender'
};

const colorOptions: ColorOption[] = [
  { label: 'lavender', value: 'lavender', bgColorClass: 'bg-lavender' },
  { label: 'maroon', value: 'maroon', bgColorClass: 'bg-maroon' },
  { label: 'teal', value: 'teal', bgColorClass: 'bg-teal' },
  { label: 'peach', value: 'peach', bgColorClass: 'bg-peach' },
  { label: 'sky', value: 'sky', bgColorClass: 'bg-sky' },
  { label: 'mauve', value: 'mauve', bgColorClass: 'bg-mauve' },
  { label: 'pink', value: 'pink', bgColorClass: 'bg-pink' },
  { label: 'flamingo', value: 'flamingo', bgColorClass: 'bg-flamingo' },
];

interface ColorSelectProps {
  selectedColor?: string; // Optional: For controlled mode
  onSelectionChange: (key: any) => void; // Callback for selection
  label?: string;
  className?: string;
}

export default function ColorSelect({ selectedColor, onSelectionChange, className = '' }: ColorSelectProps) {
  return (
    <div className={`mx-2.5 flex flex-col gap-1 ${className} `}>
      <Select
        selectedKey={selectedColor}
        onSelectionChange={onSelectionChange}
        className="w-full" // Adjust width as needed
      >
        <Button className="bg-crust selected:bg-mantle flex w-[80px] w-full items-center justify-between rounded-md px-2 py-2 text-sm focus:outline-none">
          <SelectValue>
            {({ defaultChildren, selectedItem, selectedText }) => {
              // const color = colorOptions.find((opt) => opt?.value === selectedItem)?.bgColorClass;
              console.log(selectedText, 'selectedItem');

              return <span className={`h-4 w-4 rounded`} />;
            }}
          </SelectValue>
          <FaChevronDown className="h-4 w-4 text-gray-400" aria-hidden="true" />
        </Button>
        <Popover className="bg-crust w-[--trigger-width] rounded-md py-1 shadow-lg">
          <ListBox className="p-1">
            {colorOptions.map((option) => (
              <ListBoxItem
                key={option.value}
                id={option.value}
                className={`data-[hovered]:bg-mantle aria-selected:bg-mantle data-[focused]:bg-mantle flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm data-[focused]:outline-none data-[hovered]:ring-0`}
              >
                <span className={`h-4 w-4 rounded-tr rounded-bl ${option.bgColorClass}`} />
                {option.label}
              </ListBoxItem>
            ))}
          </ListBox>
        </Popover>
      </Select>
    </div>
  );
}
