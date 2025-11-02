import { Alert, Button, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import ItemsModal from '../../components/Utils/ItemsModal';
import axios from 'axios';
import useConfirmDialog from '../../components/Utils/useConfirmDialog';

const InventoryTable = ({ inventory, handleDeleteInventory }) => {
  const { id, name, user_id, category_name, fields = [], items = [] } = inventory;

  const columns = fields.map(({ field_name = '' }) => ({
    field: field_name,
    headerName: field_name,
    width: 150,
  }));

  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [itemsInventory, setItemsInventory] = useState(items);

  const [error, setError] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);

  const { openConfirm, ConfirmDialog } = useConfirmDialog();

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  const handleOnRowSelectionModelChange = ({ type, ids }) => {
    if (type === 'include') {
      setSelectedRows([...ids]);
    }

    if (type === 'exclude') {
      const selectedItems = itemsInventory
        .filter(({ id }) => ![...ids].includes(id))
        .map(({ id }) => id);
      setSelectedRows(selectedItems);
    }
  };

  const rows = itemsInventory.map((item) => ({
    id: item.id,
    created_at: item.created_at,
    ...(item.values || {}),
  }));

  const handleItemCreated = (newItem) => {
    setItemsInventory((prev) => [newItem, ...prev]);
  };

  const handleDeleteItem = async () => {
    const inventoryId = inventory.id;

    await axios.delete(`http://localhost:4000/inventories/${inventoryId}/items`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: {
        userId,
        itemIds: selectedRows,
        inventoryId,
      },
    });
    setItemsInventory((prevItems) => prevItems.filter((item) => !selectedRows.includes(item.id)));
    setSelectedRows([]);
    setSuccessMsg('Items successfully deleted.');
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  return (
    <>
      <Button
        onClick={() =>
          openConfirm({
            title: 'Delete Inventory',
            message: 'Are you sure you want to delete this inventory?',
            onConfirm: () => handleDeleteInventory({ deleteInventoryId: inventory.id }),
          })
        }
        sx={{ marginBottom: '40px' }}
        color="error"
        variant="contained"
        small
      >
        Delete inventory
      </Button>
      <Typography>Inventory ID:{id}</Typography>
      {category_name && (
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
          Name category: {category_name}
        </Typography>
      )}
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
        Name inventory: {name}
      </Typography>
      <Button onClick={() => setShowModal(true)} variant="contained">
        Add item
      </Button>
      <Button
        disabled={selectedRows.length === 0}
        onClick={() =>
          openConfirm({
            title: 'Delete Item',
            message: 'Are you sure you want to delete this items?',
            onConfirm: handleDeleteItem,
          })
        }
        sx={{ marginLeft: '20px' }}
        variant="contained"
      >
        Delete item
      </Button>
      {successMsg && (
        <Alert severity="success" sx={{ mb: 2, mt: 2 }}>
          {successMsg}
        </Alert>
      )}
      {ConfirmDialog}

      <div style={{ height: 300, width: '100%' }}>
        <DataGrid
          onRowSelectionModelChange={(rows) => handleOnRowSelectionModelChange(rows)}
          checkboxSelection
          rows={rows}
          columns={columns}
          pageSizeOptions={[5]}
          sx={{ border: 0 }}
        />
      </div>
      {error && (
        <Alert variant="outlined" severity="error">
          There is already a category with that name.
        </Alert>
      )}

      <ItemsModal
        open={showModal}
        onClose={() => setShowModal(false)}
        loading={loading}
        title="Create New Items"
        submitButtonText="Create"
        inventory={inventory}
        userId={user_id}
        onItemCreated={handleItemCreated}
      />
    </>
  );
};

export default InventoryTable;
