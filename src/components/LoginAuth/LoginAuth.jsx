import { TextField, Button } from '@mui/material';
import styles from './LoginAuth.module.scss';
import AuthFormWrapper from '../../pages/AuthPage/AuthFormWrapper';

const LoginAuth = () => {
  return (
    <AuthFormWrapper header="Login">
      <form>
        <TextField required id="outlined-email" label="Email" variant="outlined" margin="normal" />
        <TextField
          required
          id="outlined-password"
          label="Password"
          variant="outlined"
          margin="normal"
        />
        <Button
          variant="contained"
          type="submit"
          sx={{ mt: 2, py: 1.2, fontSize: '16px', fontWeight: 'bold' }}
        >
          Login
        </Button>
      </form>
    </AuthFormWrapper>
  );
};

export default LoginAuth;
