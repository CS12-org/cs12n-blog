'use client';

import { Button } from 'react-aria-components';

interface RemovableListItemProps {
  link?: string;
  text: string;
  onRemove: () => void;
  disabled?: boolean;
}

export default function RemovableListItem({ text, link, onRemove, disabled = false }: RemovableListItemProps) {
  return (
    <li className="bg-mantle flex items-center justify-between rounded-md px-2 py-2 text-xs text-white">
      {link ? (
        <a href={link} target="_blank" rel="noopener noreferrer" className="break-all underline">
          {text}
        </a>
      ) : (
        <span className="break-all underline">{text}</span>
      )}
      <Button type="button" className="text-red-400 hover:text-red-200" onClick={onRemove} isDisabled={disabled}>
        حذف
      </Button>
    </li>
  );
}
