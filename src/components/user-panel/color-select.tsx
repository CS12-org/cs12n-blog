'use client';

import React from 'react';
import { Button, ListBox, ListBoxItem, Popover, Select, SelectValue } from 'react-aria-components';
import { FaChevronDown } from 'react-icons/fa6';

type ColorOption = {
  label: string;
  value: string;
  bgColorClass: string;
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
  selectedColor?: string;
  onSelectionChange: (key: any) => void;
  label?: string;
  className?: string;
}

export default function ColorSelect({ selectedColor, onSelectionChange, className = '' }: ColorSelectProps) {
  return (
    <div className={`mx-2.5 flex flex-col gap-1 md:mx-0 lg:mx-0 ${className}`}>
      <Select selectedKey={selectedColor} onSelectionChange={onSelectionChange} className="w-full">
        <Button className="bg-mantle selected:bg-mantle flex w-full items-center justify-between rounded-md px-2 py-2.5 text-sm focus:outline-none">
          <SelectValue />
          <FaChevronDown className="h-3 w-3 text-gray-400" aria-hidden="true" />
        </Button>

        <Popover className="bg-crust w-[--trigger-width] rounded-md py-1 shadow-lg">
          <ListBox className="p-1">
            {colorOptions.map((option) => (
              <ListBoxItem
                key={option.value}
                id={option.value}
                className="data-[hovered]:bg-mantle aria-selected:bg-mantle flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm"
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
