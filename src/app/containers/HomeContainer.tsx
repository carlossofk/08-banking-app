import useAccounts from '@core-hooks/hook-app/useAccounts';
import { HomeLayout } from '@ui/layouts/HomeLayout';
import { Outlet } from 'react-router-dom';


export const HomeContainer = () => {
  useAccounts();
  return (
    <HomeLayout>
      <Outlet />
    </HomeLayout>
  );
};
