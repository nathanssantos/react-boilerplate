/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { flowResult } from 'mobx';
import { observer } from 'mobx-react';
import { useFormik } from 'formik';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';

import { useStore } from '../../hooks';
import { FormDefinitions } from '../../constants';

const {
  login: { initialValues, validationSchema },
} = FormDefinitions;

const Login = () => {
  const store = useStore();
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);

  const onSubmit = async (formValues) => {
    const response = await flowResult(
      store.authStore.authenticate({ ...formValues, mock: true }),
    );

    if (response?.error) {
      alert('Login Error');
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit,
  });

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Box
        component="form"
        noValidate
        onSubmit={formik.handleSubmit}
        style={{
          pointerEvents: formik.isSubmitting ? 'none' : 'initial',
        }}
        display="flex"
        flex="1"
      >
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light'
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box sx={{ mt: 1 }}>
              <TextField
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                margin="normal"
                required
                fullWidth
                autoFocus
                value={formik.values.email}
                error={formik.touched.email && !!formik.errors.email}
                helperText={formik.touched.email && formik.errors.email}
                onChange={formik.handleChange}
              />
              <TextField
                id="password"
                label="Password"
                name="password"
                margin="normal"
                required
                fullWidth
                autoFocus
                value={formik.values.password}
                error={formik.touched.password && !!formik.errors.password}
                helperText={formik.touched.password && formik.errors.password}
                onChange={formik.handleChange}
                autoComplete="current-password"
              />
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={formik.handleSubmit}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </Grid>
      </Box>
    </Grid>
  );
};

export default observer(Login);
