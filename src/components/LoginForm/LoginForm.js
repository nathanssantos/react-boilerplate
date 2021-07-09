import React, { useState } from 'react';
import { flowResult } from 'mobx';
import {
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useStore } from '../../hooks';

import { Loader } from '../';

import { REQUIRED_FIELD, INVALID_EMAIL } from '../../constants/Messages';

import './styles.scss';

const validationSchema = Yup.object().shape({
  email: Yup.string().email(INVALID_EMAIL).required(REQUIRED_FIELD),
  password: Yup.string().required(REQUIRED_FIELD),
});

const LoginForm = () => {
  const store = useStore();
  const [showPassword, setShowPassword] = useState(false);
  const [initialValues] = useState({
    email: '',
    password: '',
  });

  const onSubmit = async (formValues) => {
    const { email, password } = formValues;
    await flowResult(store.authStore.authenticate({ email, password }));
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit,
  });

  return (
    <form className='form login-form' noValidate onSubmit={formik.handleSubmit}>
      <TextField
        id='email'
        name='email'
        label='E-mail'
        variant='outlined'
        fullWidth
        autoFocus
        onChange={formik.handleChange}
        value={formik.values.email}
        error={!!formik.errors.email && formik.touched.email}
        helperText={formik.touched.email && formik.errors.email}
        disabled={formik.isSubmitting}
        className='form-field'
      />

      <FormControl className='form-field' variant='outlined' fullWidth>
        <InputLabel
          htmlFor='password'
          error={!!formik.errors.password && formik.touched.password}
        >
          Senha
        </InputLabel>
        <OutlinedInput
          id='password'
          name='password'
          label='Senha'
          type={showPassword ? 'text' : 'password'}
          onChange={formik.handleChange}
          value={formik.values.password}
          error={!!formik.errors.password && formik.touched.password}
          disabled={formik.isSubmitting}
          endAdornment={
            <InputAdornment position='end'>
              <IconButton
                aria-label={showPassword ? 'Esconder senha' : 'Mostrar senha'}
                title={showPassword ? 'Esconder senha' : 'Mostrar senha'}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
        {!!formik.errors.password && formik.touched.password ? (
          <FormHelperText error>{formik.errors.password}</FormHelperText>
        ) : null}
      </FormControl>
      <Button
        variant='contained'
        color='primary'
        fullWidth
        size='large'
        type='submit'
        disabled={formik.isSubmitting}
      >
        {formik.isSubmitting ? <Loader /> : 'Entrar'}
      </Button>
    </form>
  );
};

export default LoginForm;
