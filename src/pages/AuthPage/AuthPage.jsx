import { Button, Grid } from '@mui/material';
import { useState } from 'react';
import RegisterAuth from '../../components/RegisterAuth/RegisterAuth';
import LoginAuth from '../../components/LoginAuth/LoginAuth';
import styles from './AuthPage.module.scss';

const AuthPage = () => {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <Grid container display="flex" justifyContent="center" alignItems="center">
      <Grid item xs={10} sm={6} md={4}>
        {isRegister ? (
          <RegisterAuth setIsRegister={setIsRegister} />
        ) : (
          <LoginAuth setIsRegister={setIsRegister} />
        )}
        <div className={styles.blockButton}>
          <Button onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? 'Do you already have an account? Enter' : 'No account? Register'}
          </Button>
        </div>
      </Grid>
    </Grid>
  );
};

export default AuthPage;
