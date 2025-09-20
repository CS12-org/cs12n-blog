import React, { ReactNode, useState } from 'react';
import { Button } from 'react-aria-components';
import { twJoin } from 'tailwind-merge';
import DecreaseArrow from '~/assets/images/decreaseArrow.svg';

interface AccordionProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  title: string;
  openAccordion?: boolean; //by default accrodion is closed
  actionButton?: ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({
  title,
  actionButton,
  children,
  className,
  style,
  openAccordion = false,
}) => {
  const [isOpenAccordion, setIsOpenAccordion] = useState(openAccordion);
  return (
    <section>
      <Button
        onClick={() => setIsOpenAccordion((prev) => !prev)}
        className={twJoin(
          className,
          isOpenAccordion ? 'rounded-t-lg' : 'rounded-lg',
          'bg-crust flex h-12 w-full cursor-pointer flex-row justify-between px-3 py-3',
        )}
        style={style}
      >
        <p>{title ?? 'test'}</p>
        <div className="flex flex-row items-center justify-center gap-2 rounded-[5px]">
          {isOpenAccordion && actionButton}
          <DecreaseArrow
            className={twJoin(
              'ms-1 h-[10px] w-[10px] transition-transform duration-200',
              isOpenAccordion && 'rotate-180',
            )}
          />
        </div>
      </Button>
      {isOpenAccordion && <div className="bg-[#101122] p-3">{children}</div>}
    </section>
  );
};

export default Accordion;
