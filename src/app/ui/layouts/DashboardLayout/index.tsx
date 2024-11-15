
// import { useState } from 'react';
// import './styles.scss';
// interface Props {
//   children: React.ReactNode;
// }

// export const DashboardLayout = ({ children }: Props) => { 
   
//   return (
//     <div className="dashboard-layout">
//       <aside className="dashboard-layout__sidebar">
//         <nav className="dashboard-layout__nav">
//           <a href="#home" className="dashboard-layout__link">Home</a>
//           <a href="#profile" className="dashboard-layout__link">Profile</a>
//           <a href="#settings" className="dashboard-layout__link">Settings</a>
//         </nav>
//       </aside>
//       <header className="dashboard-layout__topbar">
//         <h1 className="dashboard-layout__title">Dashboard</h1>
//       </header>
//       <main className="dashboard-layout__main">
//         {children}
//       </main>
//     </div>);
// };

import { useState } from 'react';
// import { Home, Person, Settings, Menu } from '@mui/icons-material';
import { FaHome, FaUser, FaCog, FaBars } from 'react-icons/fa';
import './styles.scss';

interface Props {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: Props) => { 
  const [ isCollapsed, setIsCollapsed ] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  
  return (
    <div className={`dashboard-layout ${isCollapsed ? 'collapsed' : ''}`}>
      <aside className="dashboard-layout__sidebar">
        <button
          className="dashboard-layout__toggle"
          onClick={toggleSidebar}
        >
          <FaBars />
        </button>
        <nav className="dashboard-layout__nav">
          <a href="#home" className="dashboard-layout__link">
            <FaHome className="dashboard-layout__icon" />
            {!isCollapsed && <span>Home</span>}
          </a>
          <a href="#profile" className="dashboard-layout__link">
            <FaUser className="dashboard-layout__icon" />
            {!isCollapsed && <span>Profile</span>}
          </a>
          <a href="#settings" className="dashboard-layout__link">
            <FaCog className="dashboard-layout__icon" />
            {!isCollapsed && <span>Settings</span>}
          </a>
        </nav>
      </aside>
      <header className="dashboard-layout__topbar">
        <h1 className="dashboard-layout__title">Dashboard</h1>
      </header>
      <main className="dashboard-layout__main">
        {children}
      </main>
    </div>
  );
};
