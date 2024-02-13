import React from "react";
import { ListItem } from "../../ListItem";
import { DrawerItems } from "../DrawerItems.enum";
import { useModules } from "../../../hooks/useModules";
import { Tag } from "../../Tag";

export function ModuleListItem() {
  const { moduleOverrides } = useModules();
  const numberOfOverrides = Object.keys(moduleOverrides).length;
  return (
    <ListItem
      id={DrawerItems.MODULES}
      label={"Frontend Modules"}
      description="Override deployed modules with locally running code"
      tertiary={
        numberOfOverrides > 0 ? (
          <Tag>
            {numberOfOverrides} Override
            {numberOfOverrides > 1 ? "s" : ""} Set
          </Tag>
        ) : undefined
      }
    />
  );
}
