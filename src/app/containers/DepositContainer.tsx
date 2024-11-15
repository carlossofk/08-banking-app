import { useTransaction } from '@core-hooks/hook-app/useTransaction';
import { DepositForm } from '@ui/forms/DepositForm';
import { PanelLayout } from '@ui/layouts/PanelLayout';

export const DepositContainer = () => {
  const { hadleDeposit, loadingOperations } = useTransaction();

  return (
    <PanelLayout>
      <DepositForm 
        handleSubmitForm={hadleDeposit} 
        isLoadingSubmit={loadingOperations}
      />
    </PanelLayout>
  );
};
