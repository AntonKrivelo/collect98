import { useAuth } from '../../context/AuthContext';
import { Container, Typography, Paper, Box, Alert, Button } from '@mui/material';
import InventoriesSection from '../../components/InventoriesSection/InventoriesSection';
import { useState } from 'react';
import SalesforceModal from '../../components/Utils/SalesforceModal';

const MyPage = () => {
  const { user } = useAuth();
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const [showModal, setShowModal] = useState(false);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        sx={{
          fontWeight: 'bold',
          textAlign: 'center',
          mb: 4,
        }}
      >
        My Page
      </Typography>

      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 2,
        }}
      >
        <Button
          onClick={() => setShowModal(true)}
          disabled={!user}
          variant="contained"
          size="small"
          sx={{ mb: '20px' }}
        >
          send data to salesforce
        </Button>
        <Typography
          variant="h5"
          component="h2"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            mb: 3,
          }}
        >
          My Information
        </Typography>

        {!user ? (
          <Alert severity="warning">
            User data is unavailable or the profile is blocked, please contact the administrator.
          </Alert>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  Unique identifier
                </Typography>
                <Typography variant="h6" component="div">
                  {user.id || 'Not available'}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  Name
                </Typography>
                <Typography variant="h6" component="div">
                  {user.name || 'Not available'}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  Email
                </Typography>
                <Typography variant="h6" component="div">
                  {user.email || 'Not available'}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  Role
                </Typography>
                <Typography variant="h6" component="div">
                  {user.role || 'Not available'}
                </Typography>
              </Box>
            </Box>
          </Box>
        )}
        <SalesforceModal open={showModal} onClose={() => setShowModal(false)} user={user} />
      </Paper>
      {user && <InventoriesSection token={token} userId={userId} header="My inventories" />}
    </Container>
  );
};

export default MyPage;
