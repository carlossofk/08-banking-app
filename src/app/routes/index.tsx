import { createHashRouter } from 'react-router-dom';

import { LoginContainer } from '@containers/LoginContainer';
import { HomeContainer } from '@containers/HomeContainer';
import { AuthGuard } from '@routes-guards/Auth.guard';
import { AppProvider } from '@core-state/app-context/AppContext';

import { NotFound } from '@ui/views/NotFound';
import { Dashboard } from '@ui/views/Dashboard';

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
      path: '/home',
      element: (
        <AuthGuard rolAccepted={[ 'VIP' ]}>
          <AppProvider>
            <HomeContainer />
          </AppProvider>
        </AuthGuard>
      ),

      children: [
        {
          index: true,
          path: 'dashboard',
          element: <Dashboard />
        },
        {
          path: 'deposit',
          element: <>deposit</>
        },
        {
          path: 'withdraw',
          element: <>withdraw</>
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