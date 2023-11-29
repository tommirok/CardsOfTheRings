const BaseUrl: string = 'https://ringsdb.com/api/public';
export const imageBaseUrl: string = 'https://ringsdb.com';

import { Card, Deck } from '../types';

const getDeckById = async (deckId: number): Promise<Deck> =>
  await fetch(`${BaseUrl}/decklist/${deckId}`).then((res) => res.json());

export const getCards = async (deckId: number): Promise<Card[]> => {
  const deck = await getDeckById(deckId);

  const cardsCodes = Object.keys(deck.heroes);
  const cards = cardsCodes.map(
    async (code) =>
      await fetch(`${BaseUrl}/card/${code}`).then((res) => res.json())
  );
  const cardsArr: Card[] = await Promise.all(cards);
  return cardsArr;
};
