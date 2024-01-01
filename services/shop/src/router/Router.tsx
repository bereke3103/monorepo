import App from '@/components/App/App';
import { ShopIndex } from '@/pages/shop';
import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { shopRoutes } from '@packages/shared/src/routes/shop';
import UserCard from '@packages/shared/src/components/UserCard';

const routes = [
  {
    path: shopRoutes.shop,
    element: <App />,
    children: [
      {
        path: shopRoutes.main,
        element: (
          <Suspense fallback={'Loading...'}>
            <ShopIndex />
          </Suspense>
        ),
      },
      {
        path: shopRoutes.second,
        element: (
          <Suspense fallback={'Loading...'}>
            <h1>
              <UserCard username="SHOP" />
            </h1>
          </Suspense>
        ),
      },
    ],
  },
];

export const router = createBrowserRouter(routes);

export default routes;
