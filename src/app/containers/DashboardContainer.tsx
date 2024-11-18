import { useContext } from 'react';

import { AppContext } from '@core-state/app-context/AppContext';
import { AccountBalance } from '@ui/components/AccountBalance';
import { PanelLayout } from '@ui/layouts/PanelLayout';

export const DashboardContainer = () => {
  const { state } = useContext(AppContext);
  return (
    <PanelLayout>
      <AccountBalance bankAccounts={state.bankAccounts} />
    </PanelLayout>
  );
};
