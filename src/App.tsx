import { useState, memo } from 'react';
import Header from './components/header';
import './index.css';
import { imageBaseUrl } from './api';
import Modal from './components/modal';
import Deck from './views/deck';
import { Card } from './types';

export const mockContents = {
  appTitle: 'Cards of the Rings',
  inputIdLabel: 'Search for a decklist here',
  formValidation: 'Enter number greater than 0',
  heroesListLabel: 'Here are your heroes',
};
type HeroProps = {
  cardDetails: Card;
};
export const HeroCard = memo((props: HeroProps) => {
  const { cardDetails } = props;
  console.log('render HeroCard');

  const [isModalOpen, setModal] = useState(false);
  const [isImageLoaded, setImageLoaded] = useState(false);
  const image = `${imageBaseUrl}${cardDetails.imagesrc}`;

  return (
    <>
      <div className="flex flex-col p-4 md:mr-10">
        <button
          onClick={() => setModal(true)}
          className="transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 duration-500"
        >
          <img
            className="w-80 rounded-xl"
            style={{ display: isImageLoaded ? 'block' : 'none' }}
            src={image}
            alt={'Hero Image'}
            onLoad={() => setImageLoaded(true)}
          />
        </button>
      </div>
      <Modal
        title={cardDetails.name}
        cardCode={cardDetails.code}
        isOpen={isModalOpen}
        closeModal={() => setModal(false)}
      >
        <DetailCard image={image} {...props} />
      </Modal>
    </>
  );
});
type DetailCardProps = {
  cardDetails: Card;
  image: string;
};
const DetailCard = (props: DetailCardProps) => {
  console.log('render DetailCard');

  return (
    <div className="w-[90vw] h-[80vh] md:h-[80vh] md:w-[60vw]">
      <div className="flex justify-center w-full h-full bg-brown">
        <div
          className="w-full bg-no-repeat m-5 rounded-lg"
          style={{ backgroundImage: `url(${props.image})` }}
        ></div>
        {/*  <img className="w-80 rounded-xl" src={props.image} alt={'Hero Image'} /> */}
      </div>
    </div>
  );
};

const App = () => {
  console.log('render App');
  return (
    <>
      <div className="h-screen w-screen flex flex-col md:flex-row  justify-center items-center">
        <div className="w-5/6 h-5/6">
          <Header title={mockContents.appTitle} />
          <Deck />
        </div>
      </div>
    </>
  );
};

export default App;
