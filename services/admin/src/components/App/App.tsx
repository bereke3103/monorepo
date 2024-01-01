import { Outlet } from 'react-router-dom';
import UserCard from '@packages/shared/src/components/UserCard';

const App = () => {
  return (
    <div>
      ADMIN MODULES PARENT
      <UserCard username="ADMIN USER" />
      <Outlet />
    </div>
  );
};

export default App;
