import { useRef, useEffect, useState } from 'react';
import { mockContents } from '../App';
import { getCards } from '../api';
import Input from './input';
import { Card } from '../types';
import { HeroCard } from './heroCard';
import Loader from './loader';

const initialDeckId = Math.floor(Math.random() * 10) + 1;

const Deck = () => {
  //since there is no router in this app, we need prefix to change url params
  const paramsPrefix = 'decks?id=';
  const inputIdRef = useRef<HTMLInputElement>(null);

  const [cards, setCards] = useState<Card[]>([]);
  const [error, setError] = useState(false);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    //fetch cards initially onload for improved landing experience
    const fetchInitialCards = async () => {
      const cards = await getCards(initialDeckId);
      setCards(cards);
    };
    fetchInitialCards();
  }, []);

  useEffect(() => {
    //change url params according the initial load of decks
    window.history.pushState(null, '', `${paramsPrefix}${initialDeckId}`);
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // renders loader while fetching data
    setloading(true);
    // set the error to false to remove the error message on retry
    setError(false);
    if (inputIdRef.current) {
      // change url params according to the requested deck
      window.history.replaceState(
        null,
        '',
        `${paramsPrefix}${inputIdRef.current.value}`
      );
      try {
        const cards = await getCards(Number(inputIdRef.current?.value));
        setCards(cards);
      } catch (error) {
        setError(true);
      } finally {
        // clean up
        setloading(false);
        inputIdRef.current.value = '';
      }
    }
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
};
export default Deck;
