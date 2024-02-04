import { ChakraProvider } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
import { theme } from './theme';

export function ThemeProvider(props: PropsWithChildren) {
  const { children } = props;
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
