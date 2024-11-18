import { useTransaction } from '@core-hooks/hook-app/useTransaction';
import { WithdrawalForm } from '@ui/forms/WithdrawalForm';
import { PanelLayout } from '@ui/layouts/PanelLayout';

export const WithdrawalContainer = () => {
  const{ handleWithdraw, loadingOperations } = useTransaction();
  return (
    <PanelLayout>
      <WithdrawalForm  
        handleSubmitForm={handleWithdraw} 
        loadingSubmit={loadingOperations} 
      />
    </PanelLayout>
  );
};