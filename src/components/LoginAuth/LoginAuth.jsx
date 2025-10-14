import { TextField, Button, Box, Typography } from '@mui/material';

const LoginAuth = () => {
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
          Login
        </Typography>
        <form style={{ display: 'flex', flexDirection: 'column' }}>
          <TextField
            required
            id="outlined-email"
            label="Email"
            variant="outlined"
            margin="normal"
          ></TextField>
          <TextField
            required
            id="outlined-password"
            label="Password"
            variant="outlined"
            margin="normal"
          ></TextField>
          <Button
            variant="contained"
            type="submit"
            sx={{ mt: 2, py: 1.2, fontSize: '16px', fontWeight: 'bold' }}
          >
            Login
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default LoginAuth;
