import { Box, HStack, ListItem, Text, VStack } from '@chakra-ui/react';
import { ReactNode } from 'react';
import OpenIcon from '@heroicons/react/20/solid/ChevronRightIcon';

export interface ListItemButtonProps {
  onClick: () => void;
  label: string;
  description?: string;
  tags?: ReactNode;
}

export function ListItemButton(props: ListItemButtonProps) {
  const { onClick, label, description, tags } = props;

  return (
    <ListItem>
      <Box
        as={'button'}
        width={'100%'}
        textAlign={'left'}
        pl={6}
        pr={4}
        py={4}
        _hover={{
          backgroundColor: 'brand.100',
        }}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        transitionProperty={'background-color'}
        transitionDuration={'200ms'}
        transitionTimingFunction={'ease-in-out'}
        onClick={onClick}
      >
        <VStack spacing={1} alignItems={'flex-start'}>
          <Text fontWeight={'semibold'}>{label}</Text>
          {description && (
            <Text fontSize={'sm'} color="gray.600">
              {description}
            </Text>
          )}
          {tags && <HStack spacing={1}>{tags}</HStack>}
        </VStack>
        <Box color={'gray.500'}>
          <OpenIcon style={{ width: 20, height: 20 }} />
        </Box>
      </Box>
    </ListItem>
  );
}
