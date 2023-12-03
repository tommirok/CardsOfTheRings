import { memo, useRef, useEffect, useState } from 'react';
import { mockContents } from '../App';
import { getCards } from '../api';
import Input from './input';
import { Card } from '../types';
import { HeroCard } from './heroCard';

const initialDeckId = Math.floor(Math.random() * 10) + 1;

const Deck = memo(() => {
  const paramsPrefix = 'decks?id=';
  const inputIdRef = useRef<HTMLInputElement>(null);
  const [cards, setCards] = useState<Card[]>([]);
  const [error, setError] = useState(false);
  const [loading, setloading] = useState(false);

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

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setloading(true);
    setError(false);
    if (inputIdRef.current) {
      window.history.replaceState(
        null,
        '',
        `${paramsPrefix}${inputIdRef.current.value}`
      );
      try {
        const cards = await getCards(Number(inputIdRef.current?.value));
        inputIdRef.current.value = '';
        setCards(cards);
      } catch (error) {
        setError(true);
      } finally {
        setloading(false);
      }
    }
  };
  const Loader = () => {
    let circleCommonClasses = 'h-5 w-5 bg-gray-light rounded-full';

    return (
      <div className="flex">
        <div className={`${circleCommonClasses} mr-1 animate-bounce`}></div>
        <div className={`${circleCommonClasses} mr-1 animate-bounce200`}></div>
        <div className={`${circleCommonClasses} animate-bounce400`}></div>
      </div>
    );
  };
  return (
    <>
      <Input onSubmit={onSubmit} inputRef={inputIdRef} />
      {cards.length ? (
        <>
          {loading ? (
            <Loader />
          ) : (
            <h1 className="my-5">{mockContents.heroesListLabel}</h1>
          )}
          {error && <p className="text-orange">{mockContents.error}</p>}
          {cards && (
            <div
              className={`w-full h-auto flex flex-col justify-start items-center md:flex-row md:items-start md:justify-evenly`}
            >
              {cards.map((card, key) => (
                <HeroCard key={key} cardDetails={card} />
              ))}
            </div>
          )}
        </>
      ) : null}
    </>
  );
});
export default Deck;
