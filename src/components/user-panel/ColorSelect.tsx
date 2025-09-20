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

export default function ColorSelect({
  selectedColor,
  onSelectionChange,
  label = 'Choose a color',
  className = '',
}: ColorSelectProps) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <Label className="text-sm font-medium text-gray-700">{label}</Label>
      <Select
        selectedKey={selectedColor}
        onSelectionChange={onSelectionChange}
        className="w-full" // Adjust width as needed
      >
        <Button className="flex w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none">
          <SelectValue className="flex items-center gap-2">
            {(item) => (
              <>
                {/* <span
                  className={`h-4 w-4 rounded ${item ? colorOptions.find((opt) =>opt?.value===item?.selectedItem)?.bgColorClass || 'bg-gray-300' : 'bg-gray-300'}`}
                /> */}
                {item || 'Select a color'}
              </>
            )}
          </SelectValue>
          <FaChevronDown className="h-4 w-4 text-gray-400" aria-hidden="true" />
        </Button>
        <Popover className="w-[--trigger-width] rounded-md border border-gray-300 bg-white py-1 shadow-lg">
          <ListBox className="p-1">
            {colorOptions.map((option) => (
              <ListBoxItem
                key={option.value}
                id={option.value}
                className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 focus:bg-blue-50"
              >
                <span className={`h-4 w-4 rounded ${option.bgColorClass}`} />
                {option.label}
              </ListBoxItem>
            ))}
          </ListBox>
        </Popover>
      </Select>
    </div>
  );
}
