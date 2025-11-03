import { Box, Button, Container, Paper, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import InventoryTable from '../../components/InventoryTable/InventoryTable';
// import InventoriesSection from '../../components/InventoriesSection/InventoriesSection';

const UserPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const [inventoryUser, setInventoryUser] = useState([]);

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://localhost:4000/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user || []);
        setInventoryUser(res.data.inventories || []);
      } catch (err) {
        console.error('Error loading user:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  console.log(user);

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
      </Paper>
      {inventoryUser.map((inventory) => (
        <Paper key={inventoryUser.id} sx={{ mb: 4, p: 2, mt: 4 }}>
          <InventoryTable inventory={inventory} withControls={true} />
        </Paper>
      ))}
    </Container>
  );
};

export default UserPage;
