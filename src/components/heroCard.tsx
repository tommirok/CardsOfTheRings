import { createContext, useState } from 'react';
import { Card } from '../types';
import { imageBaseUrl } from '../api';
import useIsMobile from '../hooks/useIsMobileScreen';
import Modal from './modal';
import DetailCardDeskTop from './detailCardDesktop';
import DetailCardMobile from './detailCardMobile';

type HeroProps = {
  cardDetails: Card;
};
// Lets use context in modal just to showcase it, but it's not really needed and not used in stateless detailcomponents
export const CardDetailStateContext = createContext<Card>({} as Card);

export const HeroCard = (props: HeroProps) => {
  const { cardDetails } = props;
  const [isModalOpen, setModal] = useState(false);
  // To prevent stuttering when loading deck hero images
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
            className="w-[100%] md:w-80 rounded-xl"
            style={{ display: isImageLoaded ? 'block' : 'none' }}
            src={image}
            alt={'Hero Image'}
            onLoad={() => setImageLoaded(true)}
          />
        </button>
      </div>
      <CardDetailStateContext.Provider value={cardDetails}>
        <Modal isOpen={isModalOpen} closeModal={() => setModal(false)}>
          {isMobile ? (
            <DetailCardMobile image={image} {...props} />
          ) : (
            <DetailCardDeskTop image={image} {...props} />
          )}
        </Modal>
      </CardDetailStateContext.Provider>
    </>
  );
};
export default HeroCard;
