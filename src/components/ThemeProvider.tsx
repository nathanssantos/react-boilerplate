import { ReactElement } from 'react';
import { ChakraProvider } from '@chakra-ui/react';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Theme from '../constants/theme';

type ThemeProviderProps = { children: ReactElement };

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  return <ChakraProvider theme={Theme}>{children}</ChakraProvider>;
};

export default ThemeProvider;
