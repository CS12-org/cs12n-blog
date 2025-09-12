import React, { FC } from 'react';
import { Button } from 'react-aria-components';

type EditButtonProps = {
  onClick: () => void;
};

export default function EditButton({ onClick }: EditButtonProps) {
  return (
    <Button onClick={onClick} className="bg-blue px-3 py-1 rounded-md text-crust text-sm flex items-center justify-between ">
    ویرایش
    </Button>
  );
}
