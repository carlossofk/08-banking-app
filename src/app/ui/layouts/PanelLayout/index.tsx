import './style.scss';

interface Props {
  children: React.ReactNode;
}

export const PanelLayout = ({ children }: Props) => {
  return (
    <article className="dashboard">
      {children}
    </article>  
  );
};
