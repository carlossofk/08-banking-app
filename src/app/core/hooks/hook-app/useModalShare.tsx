import { useCallback, useContext } from 'react';
import { MODAL_TYPE, ModalShareContentType } from '@core-interfaces/app/modal-share';
import { AppContext } from '@core-state/app-context/AppContext';
import { closeShareModalAction, openShareModalAction, setShareModalContentAction } from '@core-state/app-context/modal-share/actions';

export const useModalShare = () => {
  const { dispatch, state } = useContext(AppContext);

  const openShareModal = useCallback( (typeModal: MODAL_TYPE) => {   
    dispatch(
      openShareModalAction( { modaltype: typeModal } ) 
    );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [  ]);

  const closeShareModal = useCallback(  (typeModal: MODAL_TYPE) => {
    dispatch(
      closeShareModalAction( { modaltype: typeModal } )
    );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  } , []);

  const setDataShareModal = useCallback( (typeModal: MODAL_TYPE, content: ModalShareContentType ) => {
    dispatch(
      setShareModalContentAction({
        modaltype: typeModal,
        content
      })
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ ]);

  return {	
    modalState: state.modalShare,
    modalContent: state?.modalShareContent,
    openShareModal, 
    closeShareModal,
    setDataShareModal
  };
};
