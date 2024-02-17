import { useState } from "react";
import { ListBox } from "react-aria-components";
import { useModules } from "../../../hooks/useModules";
import { ListItem } from "../../ListItem";
import { DrawerSubHeader } from "../../DrawerSubHeader";
import { Tag } from "../../Tag";
import { OverridableUrlForm } from "../shared/OverridableUrlForm";
import { ModuleScope } from "@scottbenton/apps-config";

export interface ModulesProps {
  close: () => void;
}

export function Modules(props: ModulesProps) {
  const { close } = props;

  const { modules, moduleOverrides, setModuleOverride } = useModules();

  const [openModuleKey, setOpenModuleKey] = useState<ModuleScope>();

  if (openModuleKey && modules[openModuleKey]) {
    return (
      <OverridableUrlForm
        label={modules[openModuleKey].name}
        defaultUrl={modules[openModuleKey].defaultUrl}
        override={moduleOverrides[openModuleKey]}
        goBack={() => setOpenModuleKey(undefined)}
        setOverride={(url) => setModuleOverride(openModuleKey, url)}
      />
    );
  }

  return (
    <>
      <DrawerSubHeader label={"Modules"} goBack={close} />
      <ListBox
        aria-labelledby='drawer-subheader-label'
        selectedKeys={openModuleKey ? [openModuleKey] : []}
        onSelectionChange={(set) => {
          const arr = Array.from(set);
          if (arr.length > 0) {
            setOpenModuleKey(arr[0] as ModuleScope);
          } else {
            setOpenModuleKey(undefined);
          }
        }}
        selectionMode='single'
      >
        {Object.values(modules).map((module) => (
          <ListItem
            key={module.scope}
            id={module.scope}
            label={module.name}
            description={module.description}
            tertiary={
              moduleOverrides[module.scope] ? (
                <Tag>Override Set</Tag>
              ) : undefined
            }
          />
        ))}
      </ListBox>
    </>
  );
}
