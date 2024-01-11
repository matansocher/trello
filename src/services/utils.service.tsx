import { ICard, IUser } from '@models';

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export function getUserFromGoogleUser(googleUser: any): IUser | null {
  if (!googleUser) {
    return null;
  }
  return {
    id: googleUser.uid,
    displayName: googleUser.displayName,
    email: googleUser.email,
    phoneNumber: googleUser.phoneNumber,
    photoURL: googleUser.photoURL,
  } as IUser;
}

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
    let cardAIndex = cardIdsToSortBy.indexOf(cardA.id as string);
    let cardBIndex = cardIdsToSortBy.indexOf(cardB.id as string);

    // If one of the cards is not found in cardIdsToSortBy, it's placed at the end
    if (cardAIndex === -1) cardAIndex = Number.MAX_VALUE;
    if (cardBIndex === -1) cardBIndex = Number.MAX_VALUE;

    return cardAIndex - cardBIndex;
  });
}

export function getStorageLinkUrl(fileName: string) {
  return `https://firebasestorage.googleapis.com/v0/b/trello-339cc.appspot.com/o/${fileName}?alt=media`
}

export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
