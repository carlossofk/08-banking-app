import { vi, Mock } from 'vitest';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import { TransactionDetails } from '@ui/components/TransactionDetails';

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>();
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});


describe('<TransactionDetails />', () => {

  test('Renders component with default values', () => {
    const { getByText , getAllByText } = render(
      <TransactionDetails closeModal={vi.fn()} />
    );

    
    expect(getByText('Transaction Details')).toBeInTheDocument();
    expect(getByText('Account Origin:')).toBeInTheDocument();

    const allMinusSigns = getAllByText('-', { exact: false });
    expect(allMinusSigns.length).toBeGreaterThan(0);

    const allAmounts = getAllByText('$ 0.00', { exact: false });
    expect(allAmounts.length).toBeGreaterThan(0);
  });
   

  test('Renders component with provided data', () => {
    const mockData: React.ComponentProps<typeof TransactionDetails>['data'] = {
      accountOrigin: 12345678,
      accountDestination: '87654321',
      balance: 1000,
      typeTransaction: 'Deposit',
      taxTransaction: 50,
      amountTransaction: 950,
    };
  
    const { getByText } = render(
      <TransactionDetails data={mockData} closeModal={vi.fn()} />
    );
  
    expect(getByText(`${mockData.accountOrigin}`)).toBeInTheDocument(); 
    expect(getByText(`${mockData.accountDestination}`)).toBeInTheDocument();
    expect(getByText('$ 1,000.00')).toBeInTheDocument();
    expect(getByText(`${mockData?.typeTransaction}`)).toBeInTheDocument();
    expect(getByText('$ 50.00')).toBeInTheDocument();
    expect(getByText('$ 950.00')).toBeInTheDocument();
  });
  
  
  test('Calls closeModal and navigates on Finalize click', () => {
    const closeModalMock = vi.fn();
    const navigateMock = vi.fn();
    (useNavigate as Mock).mockReturnValue( navigateMock);
  
    const {  getByTestId } = render(
      <MemoryRouter>
        <TransactionDetails closeModal={closeModalMock} />
      </MemoryRouter>
    );

    fireEvent.click(getByTestId('transaction-details-finalize'));
    expect(closeModalMock).toHaveBeenCalledTimes(1); 
    expect(navigateMock).toHaveBeenCalledWith('/home/dashboard');
  });
  

  test('Formats numeric values to 2 decimal places', () => {
    const mockData = {
      balance: 1000.555,
      taxTransaction: 50.499,
      amountTransaction: 950.1,
    };
  
    const { getByText } = render(
      <MemoryRouter>
        <TransactionDetails data={mockData} closeModal={vi.fn()} />
      </MemoryRouter>
    );
  
    expect(getByText('$ 1,000.55')).toBeInTheDocument(); 
    expect(getByText('$ 50.49')).toBeInTheDocument(); 
    expect(getByText('$ 950.10')).toBeInTheDocument(); 
  });
  

  test('Renders header icon', () => {
    const { container } = render(
      <TransactionDetails closeModal={vi.fn()} />
    );
  
    const icon = container.querySelector('.transaction-details__header__icon');
    expect(icon).toBeInTheDocument();
    expect(icon?.tagName).toContain('svg'); 
  });

});