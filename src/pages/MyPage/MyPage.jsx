import { useAuth } from '../../context/AuthContext';
import { Container, Typography, Paper, Box, Alert, Button, Card, Snackbar } from '@mui/material';
import InventoriesSection from '../../components/InventoriesSection/InventoriesSection';
import { useState } from 'react';
import SalesforceModal from '../../components/Utils/SalesforceModal';
import axiosBase from '../../api/axiosBase';
import { GridCheckCircleIcon } from '@mui/x-data-grid';
import { AuthButton } from '../../components/Utils/AuthButton';

const MyPage = () => {
  const { user } = useAuth();
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const [showModal, setShowModal] = useState(false);
  const [verifyResult, setVerifyResult] = useState(false);
  const [stateUser, setStateUser] = useState(user);
  const [errorMsg, setErrorMsg] = useState('');

  const handleVerify = async () => {
    const { accountId, contactId } = stateUser.salesforce_integration;

    const query = new URLSearchParams();
    if (accountId) query.append('accountId', accountId);
    if (contactId) query.append('contactId', contactId);

    try {
      const res = await axiosBase.get(`/api/salesforce/verify?${query.toString()}`);

      const { contact } = res.data;
      if (contact.error) {
        setErrorMsg(contact.error);
        if (contact.error === 'Not found') {
          await axiosBase.patch(`/users/${stateUser.id}`, {
            salesforce_integration: null,
          });

          setStateUser({
            ...stateUser,
            salesforce_integration: null,
          });
        }
      }
      setVerifyResult(res.data);
    } catch (err) {
      setErrorMsg(err.response?.data?.error || err.message);
    }
  };
  const AUTH_ERROR = [
    'Connect Salesforce first via OAuth',
    'Unable to refresh session due to: No refresh token found in the connection',
  ];

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        sx={{
          fontWeight: 'bold',
          textAlign: 'center',
          mb: 4,
        }}
      >
        My Page
      </Typography>

      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 2,
        }}
      >
        <Card sx={{ p: 2, mt: 3 }}>
          <Typography variant="h6">Salesforce Integration</Typography>
          {!stateUser.salesforce_integration ? (
            <Button
              onClick={() => setShowModal(true)}
              disabled={!stateUser}
              variant="contained"
              size="small"
              sx={{ mb: '20px' }}
            >
              send data to salesforce
            </Button>
          ) : (
            <Button
              sx={{ mb: '20px', ml: '20px' }}
              size="small"
              variant="contained"
              onClick={handleVerify}
            >
              Verify Data
            </Button>
          )}

          {stateUser.salesforce_integration ? (
            <Box display="flex" alignItems="center" gap={1} mt={1}>
              <GridCheckCircleIcon color="success" />
              <Typography color="green">You have access to Salesforce</Typography>
            </Box>
          ) : (
            <Typography color="text.secondary">User is not connected to Salesforce yet.</Typography>
          )}
        </Card>

        <Typography
          variant="h5"
          component="h2"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            mb: 3,
          }}
        >
          My Information
        </Typography>

        {!stateUser ? (
          <Alert severity="warning">
            User data is unavailable or the profile is blocked, please contact the administrator.
          </Alert>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  Unique identifier
                </Typography>
                <Typography variant="h6" component="div">
                  {stateUser.id || 'Not available'}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  Name
                </Typography>
                <Typography variant="h6" component="div">
                  {stateUser.name || 'Not available'}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  Email
                </Typography>
                <Typography variant="h6" component="div">
                  {stateUser.email || 'Not available'}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  Role
                </Typography>
                <Typography variant="h6" component="div">
                  {stateUser.role || 'Not available'}
                </Typography>
              </Box>
            </Box>
          </Box>
        )}
        <SalesforceModal
          open={showModal}
          onClose={() => setShowModal(false)}
          user={stateUser}
          setStateUser={setStateUser}
        />
      </Paper>
      {stateUser && <InventoriesSection token={token} userId={userId} header="My inventories" />}
      {verifyResult && (
        <Box mt={2}>
          <Alert severity="info">Salesforce verification result:</Alert>

          <pre>{JSON.stringify(verifyResult, null, 2)}</pre>
        </Box>
      )}
      <Snackbar open={!!errorMsg} autoHideDuration={8000} onClose={() => setErrorMsg('')}>
        <Alert severity="error">
          {errorMsg} {AUTH_ERROR.includes(errorMsg) && <AuthButton />}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default MyPage;
