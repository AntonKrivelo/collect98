import { TextField, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import styles from './RegisterAuth.module.scss';
import AuthFormWrapper from '../../pages/AuthPage/AuthFormWrapper';

const RegisterAuth = ({ setIsRegister }) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const password = watch('password');

  const onSubmit = (data) => {
    console.log(data);
    reset();
    setIsRegister(false);
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
          margin="normal"
          {...register('confirmPassword', {
            required: 'Password confirmation is required.',
            validate: (value) => value === password || "Passwords don't match!",
          })}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword ? errors.confirmPassword.message : ''}
        />
        <Button
          variant="contained"
          type="submit"
          sx={{ mt: 2, py: 1.2, fontSize: '16px', fontWeight: 'bold' }}
        >
          Register
        </Button>
      </form>
    </AuthFormWrapper>
  );
};

export default RegisterAuth;
