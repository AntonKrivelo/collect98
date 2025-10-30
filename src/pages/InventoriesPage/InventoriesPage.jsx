import { useEffect, useState } from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import {
  Box,
  Typography,
  CircularProgress,
  Button,
  Snackbar,
  Alert,
  Pagination,
} from '@mui/material';
import InventoryTable from './InventoryTable';
import InventoryModal from '../../components/Utils/InventoryModal';

const InventoriesPage = () => {
  const [inventories, setInventories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isSuccessCreatedAlert, setIsSuccessCreatedAlert] = useState(false);

  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const currentInventories = inventories.slice((page - 1) * itemsPerPage, page * itemsPerPage);

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

  useEffect(() => {
    if (isSuccessCreatedAlert) {
      const timer = setTimeout(() => {
        setIsSuccessCreatedAlert(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isSuccessCreatedAlert]);

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
      {isSuccessCreatedAlert ? <Alert sx={{ marginBottom: '20px' }}>Inventory added </Alert> : null}
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
        <>
          {currentInventories.map((inventory) => (
            <Paper key={inventory.id} sx={{ mb: 4, p: 2 }}>
              <InventoryTable inventory={inventory} />
            </Paper>
          ))}

          <Pagination
            count={Math.ceil(inventories.length / itemsPerPage)}
            page={page}
            onChange={(e, value) => setPage(value)}
            sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}
          />
        </>
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
