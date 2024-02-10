import React, { ReactNode } from "react";
import { Radio } from "react-aria-components";

export interface ModuleRadioProps {
  value: string;
  label: string;
  secondaryText?: string;
  input?: ReactNode;
}
export function ModuleRadio(props: ModuleRadioProps) {
  const { value, label, secondaryText, input } = props;

  return (
    <div
      className={"flex rounded-lg border border-solid border-gray-300 flex-col"}
    >
      <Radio
        value={value}
        className={"group flex cursor-pointer items-center px-4 py-4"}
      >
        <div className="w-6 h-6 rounded-full border border-devtools-600 border-solid flex items-center justify-center">
          <div
            className={
              "w-4 h-4 rounded-full group-hovered:bg-devtools-200 group-selected:bg-devtools-600 transition-colors ease-in-out duration-150"
            }
          />
        </div>
        <div className={"flex flex-col ml-4"}>
          <span className={"text-lg font-semibold text-devtools-700"}>
            {label}
          </span>
          {secondaryText && (
            <span className={"text-gray-600"}>{secondaryText}</span>
          )}
        </div>
      </Radio>

      {input && <div className="px-4 pb-4">{input}</div>}
    </div>
  );
}
