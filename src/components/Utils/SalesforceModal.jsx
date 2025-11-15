import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Snackbar,
  Alert,
  CircularProgress,
  Box,
} from '@mui/material';
import axiosBase from '../../api/axiosBase';

const SalesforceModal = ({ open, onClose, user }) => {
  const [company, setCompany] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (open && user) {
      setCompany(user.company || '');
      setJobTitle(user.role || '');
      setPhone(user.phone || '');
      setNotes('');
    }
    if (!open) {
      setCompany('');
      setJobTitle('');
      setPhone('');
      setNotes('');
      setLoading(false);
      setErrorMsg('');
      setSuccessMsg('');
    }
  }, [open, user]);

  const handleSubmit = async () => {
    setErrorMsg('');
    setSuccessMsg('');
    if (!user || !user.email || !company) {
      setErrorMsg('Name, email and company are required.');
      return;
    }

    setLoading(true);
    try {
      const res = await axiosBase.post('/api/salesforce/create', {
        userId: user.id,
        name: user.name,
        email: user.email,
        company,
        jobTitle,
        phone,
        notes,
      });
      setSuccessMsg(`Created: AccountId=${res.data.accountId} ContactId=${res.data.contactId}`);
    } catch (err) {
      setErrorMsg(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>Send your data to Salesforce</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField label="Name" value={user?.name || ''} fullWidth disabled />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Email" value={user?.email || ''} fullWidth disabled />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Job Title"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  fullWidth
                  multiline
                  minRows={3}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit} disabled={loading}>
            {loading ? <CircularProgress size={18} /> : 'Send to Salesforce'}
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={!!successMsg} autoHideDuration={6000} onClose={() => setSuccessMsg('')}>
        <Alert severity="success">{successMsg}</Alert>
      </Snackbar>
      <Snackbar open={!!errorMsg} autoHideDuration={8000} onClose={() => setErrorMsg('')}>
        <Alert severity="error">{errorMsg}</Alert>
      </Snackbar>
    </>
  );
};

export default SalesforceModal;
