import { memo, useRef, useEffect, useState } from 'react';
import { HeroCard, mockContents } from '../App';
import { getCards } from '../api';
import Input from './input';
import { Card } from '../types';

const initialDeckId = Math.floor(Math.random() * 10) + 1;

const Deck = memo(() => {
  const paramsPrefix = 'decks?id=';
  const inputIdRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchInitialCards = async () => {
      const cards = await getCards(initialDeckId);
      setCards(cards);
    };
    fetchInitialCards();
  }, []);

  useEffect(() => {
    //change url params when
    window.history.pushState(null, '', `${paramsPrefix}${initialDeckId}`);
  }, []);

  const [cards, setCards] = useState<Card[]>([]);
  
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputIdRef.current && inputIdRef.current.value !== '') {
      window.history.replaceState(
        null,
        '',
        `${paramsPrefix}${inputIdRef.current.value}`
      );
      const cards = await getCards(Number(inputIdRef.current?.value));
      setCards(cards);
      inputIdRef.current.value = '';
    }
  };
  console.log('render Deck');

  return (
    <>
      <Input onSubmit={onSubmit} inputRef={inputIdRef} />
      {cards.length ? (
        <>
          <h1 className="my-5">{mockContents.heroesListLabel}</h1>
          <div
            className={`w-full h-full flex flex-col md:flex-row md:items-start items-center md:justify-evenly`}
          >
            {cards.map((card, key) => (
              <HeroCard key={key} cardDetails={card} />
            ))}
          </div>
        </>
      ) : null}
    </>
  );
});
export default Deck;
