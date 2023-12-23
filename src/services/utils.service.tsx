
export function getNumOfDaysDueAfterToday(date: string): number {
  return new Date(date).getDate() - new Date().getDate();
}

export function getOverdueDate(date: string): string {
  const dateObj = new Date(date);
  const month = dateObj.toLocaleString('default', { month: 'short' });
  const day = dateObj.getDate();
  return `${month} ${day}`;
}
