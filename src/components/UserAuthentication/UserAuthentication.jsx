import { Box, Button, TextField, Typography, Paper } from '@mui/material';

const UserAuthentication = ({ mode }) => {
  const isRegister = mode === 'register';
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '50px',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          m: 1,
          width: 300,
          p: 4,
        }}
      >
        <Typography
          sx={{
            textAlign: 'center',
            marginBottom: '20px',
            fontWeight: '900',
            fontSize: '24px',
          }}
        >
          {isRegister ? 'Register' : 'Login Up'}
        </Typography>

        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          component="form"
          sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
          noValidate
          autoComplete="off"
        >
          <TextField required label="Email" type="email" />
          <TextField required label="Password" type="password" />

          {isRegister && <TextField required label="Confirm password" type="password" />}

          <Button sx={{ marginTop: '20px' }} variant="contained">
            {isRegister ? 'Register' : 'Login Up'}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default UserAuthentication;
