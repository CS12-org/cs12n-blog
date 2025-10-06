import React, { FC } from 'react';
import { Button, ComboBox, Input, Label, ListBox, ListBoxItem, Popover } from 'react-aria-components';
import { BiChevronDown } from 'react-icons/bi';

type SelectBoxProps = {
  lists: { id: string; label: string }[];
  label?: string;
  onChange?: (value: string | null) => void; // 👈 bubble selection up
};

export const SelectBox: FC<SelectBoxProps> = ({ lists, label, onChange }) => {
  return (
    <ComboBox
      className="w-fit"
      onSelectionChange={(key) => onChange?.(key as string)} // 👈 notify parent
    >
      {label && <Label>{label}</Label>}

      <div className="bg-base flex overflow-hidden rounded-lg">
        <Input className="bg-base w-30 rounded-l-2xl px-2 py-1 outline-none" disabled placeholder="فیلتر نظرات" />
        <Button className="bg-base flex items-center justify-center rounded-r-2xl px-2">
          <BiChevronDown size={16} />
        </Button>
      </div>

      <Popover>
        <ListBox className={'min-w-32 rounded-2xl bg-[#101122] px-6 py-3'}>
          {lists?.map((list) => (
            <ListBoxItem className={'text-end'} key={list.id} id={list.id}>
              {list.label}
            </ListBoxItem>
          ))}
        </ListBox>
      </Popover>
    </ComboBox>
  );
};
