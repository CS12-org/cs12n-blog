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
    <Command onKeyDown={handleKeyDown} className="bg-field overflow-visible">
      <div className="flex justify-between gap-2">
        <div className="outline-border flex-grow rounded-md outline outline-1">
          <div className="flex flex-wrap items-center gap-2 p-2">
            {selectedItems.map((item) => (
              <Button
                key={getValue(item)}
                className="bg-secondary text-accent-foreground h-fit border-none py-1 shadow-none md:py-[6px]"
              >
                <HiHashtag className="size-4 md:size-[18px]" />
                <span className="text-sm font-medium md:text-base">{getLabel(item)}</span>
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
                  <PiXCircleDuotone className="text-muted-foreground size-4 md:size-[18px]" />
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
                'peer placeholder:text-muted-foreground flex-1 bg-transparent py-1 text-sm outline-none md:py-[6px] md:text-base',
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
            className="bg-primary h-fit rounded-md p-[14px] md:p-4"
          >
            <BiPlus className="md:!size-5" />
          </Button>
        )}
      </div>
      <div className="relative">
        <CommandList>
          {!disableAddingTag && open && selectables?.length > 0 && (
            <div className="bg-popover text-popover-foreground animate-in absolute top-2 z-50 max-h-52 w-full rounded-md border shadow-md outline-none">
              <CommandGroup heading={'هدر'} className="h-full max-h-52 overflow-auto">
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
