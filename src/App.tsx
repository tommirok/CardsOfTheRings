import { useState, memo } from 'react';
import Header from './components/header';
import './index.css';
import { imageBaseUrl } from './api';
import Modal from './components/modal';
import Deck from './components/deck';
import { Card } from './types';
import useIsMobile from './hooks/useIsMobileScreen';
import ReactHtmlParser from 'react-html-parser';

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
  const isMobile = useIsMobile();

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
        theme={cardDetails.sphere_code}
      >
        {isMobile ? (
          <DetailCardMobile image={image} {...props} />
        ) : (
          <DetailCardDeskTop image={image} {...props} />
        )}
      </Modal>
    </>
  );
});
type DetailCardProps = {
  cardDetails: Card;
  image: string;
};
type DetailRowProps = {
  label: string;
  value: string | number;
  html?: React.ReactNode;
};
const DetailRow = (props: DetailRowProps) => (
  <div className="flex flex-row items-center justify-center bg-gray-dark rounded-lg p-2 mb-5">
    {!props.html ? (
      <p className="font-bold">
        {`${props.label}${props.label && ': '}${props.value}`}
      </p>
    ) : (
      <p className='font-bold'>{props.html}</p>
    )}
  </div>
);
const DetailCardDeskTop = (props: DetailCardProps) => {
  return (
    <>
      <div className="flex justify-evenly h-[70vh] w-[50vw] p-2">
        <img
          className="rounded-xl h-[80%] "
          src={props.image}
          alt={'Hero Image'}
        />
        <div className="h-[80%] flex flex-col ml-5 w-[30%]">
          <DetailRow label="Type" value={props.cardDetails.type_name} />
          <DetailRow label="Threat" value={props.cardDetails.threat} />
          <DetailRow label="Willpower" value={props.cardDetails.willpower} />
          <DetailRow label="Attack" value={props.cardDetails.attack} />
          <DetailRow label="Defence" value={props.cardDetails.defense} />
          <DetailRow label="Health" value={props.cardDetails.health} />
          <DetailRow label="Sphere" value={props.cardDetails.sphere_name} />
        </div>
        <div className="h-[80%] flex flex-col ml-5 w-full">
          <DetailRow
            label=""
            value=""
            html={ReactHtmlParser(props.cardDetails.text)}
          />
          <DetailRow label="" value={props.cardDetails.traits} />

        </div>
      </div>
    </>
  );
};
const DetailCardMobile = (props: DetailCardProps) => {
  return (
    <>
      <div className="w-[90vw] h-[80vh]">
        <div className="flex justify-center w-full h-full">
          <div
            className="w-full bg-no-repeat m-5 rounded-lg"
            style={{ backgroundImage: `url(${props.image})` }}
          ></div>
          {/*  <img className="w-80 rounded-xl" src={props.image} alt={'Hero Image'} /> */}
        </div>
      </div>
    </>
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
