import { createHashRouter } from 'react-router-dom';

import { LoginContainer } from '@containers/LoginContainer';
import { DashboardContainer } from '@containers/DashboardContainer';
import { AuthGuard } from '@routes-guards/Auth.guard';
import { NotFound } from '@ui/views/NotFound';


export const router = createHashRouter(
  [
    { path:'*', element: <NotFound /> },  
    {
      path: '/',
      element: (
        <LoginContainer />
      ),
    },
    {
      path: '/dashboard',
      element: (
        <AuthGuard rolAccepted={[ 'VIP' ]}>
          <DashboardContainer />
        </AuthGuard>
      ),

      children: [
        {
          index: true,
          path: 'home',
          element: <>home</>
        },
        {
          path: 'profile',
          element: <>profile</>
        },
        {
          path: 'settings',
          element: <>settings</>
        },
      ],
    },
  ],
  {
    future: {
      v7_fetcherPersist: true,
      v7_relativeSplatPath: true,
      v7_partialHydration: true,
      v7_normalizeFormMethod: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);