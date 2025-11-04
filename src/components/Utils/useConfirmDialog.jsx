import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';
import { useState } from 'react';

export default function useConfirmDialog() {
  const [confirmState, setConfirmState] = useState({
    open: false,
    title: '',
    message: '',
    onConfirm: null,
  });

  const openConfirm = (options) => {
    setConfirmState({
      open: true,
      title: options.title || 'Are you sure?',
      message: options.message || 'Please confirm your action.',
      onConfirm: options.onConfirm,
    });
  };

  const ConfirmDialog = (
    <Dialog
      open={confirmState.open}
      onClose={() => setConfirmState((s) => ({ ...s, open: false }))}
    >
      <DialogTitle>{confirmState.title}</DialogTitle>
      <DialogContent>
        <Typography>{confirmState.message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setConfirmState((s) => ({ ...s, open: false }))}>Cancel</Button>
        <Button
          color="error"
          variant="contained"
          onClick={() => {
            confirmState.onConfirm?.();
            setConfirmState((s) => ({ ...s, open: false }));
          }}
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );

  return { openConfirm, ConfirmDialog };
}
