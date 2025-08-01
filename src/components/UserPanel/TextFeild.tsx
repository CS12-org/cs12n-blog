import { TextField, Label, Input } from "~/components/react-aria-components";

type Props = {
  label?: string;
  name?: string;
  placeholder?: string;
  className?: string;
};

export function TextInput({ label, name, placeholder, className = "" }: Props) {
  return (
    <TextField name={name} className="flex flex-col gap-1 w-full">
      <Label className="text-sm font-medium">{label}</Label>
      <Input
        placeholder={placeholder}
        className={`bg-mantle p-2 w-full rounded-md h-9 text-xs focus:outline-none focus:ring-1 focus:ring-lavender ${className}`}
      />
    </TextField>
  );
}
