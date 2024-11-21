export const formatCurrency = (amount: number): string => {
  const truncatedAmount = Math.floor(amount * 100) / 100;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  })
    .format(truncatedAmount)
    .replace(/\$/, '$ ');
  ;
};