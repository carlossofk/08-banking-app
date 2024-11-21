import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import { Topbar } from '@ui/components/TopBar';


// ==> Mocks functions and custom hooks
const logoutUser = vi.fn();
vi.mock('@core-hooks/hook-auth/useAuth', () => ({
  useAuth: () => ({
    logoutUser,
  }),
}));


describe('<Topbar />', () => {
   
  test('Renders without dropdown by default', () => {
    const { queryByTestId } = render(
      <MemoryRouter>
        <Topbar />
      </MemoryRouter>
    );
    expect(queryByTestId('topbar')).toBeTruthy();
    expect(queryByTestId('topbar-dropdown')).not.toBeTruthy();
  });
  
  test('Toggles dropdown on avatar click', () => {
    const { container, queryByTestId } = render(
      <MemoryRouter>
        <Topbar />
      </MemoryRouter>
    );

    const avatar = container.querySelector('.topbar__avatar') as HTMLElement;
    fireEvent.click(avatar);
    expect(queryByTestId('topbar-dropdown')).toBeTruthy();
  
    fireEvent.click(avatar);
    expect(queryByTestId('topbar-dropdown')).not.toBeTruthy();
  });
  
  test('Calls logoutUser when Logout is clicked', () => {
    const { container, getByText } = render(
      <MemoryRouter>
        <Topbar />
      </MemoryRouter>
    );
  
    const avatar = container.querySelector('.topbar__avatar') as HTMLElement;
    fireEvent.click(avatar);

    fireEvent.click(getByText('Logout'));
    expect(logoutUser).toHaveBeenCalledTimes(1);
  });

  test('Logs correct messages on Profile and Settings click', () => {
    console.log = vi.fn();
    const { container, getByText } = render(
      <MemoryRouter>
        <Topbar />
      </MemoryRouter>
    );
  
    const avatar = container.querySelector('.topbar__avatar') as HTMLElement;
    fireEvent.click(avatar);
  
    fireEvent.click(getByText('Profile'));
    expect(console.log).toHaveBeenCalledWith('Go to Profile');

    fireEvent.click(getByText('Settings'));
    expect(console.log).toHaveBeenCalledWith('Go to Settings');
  });
  
  test('Applies correct CSS classes when dropdown is open', () => {
    const { container, getByText, queryByTestId } = render(
      <MemoryRouter>
        <Topbar />
      </MemoryRouter>
    );
    const avatar = container.querySelector('.topbar__avatar') as HTMLElement;
    fireEvent.click(avatar);

    const dropdown = queryByTestId('topbar-dropdown');
    expect(dropdown).toHaveClass('topbar__dropdown');

    expect(getByText('Profile').parentElement).toHaveClass('topbar__dropdown-item');
    expect(getByText('Settings').parentElement).toHaveClass('topbar__dropdown-item');
    expect(getByText('Logout').parentElement).toHaveClass('topbar__dropdown-item');
  });
  
});