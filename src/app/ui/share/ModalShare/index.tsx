import { useModalShare } from '@core-hooks/hook-app/useModalShare';
import { MODAL_TYPE } from '@core-interfaces/app/modal-share';
import { ResponsiveModal } from '@ui/components/ResponsiveModal';
import { TransactionRecive } from '@ui/components/TransactionRecive';

export const ModalShare = () => {

  const {  modalState ,  closeShareModal } = useModalShare();

  return (
    <>

      {/* ==> Modal Transaction */}
      <ResponsiveModal
        isOpen={modalState.MODAL_TRANSACTION.isOpen}
        onClose={() => closeShareModal(MODAL_TYPE.MODAL_TRANSACTION)}
        size='small'
      >
        <TransactionRecive />
      </ResponsiveModal>
    </>
  );
};
