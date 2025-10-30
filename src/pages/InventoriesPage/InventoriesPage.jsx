import { useEffect, useState } from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import { Box, Typography, CircularProgress, Button, Snackbar, Alert } from '@mui/material';
import InventoryTable from './InventoryTable';
import InventoryModal from '../../components/Utils/InventoryModal';

const InventoriesPage = () => {
  const [inventories, setInventories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isSuccessCreatedAlert, setIsSuccessCreatedAlert] = useState(false);

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
      <Typography
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontWeight: 'bold',
          gap: '10px',
        }}
      >
        Total number of inventory items: <h2>{inventories.length}</h2>
      </Typography>
      <Button
        onClick={() => setShowModal(true)}
        sx={{ marginBottom: '40px' }}
        color="primary"
        variant="contained"
      >
        Create New Inventory
      </Button>
      {isSuccessCreatedAlert ? <Alert sx={{ marginBottom: '20px' }}>Success</Alert> : null}

      <Snackbar
        open={Boolean(successMessage)}
        autoHideDuration={3000}
        onClose={() => setSuccessMessage('')}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>
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
        setIsSuccessCreatedAlert={setIsSuccessCreatedAlert}
      />
    </Box>
  );
};

export default InventoriesPage;
