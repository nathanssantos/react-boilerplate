/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { flowResult } from 'mobx';
import { observer } from 'mobx-react';
import { useFormik } from 'formik';

import { useStore } from '../hooks';
import { FormDefinitions } from '../constants';

const {
  login: { initialValues, validationSchema },
} = FormDefinitions;

const Login = () => {
  const store = useStore();
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);

  const onSubmit = async (formValues: { email: string; password: string }) => {
    const response = await flowResult(store.authStore.authenticate(formValues));
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit,
  });

  console.log(store);

  return <div>Login</div>;
};

export default observer(Login);
