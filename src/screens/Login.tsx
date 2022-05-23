import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import { flowResult } from 'mobx';
import { observer } from 'mobx-react';
import { forms } from '../constants';
import { useStore } from '../hooks';

const {
  login: { initialValues, validationSchema },
} = forms;

const Login = () => {
  const store = useStore();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (formValues) => {
      await flowResult(store.authStore.authenticate(formValues));
    },
  });

  return (
    <Flex bg='gray.100' align='center' justify='center' h='100vh'>
      <Box bg='white' p={6} rounded='md'>
        <form onSubmit={formik.handleSubmit}>
          <VStack spacing={4} align='flex-start'>
            <FormControl isInvalid={!!formik.errors.email}>
              <FormLabel htmlFor='email'>E-mail</FormLabel>
              <Input
                id='email'
                name='email'
                type='email'
                variant='filled'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {!!formik.errors.email && (
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={!!formik.errors.password}>
              <FormLabel htmlFor='password'>Password</FormLabel>
              <Input
                id='password'
                name='password'
                type='password'
                variant='filled'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {!!formik.errors.password && (
                <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
              )}
            </FormControl>
            <Button
              type='submit'
              colorScheme='purple'
              width='full'
              isLoading={formik.isSubmitting}
            >
              Login
            </Button>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
};

export default observer(Login);
