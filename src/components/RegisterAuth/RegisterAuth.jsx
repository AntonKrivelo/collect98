import { TextField, Button, Box, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const RegisterAuth = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const password = watch('password');

  const onSubmit = (data) => {
    console.log(data);
    reset();
    navigate('/auth/login');
  };

  return (
    <div>
      <Box
        component="div"
        sx={{
          p: 3,
          border: '1px solid #ddd',
          borderRadius: 2,
          boxShadow: 2,
          bgcolor: 'white',
          maxWidth: 400,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography sx={{ textAlign: 'center', fontWeight: '900', fontSize: '20px' }}>
          Register
        </Typography>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
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
          ></TextField>
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
          ></TextField>
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
          ></TextField>
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
          ></TextField>
          <Button
            variant="contained"
            type="submit"
            sx={{ mt: 2, py: 1.2, fontSize: '16px', fontWeight: 'bold' }}
          >
            Register
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default RegisterAuth;
