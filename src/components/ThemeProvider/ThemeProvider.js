import {
  createTheme,
  ThemeProvider as Provider,
} from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

import Theme from '../../constants/Theme';

const ThemeProvider = ({ children }) => {
  const customTheme = createTheme(Theme);
  return (
    <Provider theme={customTheme}>
      <CssBaseline />
      {children}
    </Provider>
  );
};

export default ThemeProvider;
