import { lazy } from 'react';
import { useModalShare } from '@core-hooks/hook-app/useModalShare';
import { MODAL_TYPE } from '@core-interfaces/app/modal-share';
import { ResponsiveModal } from '@ui/components/ResponsiveModal';
// import { TransactionDetails } from '@ui/components/TransactionDetails';


//  ====> Lazy imports
const LazyTransactionDetails = lazy(() =>  import('@ui/components/TransactionDetails')
  .then((module) => ({  default: module.TransactionDetails, }))
);

export const ModalShare = () => {

  const {  modalState, modalContent, closeShareModal } = useModalShare();

  return (
    <>

      {/* ==> Modal Transaction */}
      <ResponsiveModal
        isOpen={modalState.MODAL_TRANSACTION.isOpen}
        onClose={() => closeShareModal(MODAL_TYPE.MODAL_TRANSACTION)}
        size='small'
      >
        <LazyTransactionDetails 
          data={modalContent?.MODAL_TRANSACTION}
          closeModal={() => closeShareModal(MODAL_TYPE.MODAL_TRANSACTION)}
        />
      </ResponsiveModal>
    </>
  );
};