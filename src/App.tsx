import React, { useRef, useState, useEffect } from 'react';
import Header from './components/header';
import './index.css';
import { getCards, imageBaseUrl } from './api';
import Input from './components/input';
import { Card } from './types';

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
const HeroCard = (props: HeroProps) => {
  console.log(props.imageSrc, 'imageSrc');
  const [isModalOpen, setModal] = useState(false);
  return (
    <>
      <div className="flex flex-col p-2 m-2">
        <button
          onClick={() => setModal(true)}
          className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
        >
          <img
            className="w-80"
            src={`${imageBaseUrl}${props.imageSrc}`}
            alt={'Hero Image'}
          />
        </button>
        <Modal isOpen={isModalOpen} closeModal={() => setModal(false)}>
          <div className="h-80 w-80 bg-blue">
            <p>Moooodaaalll</p>
          </div>
        </Modal>
      </div>
    </>
  );
};

const Deck = () => {
  const inputIdRef = useRef<HTMLInputElement>(null);

  const [cards, setCards] = useState<Card[]>([]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputIdRef.current && inputIdRef.current.value !== '') {
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
          <h1>{mockContents.heroesListLabel}</h1>
          <div className="w-full h-full flex justify-start">
            {cards.map((card, _key) => (
              <HeroCard imageSrc={card.imagesrc} key={_key} name={card.name} />
            ))}
          </div>
        </>
      ) : null}
    </>
  );
};

function App() {
  return (
    <>
      <div className="h-screen w-screen flex justify-center items-center bg-gray-light">
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
