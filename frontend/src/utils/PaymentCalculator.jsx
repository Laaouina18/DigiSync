// utils/PaymentCalculator.js
export const calculatePayments = (charges, appartement) => {
    const monthlyTotal = charges
      .filter(charge => charge.periodicite === 'MENSUEL')
      .reduce((sum, charge) => sum + charge.montant, 0);
  
    const quarterlyTotal = charges
      .filter(charge => charge.periodicite === 'TRIMESTRIEL')
      .reduce((sum, charge) => sum + (charge.montant / 3), 0);
  
    const yearlyTotal = charges
      .filter(charge => charge.periodicite === 'ANNUEL')
      .reduce((sum, charge) => sum + (charge.montant / 12), 0);
  
    const monthlyPayment = monthlyTotal + quarterlyTotal + yearlyTotal;
  
    return {
      monthlyPayment,
      yearlyTotal: monthlyPayment * 12,
      details: {
        monthly: monthlyTotal,
        quarterly: quarterlyTotal,
        yearly: yearlyTotal
      }
    };
  };
  