import { Button } from '@mui/material';

export const AuthButton = () => {
  const baseUrl = process.env.REACT_APP_BASE_API_URL;

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={() => window.open(`${baseUrl}/salesforce/auth', '_blank`)}
    >
      Click to Auth
    </Button>
  );
};
