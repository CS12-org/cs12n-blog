import React, { FC } from 'react';
import { Button } from 'react-aria-components';
import DeleteIcon from '~/assets/images/delete.svg';
type DeleteButtonProps = { onClick: () => void };
export const DeleteButton: FC<DeleteButtonProps> = ({ onClick }) => {
  return (
    <Button onClick={onClick} className="bg-base text-subtext-0 rounded-md p-2 text-[14px]">
      <DeleteIcon />
    </Button>
  );
};
