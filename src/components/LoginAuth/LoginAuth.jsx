import { TextField, Button, Typography } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import AuthFormWrapper from '../../pages/AuthPage/AuthFormWrapper';
import styles from './LoginAuth.module.scss';
import { useAuth } from '../../context/AuthContext';
import axiosBase from '../../api/axiosBase';

const LoginAuth = () => {
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { checkAuth } = useAuth();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const res = await axiosBase.post('/login', {
        email: data.email,
        password: data.password,
      });

      if (res.status === 200) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userId', res.data.user.id);
        localStorage.setItem('userName', res.data.user.name);
        await checkAuth();
        return navigate('/dashboard');
      }
    } catch (error) {
      if (error.response?.status === 403) {
        setError('Your account is blocked. Contact the administrator.');
      } else if (error.response?.status === 401) {
        setError('Invalid email or password.');
      } else {
        setError('Server error. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthFormWrapper header="Login">
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <TextField
          required
          id="outlined-email"
          label="Email"
          variant="outlined"
          margin="normal"
          {...register('email', {
            required: 'email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Incorrect format is email.',
            },
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
            required: 'password is required',
          })}
          error={!!errors.password}
          helperText={errors.password ? errors.password.message : ''}
        />
        <Button
          variant="contained"
          type="submit"
          loading={loading}
          disabled={loading}
          sx={{
            height: 40,
            position: 'relative',
            marginTop: '20px',
          }}
        >
          Login
        </Button>

        {error && (
          <Typography variant="body2" color="error" align="center" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
        {message && (
          <Typography variant="body2" color="success.main" align="center" sx={{ mt: 2 }}>
            {message}
          </Typography>
        )}
      </form>
    </AuthFormWrapper>
  );
};

export default LoginAuth;
