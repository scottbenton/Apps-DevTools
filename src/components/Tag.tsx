import React, { PropsWithChildren } from "react";

export function Tag(props: PropsWithChildren) {
  const { children } = props;

  return (
    <span
      className={
        "rounded-lg bg-devtools-200 text-devtools-800 text-sm font-semibold px-2 py-0.5"
      }
    >
      {children}
    </span>
  );
}
