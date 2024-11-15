
import './style.scss';  

interface Props {
    children: React.ReactNode
}

export const LoginLayout = ({ children }:Props) => {  
  return (
    <section className="login-layout">
      <div className='login-layout__wrapper'>
        <article className='login-layout__content'>
          {children}
        </article>
      </div>
    </section>  
  );
};
