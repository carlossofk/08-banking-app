
import { FaHome } from 'react-icons/fa';
import { TbCash } from 'react-icons/tb';
import './styles.scss';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { GiPayMoney } from 'react-icons/gi';

const paths = {
  dashboard: {
    name: 'Dashboard',
    path: '/home/dashboard',
  },
  deposit: {
    name: 'Deposit Money',
    path: '/home/deposit',
  },
  withdraw: {
    name: 'Withdraw Money',
    path: '/home/withdraw',
  },
};

export const Sidebar = () => {
  const [ isCollapsed, setIsCollapsed ] = useState(true);
  const location = useLocation();
  
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  
  return (
    <aside className={'sidebar'}>
      <button className="sidebar__toggle" onClick={toggleSidebar}>
        <img className="sidebar__toggle--icon" src="src/assets/logos/logo-transfer.svg" alt="Toggle Sidebar" />
      </button>
      <nav className="sidebar__nav">
        <ul className='sidebar__list'>
          <Link 
            to="/home/dashboard"
            className={`sidebar__item ${(paths.dashboard.path == location.pathname) || location.pathname == '/home' ? 'sidebar__item--active' : ''}`} 
          >
            <FaHome className="sidebar__icon" />
            {!isCollapsed && <span className='sidebar__label'>Dashboard</span>}
          </Link>
          <Link 
            to="/home/deposit"
            className={`sidebar__item ${paths.deposit.path == location.pathname ? 'sidebar__item--active' : ''}`} 
          >
            <GiPayMoney className="sidebar__icon" />
            {!isCollapsed && <span className='sidebar__label'>Deposit Money</span>}
          </Link>
          <Link 
            to="/home/withdraw"
            className={`sidebar__item ${paths.withdraw.path == location.pathname  ? 'sidebar__item--active' : ''}`} 
          >
            <TbCash className="sidebar__icon" />
            {!isCollapsed && <span className='sidebar__label'>Send Money</span>}
          </Link>
        </ul>
      </nav>
    </aside>
  );
};

