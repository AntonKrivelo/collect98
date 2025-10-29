import { useEffect, useState } from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import { Box, Typography, CircularProgress, Button } from '@mui/material';
import InventoryTable from './InventoryTable';
import InventoryModal from '../../components/Utils/InventoryModal';

const InventoriesPage = () => {
  const [inventories, setInventories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(false);
  const [success, setIsSuccess] = useState(false);

  useEffect(() => {
    const fetchInventories = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        if (!userId) {
          console.error('User ID not found in localStorage');
          return;
        }

        const res = await axios.get(`http://localhost:4000/inventories/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setInventories(res.data.inventories || []);
      } catch (err) {
        console.error('Error loading inventories:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchInventories();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1100, margin: '20px auto' }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', textAlign: 'center' }}>
        My Inventories
      </Typography>
      <Button
        onClick={() => setShowModal(true)}
        sx={{ marginBottom: '40px' }}
        color="primary"
        variant="contained"
      >
        Create New Inventory
      </Button>
      {inventories.length === 0 ? (
        <Typography>No inventories found.</Typography>
      ) : (
        inventories.map((inventory) => (
          <Paper key={inventory.id} sx={{ mb: 4, p: 2 }}>
            <InventoryTable inventory={inventory} />
          </Paper>
        ))
      )}
      <InventoryModal
        open={showModal}
        onClose={() => setShowModal(false)}
        loading={loading}
        title="Create New Inventory"
        submitButtonText="Create"
      />
    </Box>
  );
};

export default InventoriesPage;
