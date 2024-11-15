import  { useState } from 'react';
import { FaUserCircle, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '@core-hooks/hook-auth/useAuth';

import './styles.scss';

export const Topbar = () => {
  const { logoutUser } = useAuth();
  const [ isDropdownOpen, setIsDropdownOpen ] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="topbar">
      <div className="topbar__space"/>
      <div className="topbar__avatar-wrapper">
        <FaUserCircle className="topbar__avatar" onClick={toggleDropdown} />
        
        {isDropdownOpen && (
          <div className="topbar__dropdown">
            <ul className="topbar__dropdown-list">
              <li className="topbar__dropdown-item" onClick={() => console.log('Go to Profile')}>
                <FaUser className="topbar__dropdown-icon" />
                <span>Profile</span>
              </li>
              <li className="topbar__dropdown-item" onClick={() => console.log('Go to Settings')}>
                <FaCog className="topbar__dropdown-icon" />
                <span>Settings</span>
              </li>
              <li className="topbar__dropdown-item" onClick={() => logoutUser()}>
                <FaSignOutAlt className="topbar__dropdown-icon" />
                <span>Logout</span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
