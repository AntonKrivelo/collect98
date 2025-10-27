import { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { styled } from '@mui/material/styles';
import { Alert } from '@mui/material';

const useStyles = styled((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const CategoryModal = ({
  open = false,
  onClose,
  onSubmit,
  title = 'Create Category',
  submitButtonText = 'Create',
  initialData = null,
  loading = false,
}) => {
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const classes = useStyles();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      category: initialData?.name || '',
    },
  });

  const handleFormSubmit = async (data) => {
    try {
      setError('');
      await onSubmit(data.category);
      reset();
      setIsSuccess(true);
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
      }, 500);
    } catch (err) {
      setError(err.message || 'Something went wrong');
      setIsSuccess(false);
    }
  };

  const handleCancel = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleCancel} maxWidth="sm" fullWidth>
      <DialogTitle>{title}</DialogTitle>

      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogContent>
          <TextField
            fullWidth
            required
            id="category-name"
            label="Category Name"
            variant="outlined"
            margin="normal"
            {...register('category', {
              required: 'Category name is required',
              minLength: {
                value: 2,
                message: 'The name must contain at least 2 characters.',
              },
              maxLength: {
                value: 50,
                message: 'The name must not exceed 50 characters.',
              },
            })}
            error={!!errors.category}
            helperText={errors.category ? errors.category.message : ''}
            disabled={loading}
          />
          {isSuccess && (
            <div className={classes.root}>
              <Alert variant="outlined" severity="success">
                The category was successfully created!.
              </Alert>
            </div>
          )}
          {error && (
            <div className={classes.root}>
              <Alert variant="outlined" severity="error">
                There is already a category with that name.
              </Alert>
            </div>
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

export default CategoryModal;
