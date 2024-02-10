import React from "react";
import { ListBoxItem, Text } from "react-aria-components";
import ArrowRightIcon from "@heroicons/react/24/outline/ChevronRightIcon";

export interface ListItemProps {
  id: string;
  label: string;
  description?: string;
  tertiary?: React.ReactNode;
}

export function ListItem(props: ListItemProps) {
  const { id, label, description, tertiary } = props;

  return (
    <ListBoxItem
      textValue={label}
      id={id}
      className={
        "px-6 py-4 flex items-center justify-between cursor-pointer hover:bg-primary-100 duration-150 transition-colors ease-in-out"
      }
    >
      <div className={"flex flex-col"}>
        <Text slot={"label"} className={"text-xl font-semibold text-gray-800"}>
          {label}
        </Text>
        {description && (
          <Text slot={"description"} className={"text-gray-600"}>
            {description}
          </Text>
        )}
        {tertiary}
      </div>
      <ArrowRightIcon className={"w-6 h-6 text-gray-500 ml-2"} />
    </ListBoxItem>
  );
}
