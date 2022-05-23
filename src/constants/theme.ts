import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      html: {
        scrollBehavior: 'smooth',
      },
      body: {
        bg: 'gray.900',
        color: 'gray.200',
      },
      svg: {
        overflow: 'initial',
      },
    },
  },
  colors: {
    purple: {
      '500': '#78287A',
    },
  },
  fonts: {
    heading: 'Roboto',
    body: 'Roboto',
  },
});

export default theme;
