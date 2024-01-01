import { Link, Outlet } from 'react-router-dom';
import { adminRoutes } from '@packages/shared//src/routes/admin';
import { shopRoutes } from '@packages/shared//src/routes/shop';

const App = () => {
  return (
    <div>
      <br />
      <Link to={'/'}>Main</Link>
      <br />
      <Link to={adminRoutes.about}>About</Link>
      <br />
      {/* <Link to={'/shop/main'}>Shop</Link> */}
      <Link to={shopRoutes.main}>Shop</Link>
      <br />

      <Outlet />
    </div>
  );
};

export default App;
