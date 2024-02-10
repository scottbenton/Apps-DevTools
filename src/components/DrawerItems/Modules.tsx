import React, { useState } from "react";
import { ListBox } from "react-aria-components";
import { useModules } from "../../hooks/useModules";
import { ListItem } from "../ListItem";
import { DrawerSubHeader } from "../DrawerSubHeader";
import { ModuleOverride } from "./ModuleOverride";

export interface ModulesProps {
  close: () => void;
}

export function Modules(props: ModulesProps) {
  const { close } = props;

  const { modules, moduleOverrides } = useModules();

  const [openModuleKey, setOpenModuleKey] = useState<string>();

  if (openModuleKey && modules[openModuleKey]) {
    return (
      <ModuleOverride
        allOverrides={moduleOverrides}
        module={modules[openModuleKey]}
        override={moduleOverrides[openModuleKey]}
        goBack={() => setOpenModuleKey(undefined)}
      />
    );
  }

  return (
    <>
      <DrawerSubHeader label={"Modules"} goBack={close} />
      <ListBox
        aria-labelledby="drawer-subheader-label"
        selectedKeys={openModuleKey ? [openModuleKey] : []}
        onSelectionChange={(set) => {
          const arr = Array.from(set);
          if (arr.length > 0) {
            setOpenModuleKey(arr[0] as string);
          } else {
            setOpenModuleKey(undefined);
          }
        }}
        selectionMode="single"
      >
        {Object.values(modules).map((module) => (
          <ListItem
            key={module.moduleKey}
            id={module.moduleKey}
            label={module.name}
          />
        ))}
      </ListBox>
    </>
  );
}
