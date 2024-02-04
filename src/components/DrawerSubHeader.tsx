import { DrawerBody, IconButton, Text } from '@chakra-ui/react';
import BackIcon from '@heroicons/react/20/solid/ChevronLeftIcon';

export interface DrawerSubHeaderProps {
  label: string;
  goBack?: () => void;
}

export function DrawerSubHeader(props: DrawerSubHeaderProps) {
  const { label, goBack } = props;

  return (
    <DrawerBody
      flexGrow={0}
      overflow={'initial'}
      backgroundColor={'gray.700'}
      color={'white'}
      py={1}
      display={'flex'}
      alignItems={'center'}
    >
      {goBack && (
        <IconButton
          aria-label={'Back'}
          colorScheme={'gray.700'}
          _hover={{
            backgroundColor: 'gray.800',
          }}
          variant={'ghost'}
          icon={<BackIcon style={{ width: 20, height: 20 }} />}
          onClick={goBack}
        />
      )}
      <Text ml={1} fontSize={'lg'} fontWeight={'semibold'}>
        {label}
      </Text>
    </DrawerBody>
  );
}
