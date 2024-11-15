import { createHashRouter, Navigate } from 'react-router-dom';

import { DashboardContainer } from '@containers/DashboardContainer';
import { LoginContainer } from '@containers/LoginContainer';
import { HomeContainer } from '@containers/HomeContainer';
import { DepositContainer } from '@containers/DepositContainer';
import { PurchasedContainer } from '@containers/PurchasedContainer';
import { WithdrawalContainer } from '@containers/WithdrawalContainer';

import { AuthGuard } from '@routes-guards/Auth.guard';
import { AppProvider } from '@core-state/app-context/AppContext';

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
          element: <Navigate to="dashboard" replace /> 
        },
        {
          path: 'dashboard',
          element: <DashboardContainer />
        },
        {
          path: 'deposit',
          element: <DepositContainer />,
        },
        {
          path: 'purchase',
          element: <PurchasedContainer />,
        },
        {
          path: 'withdraw',
          element: <WithdrawalContainer />,
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