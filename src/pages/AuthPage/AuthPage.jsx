import { useEffect, useState } from 'react';
import { Button, Grid } from '@mui/material';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

import RegisterAuth from '../../components/RegisterAuth/RegisterAuth';
import LoginAuth from '../../components/LoginAuth/LoginAuth';
import styles from './AuthPage.module.scss';

const AuthPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [alertMessage, setAlertMessage] = useState();

  useEffect(() => {
    if (alertMessage) setTimeout(() => setAlertMessage(null), 2000);
  }, [alertMessage]);

  return (
    <>
      <Grid container display="flex" justifyContent="center" alignItems="center">
        <Grid item xs={10} sm={6} md={4}>
          {isRegister ? (
            <RegisterAuth setIsRegister={setIsRegister} setAlertMessage={setAlertMessage} />
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
      {alertMessage && (
        <Alert
          sx={{ position: 'absolute', right: 10, bottom: 10 }}
          icon={<CheckIcon fontSize="inherit" />}
          severity={alertMessage.severity}
        >
          {alertMessage.text}
        </Alert>
      )}
    </>
  );
};

export default AuthPage;
