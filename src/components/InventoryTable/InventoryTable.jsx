import { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Alert, Button, ButtonGroup, Typography, Box } from '@mui/material';

import ItemsModal from '../Utils/ItemsModal';
import useConfirmDialog from '../Utils/useConfirmDialog';
import handleRowSelection from '../Utils/handleRowSelection';
import { deleteInventoryItems } from '../../api/inventories';

const deleteItems = async ({ inventoryId, token, userId, removeItemsIds }) => {
  try {
    await deleteInventoryItems({
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: {
        userId,
        itemIds: removeItemsIds,
        inventoryId,
      },
    });
  } catch (e) {
    throw new Error(e);
  }
};

const InventoryTable = ({
  inventory,
  handleDeleteInventory,
  withControls = true,
  token = '',
  userId = '',
}) => {
  const { id, name, user_id, category_name, fields = [], items = [], user_name } = inventory;

  const columns = fields.map(({ field_name = '' }) => ({
    field: field_name,
    headerName: field_name,
    width: 150,
  }));

  const displayValue = withControls ? 'inline-flex' : 'none';

  const [successMsg, setSuccessMsg] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [itemsInventory, setItemsInventory] = useState(items);
  const [selectedRows, setSelectedRows] = useState([]);

  const { openConfirm, ConfirmDialog } = useConfirmDialog();

  const rows = itemsInventory.map((item) => ({
    id: item.id,
    created_at: item.created_at,
    ...(item.values || {}),
  }));

  const handleItemCreated = (newItem) => {
    setItemsInventory((prev) => [newItem, ...prev]);
  };

  const handleDeleteItem = async () => {
    try {
      await deleteItems({
        removeItemsIds: selectedRows,
        inventoryId: id,
        userId,
        token,
      });
      setItemsInventory((prevItems) => prevItems.filter((item) => !selectedRows.includes(item.id)));
      setSelectedRows([]);
      setSuccessMsg('Items successfully deleted.');
      setTimeout(() => setSuccessMsg(''), 4000);
    } catch (e) {
      setErrorMessage('something gone wrong');
    }
  };

  const formatDate = (isoString) => {
    return new Date(isoString).toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
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
        sx={{ marginBottom: '40px', display: displayValue }}
        color="error"
        variant="contained"
        small
      >
        Delete inventory
      </Button>
      <Typography>Inventory ID:{id}</Typography>
      <Box display="flex" gap="15px">
        {category_name && (
          <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
            {category_name}:
          </Typography>
        )}
        <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
          {name}
        </Typography>
        <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
          Created by: {user_name}
        </Typography>
        <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
          Created at: {formatDate(inventory.created_at)}
        </Typography>
      </Box>
      <ButtonGroup
        sx={{ mb: 1, display: displayValue, gap: '5px' }}
        variant="contained"
        aria-label="Basic button group"
      >
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
          variant="contained"
        >
          Delete item
        </Button>
      </ButtonGroup>
      {successMsg && (
        <Alert severity="success" sx={{ mb: 2, mt: 2 }}>
          {successMsg}
        </Alert>
      )}
      {errorMessage && (
        <Alert severity="error" sx={{ mb: 2, mt: 2 }}>
          {errorMessage}
        </Alert>
      )}
      {ConfirmDialog}
      <DataGrid
        onRowSelectionModelChange={(rows) =>
          handleRowSelection({
            rows,
            setSelectedRows,
            items: itemsInventory,
          })
        }
        checkboxSelection={withControls}
        rows={rows}
        columns={columns}
        pageSizeOptions={[5]}
        sx={{ border: 0, height: 300, width: '100%' }}
      />

      <ItemsModal
        open={showModal}
        onClose={() => setShowModal(false)}
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
