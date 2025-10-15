import { Box, Typography } from '@mui/material';

const AuthFormWrapper = ({ header, children }) => {
  return (
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
        marginTop: '60px',
      }}
    >
      <Typography sx={{ textAlign: 'center', fontWeight: 900, fontSize: '20px' }}>
        {header}
      </Typography>
      {children}
    </Box>
  );
};

export default AuthFormWrapper;
