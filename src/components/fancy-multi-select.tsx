'use client';

import * as React from 'react';
import { Command as CommandPrimitive } from 'cmdk';

import { Command, CommandGroup, CommandItem, CommandList } from './command';
import twMerge from '@/lib/tw-merge';
import Button from './button';
import { HiHashtag } from 'react-icons/hi2';
import { PiXCircleDuotone } from 'react-icons/pi';
import { BiPlus } from 'react-icons/bi';

interface MultiSelectProps<T> {
  items: T[];
  selectedItems?: T[];
  onChange?: (selected: T[]) => void;
  getLabel: (item: T) => string;
  getValue: (item: T) => string;
  placeholder?: string;
  inputValue?: string;
  onInputChange?: (value: string) => void;
  createNewItem?: (value: string) => T;
}

export function MultiSelect<T>({
  items,
  selectedItems = [],
  onChange,
  getLabel,
  getValue,
  placeholder = 'Select...',
  inputValue: inputValueProp,
  onInputChange,
  createNewItem,
}: MultiSelectProps<T>) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);

  const isControlledInput = typeof inputValueProp === 'string' && !!onInputChange;
  const [internalInputValue, setInternalInputValue] = React.useState('');
  const inputValue = isControlledInput ? inputValueProp! : internalInputValue;

  const disableAddingTag = selectedItems.length >= 6;

  const handleInputChange = (val: string) => {
    if (isControlledInput) {
      onInputChange?.(val);
    } else {
      setInternalInputValue(val);
    }
  };

  const handleUnselect = (item: T) => {
    const updated = selectedItems?.filter((s) => getValue(s) !== getValue(item));
    onChange?.(updated);
  };

  const handleAddItem = () => {
    if (disableAddingTag) return;

    if (inputRef.current?.value.trim() !== '' && inputRef.current) {
      const newValue = inputRef.current.value.trim().replace(/\s+/g, '_');

      if (!selectedItems.some((s) => getLabel(s).toLowerCase() === newValue.toLowerCase())) {
        if (createNewItem) {
          const newTag = createNewItem(newValue);
          onChange?.([...selectedItems, newTag]);
          handleInputChange('');
          inputRef.current?.focus();
        }
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const input = inputRef.current;
    if (!input) return;

    if ((e.key === 'Delete' || e.key === 'Backspace') && input.value === '') {
      const updated = selectedItems.slice(0, -1);
      onChange?.(updated);
    }

    if (e.key === 'Escape') {
      input.blur();
    }

    if (e.key === 'Enter' && input.value.trim() !== '') {
      e.preventDefault();
      handleAddItem();
    }
  };

  const selectables = items?.filter((item) => !selectedItems.some((s) => getValue(s) === getValue(item)));

  return (
    <Command onKeyDown={handleKeyDown} className="bg-fieldr overflow-visible">
      <div className="mr-[50px] flex justify-between gap-4">
        <div className="outline-border outline-base h-fit flex-grow rounded-md outline outline-4">
          <div className="flex w-full flex-wrap items-center gap-2 p-2">
            {selectedItems.map((item) => (
              <Button
                key={getValue(item)}
                className="bg-base text-subtext-0 flex h-fit items-center gap-2 border-none px-2 py-1 shadow-none md:py-[6px]"
              >
                <div className="flex items-center">
                  <HiHashtag className="size-4 md:size-[18px]" />
                  <span className="justify-self-end text-sm font-medium">{getLabel(item)}</span>
                </div>
                <button
                  className="ml-1 rounded-full outline-none"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleUnselect(item);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(item)}
                >
                  <PiXCircleDuotone className="text-subtext-0 size-4 justify-self-start md:size-[18px]" />
                </button>
              </Button>
            ))}
            <CommandPrimitive.Input
              ref={inputRef}
              value={inputValue}
              onValueChange={handleInputChange}
              onBlur={() => setOpen(false)}
              onFocus={() => setOpen(true)}
              placeholder={placeholder}
              className={twMerge(
                'peer placeholder:text-subtext-0 flex h-fit w-full text-sm outline-none',
                disableAddingTag && 'hidden',
              )}
            />
          </div>
        </div>

        {!disableAddingTag && (
          <Button
            type="button"
            // disabled={!inputRef.current?.value.trim()}
            onClick={handleAddItem}
            className="bg-base hover:bg-sky text-sky flex h-[38px] w-[38px] items-center justify-center rounded-md hover:text-base"
          >
            <BiPlus className="h-[20px] w-[20px]" />
          </Button>
        )}
      </div>
      <div className="relative">
        <CommandList>
          {!disableAddingTag && open && selectables?.length > 0 && (
            <div className="bg-popover text-popover-foreground animate-in absolute top-2 z-50 max-h-52 w-full rounded-md border shadow-md outline-none">
              <CommandGroup heading={'هدر'} className="h-fulسl max-h-52 overflow-auto">
                {selectables.map((item) => (
                  <CommandItem
                    key={getValue(item)}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onSelect={() => {
                      const updated = [...selectedItems, item];
                      handleInputChange('');
                      onChange?.(updated);
                    }}
                    className="cursor-pointer"
                  >
                    {getLabel(item)}
                  </CommandItem>
                ))}
              </CommandGroup>
            </div>
          )}
        </CommandList>
      </div>
    </Command>
  );
}
