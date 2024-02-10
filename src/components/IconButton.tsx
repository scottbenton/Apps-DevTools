import React, { PropsWithChildren } from "react";
import { Button } from "react-aria-components";
import clsx from "clsx";

type variants = "default" | "dark";

const classNames: Record<variants, string> = {
  default: "hover:bg-primary-100 text-gray-500 hover:text-primary-600",
  dark: "hover:bg-gray-800 text-white",
};

export interface IconButtonProps {
  className?: string;
  onPress?: () => void;
  label: string;
  variant?: variants;
}

export function IconButton(props: PropsWithChildren<IconButtonProps>) {
  const { className, label, onPress, children, variant = "default" } = props;

  return (
    <Button
      className={clsx(
        className,
        "p-2 flex items-center justify-center rounded-lg focus:outline-none focus:ring-2 ring-primary-400 transition-colors duration-150 ease-in-out",
        classNames[variant]
      )}
      onPress={onPress}
      aria-label={label}
    >
      {children}
    </Button>
  );
}
