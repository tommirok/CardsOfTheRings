import React, { useRef, useState, useEffect, memo } from 'react';
import Header from './components/header';
import './index.css';
import { getCards, imageBaseUrl } from './api';
import Input from './components/input';
import { Card } from './types';

const initialDeckId = Math.floor(Math.random() * 100) + 1;

export const mockContents = {
  appTitle: 'Cards of the Rings',
  inputIdLabel: 'Search for a decklist here',
  formValidation: 'Enter number greater than 0',
  heroesListLabel: 'Here are your heroes',
};
type ModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  children: React.ReactNode;
};
const Modal = ({ isOpen, closeModal, children }: ModalProps) => {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      console.log('open modal');

      ref.current?.showModal();
    } else {
      console.log('close modal');

      ref.current?.close();
    }
  }, [isOpen]);

  return (
    <dialog ref={ref} onCancel={closeModal}>
      {children}
      <button onClick={closeModal}>Close</button>
    </dialog>
  );
};

type HeroProps = {
  name: string;
  imageSrc: string;
};
const HeroCard = memo((props: HeroProps) => {
  console.log('render HeroCard');

  const [isModalOpen, setModal] = useState(false);
  const [isImageLoaded, setImageLoaded] = useState(false);
  return (
    <>
      <div className="flex flex-col p-2 m-2">
        <button
          onClick={() => setModal(true)}
          className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 active:translate-y-1 active:scale-100 duration-300"
        >
          <img
            className="w-80"
            style={{ display: isImageLoaded ? 'block' : 'none' }}
            src={`${imageBaseUrl}${props.imageSrc}`}
            alt={'Hero Image'}
            onLoad={() => setImageLoaded(true)}
          />
        </button>
        <Modal isOpen={isModalOpen} closeModal={() => setModal(false)}>
          <div className="h-80 w-80 bg-white">
            <p>Moooodaaalll</p>
          </div>
        </Modal>
      </div>
    </>
  );
});

const Deck = memo(() => {
  const inputIdRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchInitialCards = async () => {
      const cards = await getCards(initialDeckId);
      setCards(cards);
    };
    fetchInitialCards();
  }, []);

  useEffect(() => {
    window.history.pushState(null, '', `?id=${initialDeckId}`);
  }, []);

  const [cards, setCards] = useState<Card[]>([]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputIdRef.current && inputIdRef.current.value !== '') {
      window.history.pushState(null, '', `?id=${inputIdRef.current.value}`);
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
          <div className="w-full h-full flex flex-col md:flex-row  justify-start">
            {cards.map((card, _key) => (
              <HeroCard imageSrc={card.imagesrc} key={_key} name={card.name} />
            ))}
          </div>
        </>
      ) : null}
    </>
  );
});

function App() {
  console.log('App render');

  return (
    <>
      <div className="h-screen w-screen flex flex-col md:flex-row  justify-center items-center">
        <div className="w-5/6 h-5/6">
          <Header title={mockContents.appTitle} />
          <div>
            <Deck />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
