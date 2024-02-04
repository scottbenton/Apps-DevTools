import { Box, Flex, Icon, LinkBox, LinkOverlay, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';
import SelectedIcon from '@heroicons/react/24/solid/CheckCircleIcon';

export interface ModuleBoxProps {
  label: string;
  description?: string;
  input?: ReactNode;
  isSelected: boolean;
  onSelect: () => void;
}

export function ModuleBox(props: ModuleBoxProps) {
  const { label, description, input, isSelected, onSelect } = props;
  return (
    <LinkBox
      borderWidth={'1px'}
      p={5}
      borderRadius={'xl'}
      borderColor={isSelected ? 'brand.500' : 'gray.300'}
    >
      <Flex align={'center'} justify={'space-between'}>
        <LinkOverlay
          as={'button'}
          onClick={onSelect}
          fontWeight={'semibold'}
          minHeight={6}
        >
          {label}
        </LinkOverlay>
        {isSelected && (
          <Icon as={SelectedIcon} color={'brand.500'} boxSize={6} />
        )}
      </Flex>
      {description && (
        <Text color={'gray.600'} fontSize={'sm'} mt={2}>
          {description}
        </Text>
      )}
      {input && <Box mt={3}>{input}</Box>}
    </LinkBox>
  );
}
