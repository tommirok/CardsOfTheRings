import { memo, useState } from 'react';
import { Card } from '../types';
import { imageBaseUrl } from '../api';
import useIsMobile from '../hooks/useIsMobileScreen';
import Modal from './modal';
import DetailCardDeskTop from './detailCardDesktop';
import DetailCardMobile from './detailCardMobile';

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
export default HeroCard;
