import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useState, useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import axiosBase from '../../api/axiosBase';

const ItemsModal = ({
  open = false,
  onClose,
  title = 'Add items',
  submitButtonText = 'Create',
  inventory,
  userId,
  onItemCreated,
}) => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fields = useMemo(() => inventory?.fields || [], [inventory]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleCancel = useCallback(() => {
    reset();
    onClose();
  }, [reset, onClose]);

  const handleFormSubmit = useCallback(
    async (data) => {
      try {
        setLoading(true);
        setError('');

        const res = await axiosBase.post(`/inventories/${inventory.id}`, {
          userId,
          values: data,
        });
        if (onItemCreated) {
          onItemCreated(res.data.item);
        }
        reset();
        onClose();
      } catch (err) {
        const msg = err.response?.data?.error || err.message || 'Error while creating item';
        setError(msg);
      } finally {
        setLoading(false);
      }
    },
    [inventory?.id, userId, onItemCreated, onClose, reset],
  );

  const renderField = (field) => {
    const isNumber = field.field_type === 'number';
    return (
      <TextField
        key={field.field_name}
        fullWidth
        required
        id={field.field_name}
        label={field.field_name}
        type="text"
        variant="outlined"
        margin="normal"
        disabled={loading}
        error={!!errors[field.field_name]}
        helperText={errors[field.field_name]?.message(isNumber ? 'Enter a number' : '')}
        onInput={(e) => {
          if (isNumber) e.target.value = e.target.value.replace(/[^0-9]/g, '');
        }}
        {...register(field.field_name, {
          required: `Field ${field.field_name} is required`,
          pattern: isNumber
            ? {
                value: /^[0-9]+$/,
                message: 'Only numbers are allowed',
              }
            : undefined,
          setValueAs: (v) => (isNumber && v !== '' ? Number(v) : v),
        })}
      />
    );
  };

  return (
    <Dialog open={open} onClose={handleCancel} maxWidth="sm" fullWidth>
      <DialogTitle>{title}</DialogTitle>

      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogContent>
          {fields.length === 0 ? (
            <Alert severity="info">There are no fields for this inventory.</Alert>
          ) : (
            fields.map(renderField)
          )}

          {error && (
            <Alert variant="outlined" severity="error" sx={{ mt: 2 }}>
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
