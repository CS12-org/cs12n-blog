import React, { FC } from 'react';
import { Button } from 'react-aria-components';

type EditButtonProps = {
  onClick: () => void;
};

export default function EditButton({ onClick }: EditButtonProps) {
  return (
    <Button
      onClick={onClick}
      className="bg-blue text-crust flex items-center justify-between rounded-md px-3 py-1 text-sm"
    >
      ویرایش
    </Button>
  );
}
