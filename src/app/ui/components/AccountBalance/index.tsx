import './style.scss';	

export const AccountBalance = () => {
  return (
    <section className="account-balance">
      <div className="account-balance__wrapper-text">
        <h3 className='account-balance__title'>Available Balance</h3>
        <p className='account-balance__amount'>1000,00</p>
      </div>
    </section>
  );
};
