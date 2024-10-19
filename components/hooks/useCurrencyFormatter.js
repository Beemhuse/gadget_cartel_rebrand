export default function useCurrencyFormatter() {
    const formatCurrency = (amount) => {
      // Set up the formatter for the desired currency (e.g., USD, EUR, NGN)
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'NGN', // Change this to your desired currency, e.g., 'EUR', 'NGN'
      });
  
      return formatter.format(amount);
    };
  
    return formatCurrency;
  }