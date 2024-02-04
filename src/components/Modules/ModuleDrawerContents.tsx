import { List, Tag } from '@chakra-ui/react';
import { useState } from 'react';
import { ListItemButton } from '../ListItemButton';
import { DrawerSubHeader } from '../DrawerSubHeader';
import { OpenModuleDrawerContents } from './OpenModuleDrawerContents';
import { IModule } from '@/types/modules.type';
import { useModules } from '@/providers/ModuleProvider';

export interface ModuleDrawerContentsProps {
  close: () => void;
}

export function ModuleDrawerContents(props: ModuleDrawerContentsProps) {
  const { close } = props;
  const { modules, overrides } = useModules();

  const [openModule, setOpenModule] = useState<IModule>();

  if (openModule) {
    return (
      <OpenModuleDrawerContents
        module={openModule}
        close={() => setOpenModule(undefined)}
      />
    );
  }

  return (
    <>
      <DrawerSubHeader goBack={close} label={'Modules'} />
      <List>
        {modules
          .sort((m1, m2) => m1.name.localeCompare(m2.name))
          .map(module => (
            <ListItemButton
              key={module.name}
              label={module.friendlyName}
              description={module.description}
              tags={
                overrides[module.name] && (
                  <Tag variant={'subtle'} colorScheme="brand">
                    Overriden
                  </Tag>
                )
              }
              onClick={() => setOpenModule(module)}
            />
          ))}
      </List>
    </>
  );
}
