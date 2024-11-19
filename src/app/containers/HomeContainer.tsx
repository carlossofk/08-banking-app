import { Outlet } from 'react-router-dom';

import useAccounts from '@core-hooks/hook-app/useAccounts';
import { HomeLayout } from '@ui/layouts/HomeLayout';
import { ModalShare } from '@ui/share/ModalShare';


export const HomeContainer = () => {
  useAccounts();
  return (
    <HomeLayout>
      <ModalShare />
      <Outlet />
    </HomeLayout>
  );
};
