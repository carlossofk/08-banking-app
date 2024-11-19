import { useContext } from 'react';
import { MODAL_TYPE, ModalShareContentType } from '@core-interfaces/app/modal-share';
import { AppContext } from '@core-state/app-context/AppContext';
import { closeShareModalAction, openShareModalAction, setShareModalContentAction } from '@core-state/app-context/modal-share/actions';

export const useModalShare = () => {
  const { dispatch, state } = useContext(AppContext);

  const openShareModal = (typeModal: MODAL_TYPE) => {
    dispatch(
      openShareModalAction( { modaltype: typeModal } ) 
    );
  };

  const closeShareModal = (typeModal: MODAL_TYPE) => {
    dispatch(
      closeShareModalAction( { modaltype: typeModal } )
    );
  };

  const setDataShareModal = (typeModal: MODAL_TYPE, content: ModalShareContentType ) => {
    dispatch(
      setShareModalContentAction({
        modaltype: typeModal,
        content
      })
    );
  };

  return {	
    modalState: state.modalShare,
    modalContent: state?.modalShareContent,
    openShareModal, 
    closeShareModal,
    setDataShareModal
  };
};
