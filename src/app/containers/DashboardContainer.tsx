import { DashboardLayout } from '@ui/layouts/DashboardLayout';
import { Outlet } from 'react-router-dom';


export const DashboardContainer = () => {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
};
