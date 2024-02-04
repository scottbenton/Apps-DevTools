import { List } from '@chakra-ui/react';
import { useState } from 'react';
import { ModuleListItem } from './Modules/ModuleListItem';
import { ModuleDrawerContents } from './Modules/ModuleDrawerContents';

enum DevToolOptions {
  Modules,
}

export function DevToolsDrawer() {
  const [openDevToolOption, setOpenDevToolOption] = useState<DevToolOptions>();

  if (openDevToolOption === DevToolOptions.Modules) {
    return (
      <ModuleDrawerContents close={() => setOpenDevToolOption(undefined)} />
    );
  }

  return (
    <List>
      <ModuleListItem
        openModules={() => setOpenDevToolOption(DevToolOptions.Modules)}
      />
    </List>
  );
}
