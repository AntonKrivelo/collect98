import { Box, Button, TextField, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';

const UserAuthentication = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: '50px',
        '& > :not(style)': {
          m: 1,
          width: 250,
          height: 280,
          padding: 6,
        },
      }}
    >
      <Paper elevation={3}>
        <Typography
          sx={{ textAlign: 'center', marginBottom: '10px', fontWeight: '900', fontSize: '24px' }}
        >
          Register
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
          <TextField required id="outlined-required" label="Email" />
          <TextField required id="outlined-required" label="Password" />
          <TextField required id="outlined-required" label="Confirm the password" />
          <Button sx={{ marginTop: '10px' }} variant="contained">
            Register
          </Button>
        </Box>
      </Paper>
      <Paper elevation={3}>
        <Typography
          sx={{ textAlign: 'center', marginBottom: '20px', fontWeight: '900', fontSize: '24px' }}
        >
          Login Up
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
          <TextField required id="outlined-required" label="Email" />
          <TextField required id="outlined-required" label="Password" />
          <Button sx={{ marginTop: '20px' }} variant="contained">
            Login up
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default UserAuthentication;
