import { useTransaction } from '@core-hooks/hook-app/useTransaction';
import PurchaseForm from '@ui/forms/PurchaseForm';
import { PanelLayout } from '@ui/layouts/PanelLayout';

export const PurchasedContainer = () => {

  const { handlePurchase, loadingOperations } = useTransaction();

  return (
    <PanelLayout>
      <PurchaseForm 
        handleSubmitForm={handlePurchase}
        loadingSubmit={loadingOperations}
      />
    </PanelLayout>
  );
};
