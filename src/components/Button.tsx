'use client';

import type { ComponentProps } from "react";
import { Button as AriaButton } from "react-aria-components";
import twMerge from "~/lib/tw-merge";

type Props = Omit<ComponentProps<typeof AriaButton>, "className"> & {
  className?: string;
  variant?: "outline" | "fill" | "none";
  isDisabled?: boolean;
};

const VARIANTS = {
  none: "",
  fill: "bg-lavender text-base",
  outline: "border-2 border-solid border-lavender text-lavender",
  disabled: "opacity-50 cursor-not-allowed pointer-events-none",
} as const;

function Button(props: Props) {
  const {
    className = "",
    variant = "fill",
    isDisabled = false,
    ...other
  } = props;

  const variantStyle = isDisabled ? VARIANTS.disabled : VARIANTS[variant];

  const styles = twMerge(
    "rounded-md transition",
    !isDisabled && "hover:brightness-110 pressed:brightness-90",
    variantStyle,
    className,
  );

  return <AriaButton className={styles} isDisabled={isDisabled} {...other} />;
}

export default Button;
