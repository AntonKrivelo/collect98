import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const MyPage = () => {
  const { user } = useAuth();

  useEffect(() => {}, []);

  console.log(user);

  return (
    <div>
      <div>My page</div>
      <div>
        <span>{user.id}</span>
      </div>
      <div>
        <span>{user.name}</span>
      </div>
      <div>
        <span>{user.role}</span>
      </div>
    </div>
  );
};

export default MyPage;
