import { Tag } from '@chakra-ui/react';
import { ListItemButton } from '../ListItemButton';
import { useModules } from '@/providers/ModuleProvider';

export interface ModuleListItemProps {
  openModules: () => void;
}

export function ModuleListItem(props: ModuleListItemProps) {
  const { openModules } = props;

  const { overrides } = useModules();

  const overrideCount = Object.keys(overrides).length;

  return (
    <ListItemButton
      label={'Modules'}
      description={
        'Overwrite modules & application urls for development and testing purposes.'
      }
      tags={
        overrideCount > 0 && (
          <Tag colorScheme={'brand'} variant={'subtle'}>
            {overrideCount} overrides
          </Tag>
        )
      }
      onClick={openModules}
    />
  );
}
