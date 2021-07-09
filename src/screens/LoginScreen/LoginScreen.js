import React from 'react';

import Logo from '../../components/Svg/Logo';
import { LoginForm } from '../../components';

import './styles.scss';

const LoginScreen = () => (
  <div className='screen login-screen'>
    <div className='login-screen__logo'>
      <Logo />
    </div>

    <LoginForm />
  </div>
);

export default LoginScreen;
