import {
  IconButton,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  Divider,
} from '@chakra-ui/react';
import DevToolsIcon from '@heroicons/react/24/outline/ChevronLeftIcon';
import { useRef } from 'react';
import { DevToolsDrawer } from '@/components/DevToolsDrawer';

const Index = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);
  return (
    <>
      <IconButton
        aria-label={'Open Developer Tools'}
        size={'xs'}
        variant={'outline'}
        colorScheme={'brand'}
        icon={<DevToolsIcon style={{ width: 24, height: 24 }} />}
        height={'48px'}
        marginTop={'-24px'}
        position={'absolute'}
        top={'50vh'}
        right={0}
        borderRadius={'xl'}
        borderTopRightRadius={0}
        borderBottomRightRadius={0}
        ref={btnRef}
        onClick={onOpen}
      />

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent
          borderTopLeftRadius={'2xl'}
          borderBottomLeftRadius={'2xl'}
        >
          <DrawerHeader
            color={'gray.800'}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'space-between'}
            pr={3}
          >
            <span>Developer Tools</span>
            <DrawerCloseButton
              position={'initial'}
              color={'gray.600'}
              borderRadius={'lg'}
            />
          </DrawerHeader>
          <Divider />
          <DevToolsDrawer />
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Index;
