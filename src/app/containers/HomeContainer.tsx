import { HomeLayout } from '@ui/layouts/HomeLayout';
import { Outlet } from 'react-router-dom';


export const HomeContainer = () => {
  return (
    <HomeLayout>
      <Outlet />
    </HomeLayout>
  );
};
