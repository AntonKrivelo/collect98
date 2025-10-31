import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const ItemsModal = ({
  open = false,
  onClose,
  onSubmit,
  title = 'Add items',
  submitButtonText = 'Create',
  inventory,
  userId,
  onItemCreated,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleFormSubmit = async (data) => {
    try {
      setLoading(true);
      setError('');

      const res = await axios.post(
        `http://localhost:4000/inventories/${inventory.id}`,
        {
          userId,
          values: data,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (onItemCreated) {
        onItemCreated(res.data.item);
      }
      reset();
      onClose();
    } catch (err) {
      if (err.response) {
        setError(err.response.data?.error || 'error is create elem');
      } else {
        setError(err.message || 'err server');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    reset();
    onClose();
  };

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const fields = inventory?.fields || [];

  console.log(inventory);

  return (
    <Dialog open={open} onClose={handleCancel} maxWidth="sm" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogContent>
          {fields.length === 0 && (
            <Alert severity="info">There are no fields for this inventory.</Alert>
          )}

          {fields.map((field) => (
            <TextField
              key={field.field_name}
              fullWidth
              required
              id={field.field_name}
              label={field.field_name}
              type={field.field_type === 'number' ? 'number' : 'text'}
              variant="outlined"
              margin="normal"
              {...register(field.field_name, {
                required: `field "${field.field_name}" required`,
              })}
              error={!!errors[field.field_name]}
              helperText={
                errors[field.field_name]?.message ||
                (field.field_type === 'number' ? 'Enter a number' : '')
              }
              disabled={loading}
            />
          ))}

          {error && (
            <Alert variant="outlined" severity="error">
              {error}
            </Alert>
          )}
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={handleCancel} disabled={loading} variant="outlined">
            Cancel
          </Button>
          <Button
            variant="contained"
            type="submit"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={16} /> : null}
            sx={{ minWidth: 100 }}
          >
            {loading ? 'Creating...' : submitButtonText}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ItemsModal;
