import { useTransaction } from '@core-hooks/hook-app/useTransaction';
import { DepositForm } from '@ui/forms/DepositForm';
import { PanelLayout } from '@ui/layouts/PanelLayout';

export const DepositContainer = () => {
  const { handleDeposit, loadingOperations } = useTransaction();

  return (
    <PanelLayout>
      <DepositForm 
        handleSubmitForm={handleDeposit} 
        isLoadingSubmit={loadingOperations}
      />
    </PanelLayout>
  );
};
