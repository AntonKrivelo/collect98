import { Box, Button, Container, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import InventoriesSection from '../../components/InventoriesSection/InventoriesSection';
import axiosBase from '../../api/axiosBase';

const UserPage = () => {
  const params = useParams();
  const { id } = params;
  const token = localStorage.getItem('token');

  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosBase.get(`/users/${id}`);
        setUserData(res.data.user || null);
      } catch (err) {
        console.error('Error loading user:', err);
      }
    };
    fetchUser();
  }, [id]);

  useEffect(() => {
    if (user.role !== 'admin') {
      navigate('/dashboard');
      return;
    }
  }, [navigate, user]);

  if (!userData) {
    return <>No user data</>;
  }

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
        User Page
      </Typography>
      <Button
        sx={{ marginBottom: '10px' }}
        variant="contained"
        size="small"
        color="primary"
        onClick={() => navigate('/admin-panel')}
      >
        Back to adminPanel
      </Button>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 2,
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography
                variant="h5"
                component="h2"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  mb: 2,
                }}
              >
                Information user:
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Unique identifier
              </Typography>
              <Typography variant="h6" component="div">
                {userData.id || 'Not available'}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Name
              </Typography>
              <Typography variant="h6" component="div">
                {userData.name || 'Not available'}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Email
              </Typography>
              <Typography variant="h6" component="div">
                {userData.email || 'Not available'}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="caption" color="text.secondary">
                Role
              </Typography>
              <Typography variant="h6" component="div">
                {userData.role || 'Not available'}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
      <InventoriesSection token={token} userId={id} header={`${userData.name} inventories`} />
    </Container>
  );
};

export default UserPage;
