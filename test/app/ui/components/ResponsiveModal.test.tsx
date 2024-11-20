import { vi } from 'vitest';
import { fireEvent, render } from '@testing-library/react';
import { ResponsiveModal } from '@ui/components/ResponsiveModal';

 
describe('<ResponsiveModal />', () => {
   
  // ==> Initial States
  const modalInitialState: React.ComponentProps<typeof ResponsiveModal> = {
    isOpen: true,
    size: 'small',
    children: <div>Modal Content</div>,
  };
 
  test('Should render the modal content by default', () => {
    const { getByText, queryByTestId  } = render( 
      <ResponsiveModal {...modalInitialState} /> 
    );

    expect( queryByTestId ('responsive-modal-buttons') ).toBeFalsy();
    expect( getByText('Modal Content') ).toBeTruthy();
  });

  test('Should render the modal content according to the size', () => {
    const size = 'medium';
    const { container } = render( 
      <ResponsiveModal 
        {...modalInitialState} 
        size={size}
      /> 
    );

    const modalContent= container.querySelector('.responsive-modal__content');
    expect( modalContent).toHaveClass(`responsive-modal-${size}`);
  });

  test('Should render the buttons if exists any button', () => {
    const { queryByTestId  } = render( 
      <ResponsiveModal 
        {...modalInitialState} 
        onClose={() => {}} 
      /> 
    );

    expect( queryByTestId ('responsive-modal-buttons') ).toBeTruthy();
  });

  test('Should execute the onClose function', () => {
    const onClose = vi.fn();
    const { getByTestId  } = render( 
      <ResponsiveModal 
        {...modalInitialState} 
        onClose={onClose} 
      /> 
    );


    const buttonsContainer = getByTestId ('responsive-modal-buttons');
    fireEvent.click( 
      buttonsContainer.querySelector('.modal-buttons--close') as HTMLElement
    );
    expect( onClose ).toHaveBeenCalled();
  });
  
});