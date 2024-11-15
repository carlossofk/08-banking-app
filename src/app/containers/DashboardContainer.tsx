import { AccountBalance } from '@ui/components/AccountBalance';
import { PanelLayout } from '@ui/layouts/PanelLayout';

export const DashboardContainer = () => {
  return (
    <PanelLayout>
      <AccountBalance />
    </PanelLayout>
  );
};
