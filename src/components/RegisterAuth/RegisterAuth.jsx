import { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import AuthFormWrapper from '../../pages/AuthPage/AuthFormWrapper';

const RegisterAuth = ({ setIsRegister, setAlertMessage }) => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const password = watch('password');

  const onSubmit = async (data, e) => {
    setIsLoading(true);
    e.preventDefault();
    setError('');

    try {
      await axios.post('http://localhost:4000/register', {
        name: data.username,
        email: data.email,
        password: data.password,
      });

      setAlertMessage({ text: 'Registration success!', severity: 'success' });
      setIsRegister(false);
      reset();
    } catch (err) {
      if (err.response) {
        console.error(err.response.data);
        setError(err.response.data.message`Error registration.`);
      } else {
        setError('Server connection error.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthFormWrapper header="Register">
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          required
          id="outlined-Username"
          label="Username"
          variant="outlined"
          margin="normal"
          {...register('username', {
            required: 'Username is required',
            minLength: {
              value: 2,
              message: 'The name must contain at least 2 characters.',
            },
          })}
          error={!!errors.username}
          helperText={errors.username ? errors.username.message : ''}
        />
        <TextField
          required
          id="outlined-email"
          label="Email"
          variant="outlined"
          margin="normal"
          {...register('email', {
            required: 'Email is required',
          })}
          error={!!errors.email}
          helperText={errors.email ? errors.email.message : ''}
        />
        <TextField
          required
          id="outlined-password"
          label="Password"
          variant="outlined"
          type="password"
          margin="normal"
          {...register('password', {
            required: 'Password is required.',
            minLength: {
              value: 8,
              message: 'The password must contain at least 8 characters.',
            },
          })}
          error={!!errors.password}
          helperText={errors.password ? errors.password.message : ''}
        />
        <TextField
          required
          id="outlined-password"
          label="Confirm password"
          variant="outlined"
          type="password"
          margin="normal"
          {...register('confirmPassword', {
            required: 'Password confirmation is required.',
            validate: (value) => value === password,
          })}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword ? errors.confirmPassword.message : ''}
        />
        <Button
          variant="contained"
          type="submit"
          loading={isLoading}
          disabled={isLoading}
          sx={{ mt: 2, py: 1.2, fontSize: '16px', fontWeight: 'bold' }}
        >
          Register
        </Button>
        {error && (
          <Typography variant="body2" color="error" align="center" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
      </form>
    </AuthFormWrapper>
  );
};

export default RegisterAuth;
