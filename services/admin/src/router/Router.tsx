import App from '@/components/App/App';
import { LazyAbout } from '@/pages/about/About.lazy';
import { createBrowserRouter } from 'react-router-dom';
import { Suspense } from 'react';
import { adminRoutes } from '@packages/shared/src/routes/admin';

const routes = [
  {
    path: adminRoutes.admin,
    element: <App />,
    children: [
      {
        path: adminRoutes.about,
        element: (
          <Suspense fallback={'Loading...'}>
            <LazyAbout />
          </Suspense>
        ),
      },
    ],
  },
];

export const router = createBrowserRouter(routes);

export default routes;
