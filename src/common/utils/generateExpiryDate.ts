function addMonths(date: Date, months: number): Date {
  const newDate = new Date(date);
  newDate.setMonth(newDate.getMonth() + months);
  return newDate;
}

export function generateExpiryDate(): Date {
  const today = new Date();
  const expiryDate = addMonths(today, 1);
  return expiryDate;
}
