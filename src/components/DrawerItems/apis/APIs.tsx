import React, { useState } from "react";
import { ListBox } from "react-aria-components";
import { ListItem } from "../../ListItem";
import { DrawerSubHeader } from "../../DrawerSubHeader";
import { Tag } from "../../Tag";
import { useApis } from "../../../hooks/useApis";
import { OverridableUrlForm } from "../shared/OverridableUrlForm";

export interface APIsProps {
  close: () => void;
}

export function APIs(props: APIsProps) {
  const { close } = props;

  const { apis, apiOverrides, setApiOverride } = useApis();

  const [openApiKey, setOpenApiKey] = useState<string>();

  if (openApiKey && apis[openApiKey]) {
    return (
      <OverridableUrlForm
        label={apis[openApiKey].name}
        defaultUrl={apis[openApiKey].defaultUrl}
        override={apiOverrides[openApiKey]}
        goBack={() => setOpenApiKey(undefined)}
        setOverride={(url) => setApiOverride(openApiKey, url)}
      />
    );
  }

  return (
    <>
      <DrawerSubHeader label={"Modules"} goBack={close} />
      <ListBox
        aria-labelledby="drawer-subheader-label"
        selectedKeys={openApiKey ? [openApiKey] : []}
        onSelectionChange={(set) => {
          const arr = Array.from(set);
          if (arr.length > 0) {
            setOpenApiKey(arr[0] as string);
          } else {
            setOpenApiKey(undefined);
          }
        }}
        selectionMode="single"
      >
        {Object.values(apis).map((api) => (
          <ListItem
            key={api.key}
            id={api.key}
            label={api.name}
            description={api.description}
            tertiary={
              apiOverrides[api.key] ? <Tag>Override Set</Tag> : undefined
            }
          />
        ))}
      </ListBox>
    </>
  );
}
