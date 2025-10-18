import { TextField, Button, Typography } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './LoginAuth.module.scss';
import AuthFormWrapper from '../../pages/AuthPage/AuthFormWrapper';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const LoginAuth = () => {
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { setUser } = useAuth();

  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setMessage('');
    setError('');

    try {
      const res = await axios.post('http://localhost:4000/login', {
        email: data.email,
        password: data.password,
      });

      if (res.data.ok) {
        setMessage('Login successful!');
        localStorage.setItem('token', res.data.token);

        setUser(res.data.user);

        reset();
        setTimeout(() => navigate('/dashboard'), 2000);
      }
    } catch (err) {
      if (err.response) {
        console.error(err.response.data);
        setError(err.response.data.message || 'Login error');
      } else {
        setError('Server connection error.');
      }
    }
  };

  return (
    <AuthFormWrapper header="Login">
      <form onSubmit={handleSubmit(onSubmit)}>
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
