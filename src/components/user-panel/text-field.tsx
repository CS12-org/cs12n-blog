import { TextField, Label, Input } from '~/components/react-aria-components';

type Props = {
  label?: string;
  name?: string;
  placeholder?: string;
  className?: string;
};

export function TextInput({ label, name, placeholder, className = '' }: Props) {
  return (
    <TextField name={name} className="flex w-full flex-col gap-1">
      <Label className="text-sm font-medium">{label}</Label>
      <Input
        placeholder={placeholder}
        className={`bg-mantle focus:ring-lavender h-9 w-full rounded-md p-2 text-xs focus:ring-1 focus:outline-none ${className}`}
      />
    </TextField>
  );
}
