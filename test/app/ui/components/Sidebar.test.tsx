import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import { Sidebar } from '@ui/components/Sidebar';

describe('<Sidebar />', () => {

  test('Renders sidebar with toggle button and navigation links', () => {
    const { getByAltText, queryByText } = render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );

    expect(getByAltText('Toggle Sidebar')).toBeInTheDocument();

    expect(queryByText('Dashboard')).not.toBeInTheDocument();
    expect(queryByText('Deposit Money')).not.toBeInTheDocument();
    expect(queryByText('Purchase')).not.toBeInTheDocument();
    expect(queryByText('Send Money')).not.toBeInTheDocument();
  });

  test('Toggles the sidebar when the toggle button is clicked', () => {
    const { getByAltText, queryByText } = render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );

    const toggleButton = getByAltText('Toggle Sidebar');
    
    expect(queryByText('Dashboard')).not.toBeInTheDocument();

    fireEvent.click(toggleButton);
    expect(queryByText('Dashboard')).toBeInTheDocument();

    fireEvent.click(toggleButton);
    expect(queryByText('Dashboard')).not.toBeInTheDocument();
  });

  test('Highlights the correct link based on the current path', () => {
    const { container } = render(
      <MemoryRouter initialEntries={[ '/home/deposit' ]}>
        <Sidebar />
      </MemoryRouter>
    );

    const links = container.querySelectorAll('.sidebar__item');

    expect(links[1]).toHaveClass('sidebar__item--active'); // Segundo enlace: 'Deposit Money'
    
    expect(links[0]).not.toHaveClass('sidebar__item--active'); 
    expect(links[2]).not.toHaveClass('sidebar__item--active');
    expect(links[3]).not.toHaveClass('sidebar__item--active'); 
  });

  test('Renders correct icon classes for each link', () => {
    const { container } = render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );

    expect(container.querySelector('.sidebar__icon')).toBeTruthy();
    expect(container.querySelectorAll('.sidebar__icon').length).toBe(4); 
  });

  test('Handles navigation correctly when a link is clicked', () => {
    const { container, getByText } = render(
      <MemoryRouter initialEntries={[ '/home/dashboard' ]}>
        <Routes>
          <Route path="/home/dashboard" element={<Sidebar />} />
          <Route path="/home/deposit" element={<div>Deposit Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    const links = container.querySelectorAll('.sidebar__item');
    const depositLink = links[1];

    fireEvent.click(depositLink);

    expect(getByText('Deposit Page')).toBeInTheDocument();
  });
});
