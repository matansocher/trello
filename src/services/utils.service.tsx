import { ICard } from '@models';

export function getNumOfDaysAfterToday(date: string): number {
  return new Date(date).getDate() - new Date().getDate();
}

export function getOverdueDate(date: string): string {
  const dateObj = new Date(date);
  const month = dateObj.toLocaleString('default', { month: 'short' });
  const day = dateObj.getDate();
  return `${month} ${day}`;
}

export function sortCardsByListOrder(cardIdsToSortBy: string[], cards: ICard[]) {
  return cards.sort((cardA, cardB) => {
    let cardAIndex = cardIdsToSortBy.indexOf(cardA.id || '');
    let cardBIndex = cardIdsToSortBy.indexOf(cardB.id || '');

    // If one of the cards is not found in cardIdsToSortBy, it's placed at the end
    if (cardAIndex === -1) cardAIndex = Number.MAX_VALUE;
    if (cardBIndex === -1) cardBIndex = Number.MAX_VALUE;

    return cardAIndex - cardBIndex;
  });
}
