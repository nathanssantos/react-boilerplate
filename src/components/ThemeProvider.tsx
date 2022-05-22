import { ReactElement } from 'react';

type ThemeProps = { children: ReactElement };

const Theme = ({ children }: ThemeProps) => {
  return <div>{children}</div>;
};

export default Theme;
