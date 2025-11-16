import { Button } from '@mui/material';

export const AuthButton = () => {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={() => window.open('http://localhost:4000/salesforce/auth', '_blank')}
    >
      Click to Auth
    </Button>
  );
};

//collect98node-production.up.railway.app
