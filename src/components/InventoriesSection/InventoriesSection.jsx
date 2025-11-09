import { useEffect, useState, useCallback } from 'react';
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
import InventoryModal from '../Utils/InventoryModal';
import InventoryTable from '../InventoryTable/InventoryTable';
import axiosBase from '../../api/axiosBase';

const InventoriesSection = ({ token, userId, header }) => {
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

        if (!userId) {
          console.error('User ID not found in localStorage');
          return;
        }

        const res = await axiosBase.get(`/inventories/${userId}`);

        setInventories(res.data.inventories || []);
      } catch (err) {
        console.error('Error loading inventories:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchInventories();
  }, [token, userId]);

  useEffect(() => {
    if (isSuccessCreatedAlert) {
      const timer = setTimeout(() => {
        setIsSuccessCreatedAlert(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isSuccessCreatedAlert]);

  const handleDeleteInventory = async ({ deleteInventoryId }) => {
    try {
      await axiosBase.delete(`/inventories/${deleteInventoryId}`, {
        data: { userId, deleteInventoryId },
      });
      setInventories(inventories.filter((e) => e.id !== deleteInventoryId));
    } catch (err) {
      console.error('Error deleting inventory:', err);
    }
  };

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
        {header}
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
              <InventoryTable
                inventory={inventory}
                handleDeleteInventory={handleDeleteInventory}
                withControls
                token={token}
                userId={userId}
              />
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
        userId={userId}
        onClose={() => setShowModal(false)}
        setIsSuccessCreatedAlert={setIsSuccessCreatedAlert}
        inventories={inventories}
        setInventories={setInventories}
      />
    </Box>
  );
};

export default InventoriesSection;
