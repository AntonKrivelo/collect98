import { Button, Grid } from '@mui/material';
import { useState } from 'react';
import RegisterAuth from '../../components/RegisterAuth/RegisterAuth';
import LoginAuth from '../../components/LoginAuth/LoginAuth';

const AuthPage = () => {
  const [isRegister, setIsRegister] = useState(true);

  return (
    <div>
      <Grid
        container
        display="flex"
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: '80vh' }}
      >
        <Grid item xs={10} sm={6} md={4}>
          {isRegister ? <RegisterAuth /> : <LoginAuth />}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '10px',
            }}
          >
            <Button
              style={{ padding: '10px', cursor: 'pointer' }}
              onClick={() => setIsRegister(!isRegister)}
            >
              {isRegister ? 'Do you already have an account? Enter' : 'No account? Register'}
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default AuthPage;
