import { WithdrawalForm } from '@ui/forms/WithdrawalForm';
import { PanelLayout } from '@ui/layouts/PanelLayout';

export const WithdrawalContainer = () => {
  return (
    <PanelLayout>
      <WithdrawalForm  onSubmit={(data) => console.log(data)} />
    </PanelLayout>
  );
};