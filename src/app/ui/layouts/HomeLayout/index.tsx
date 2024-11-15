import { Topbar } from '@ui/components/TopBar';
import './styles.scss';
import { Sidebar } from '@ui/components/Sidebar';

interface Props {
  children: React.ReactNode;
}

export const HomeLayout = ({ children }: Props) => {
 
  
  return (
    <div className={'home-layout'}>
      <Sidebar />
      <Topbar />
      <main className="home-layout__main">
        {children}
      </main>
    </div>
  );
};
