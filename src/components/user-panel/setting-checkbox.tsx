'use client';

import {
  Text,
  Label,
  Checkbox,
  FieldError,
  CheckboxGroup,
  type CheckboxGroupProps,
  type CheckboxProps,
  type ValidationResult,
} from '~/components/react-aria-components';

interface SettingCheckboxGroupProps extends Omit<CheckboxGroupProps, 'children'> {
  children?: React.ReactNode;
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

export function SettingCheckboxGroup({
  label,
  description,
  errorMessage,
  children,
  ...props
}: SettingCheckboxGroupProps) {
  return (
    <CheckboxGroup {...props}>
      {label && <Label>{label}</Label>}
      {children}
      {description && <Text slot="description">{description}</Text>}
      <FieldError>{errorMessage}</FieldError>
    </CheckboxGroup>
  );
}

interface SettingCheckboxOptionProps extends Omit<CheckboxProps, 'children'> {
  children?: React.ReactNode;
}

export function SettingCheckboxOption({ children, ...props }: SettingCheckboxOptionProps) {
  return (
    <Checkbox {...props}>
      {({ isSelected }) => (
        <div className="flex w-full items-center justify-between gap-2.5">
          <div
            className={`text-subtext-1 flex h-9 flex-1 cursor-pointer items-center rounded-md px-3 py-2 text-xs ${
              isSelected ? 'bg-mantle text-maroon' : 'bg-mantle'
            }`}
          >
            {children}
          </div>

          <div className="relative flex h-9 w-9 shrink-0 items-center justify-center" aria-hidden="true">
            <div className="bg-base absolute h-9 w-9 rounded-md" />
            <div
              className={`relative h-4 w-4 cursor-pointer rounded-full transition-colors duration-300 ${
                isSelected ? 'bg-rosewater shadow-[inset_5px_5px_5.8px_#ed8796]' : 'bg-crust'
              }`}
            />
          </div>
        </div>
      )}
    </Checkbox>
  );
}
