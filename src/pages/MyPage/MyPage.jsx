import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router';

const MyPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.status === 'blocked') {
      navigate('/auth');
      return;
    }
  }, [user]);

  return (
    <div>
      <div>My page</div>
      <h2>My Information:</h2>
      <div>
        {user && user.id ? (
          <span>Unique identifier: {user.id}</span>
        ) : (
          <span>Identifier not available</span>
        )}
      </div>
      <div>
        {user && user.name ? (
          <span>Unique identifier: {user.name}</span>
        ) : (
          <span>Identifier not available</span>
        )}
      </div>
      <div>
        {user && user.email ? (
          <span>Unique identifier: {user.email}</span>
        ) : (
          <span>Identifier not available</span>
        )}
      </div>
      <div>
        {user && user.role ? (
          <span>Unique identifier: {user.role}</span>
        ) : (
          <span>Identifier not available</span>
        )}
      </div>
    </div>
  );
};

export default MyPage;
