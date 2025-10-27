import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const MyPage = () => {
  const { user } = useAuth();

  useEffect(() => {}, []);

  console.log(user);

  return (
    <div>
      <div>My page</div>
      <h2>My Information:</h2>
      <div>
        <span>Unique identifier: {user.id}</span>
      </div>
      <div>
        <span>My login:{user.name}</span>
      </div>
      <div>
        <span>My email:{user.email}</span>
      </div>
      <div>
        <span>My role:{user.role}</span>
      </div>
    </div>
  );
};

export default MyPage;
