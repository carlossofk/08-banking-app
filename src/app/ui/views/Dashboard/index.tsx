import './style.scss';

export const Dashboard = () => {
  return (
    <article className="dashboard">
      
      {/* Current balance */}
      <section className="account-balance">
        <div className="account-balance__wrapper-text">
          <h3 className='account-balance__title'>Available Balance</h3>
          <p className='account-balance__amount'>1000,00</p>
        </div>
      </section>

      <section className="dashboard__history">
        <h2>History</h2>
        <p>1000.00</p>

      </section>
    </article>  
  );
};
