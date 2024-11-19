import { IoMdClose } from 'react-icons/io';
import './styles.scss'; 

interface ModalProps {
  isOpen: boolean;
  size: 'small' | 'medium' | 'large';
  children: React.ReactNode;
  onClose?: () => void;
}

export const ResponsiveModal = ({ isOpen, size, children, onClose }: ModalProps) => {
  const hasAnyButton = onClose !== undefined;
  if (!isOpen) return null;

  return (
    <article className="responsive-modal">
      <div
        className={`responsive-modal__content responsive-modal-${size}`}
        onClick={(e) => e.stopPropagation()} 
      >
        {hasAnyButton && (
          <div className='modal-buttons'>
            {onClose && (<IoMdClose className="modal-buttons--close" onClick={onClose} />)}
          </div>
        )}
        <div>
          {children}
        </div>
      </div>
    </article>
  );
};

