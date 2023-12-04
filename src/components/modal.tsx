import { useContext, useEffect, useRef } from 'react';
import { sphereThemes } from '../themes/sphereThemes';
import useIsMobile from '../hooks/useIsMobileScreen';
import { CardDetailStateContext } from './heroCard';

type ModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  children: React.ReactNode;
};
const Modal = ({ isOpen, closeModal, children }: ModalProps) => {
  const ref = useRef<HTMLDialogElement>(null);
  // Card details as context
  const cardDetails = useContext(CardDetailStateContext);
  const { code, name, sphere_code } = cardDetails;
  useEffect(() => {
    if (isOpen) {
      ref.current?.showModal();
      /* Push modal and card code to url */
      window.history.pushState(
        null,
        '',
        `${window.location}?card=${code}#modal`
      );
    } else {
      ref.current?.close();

      /* Remove modal and card code from url */
      window.location.href.includes('#modal') && window.history.back();
    }
  }, [isOpen, closeModal]);
  const isMobile = useIsMobile();
  return (
    <dialog
      style={{
        width: isMobile ? '100vw' : '',
        height: isMobile ? '100vh' : '',
        background: `linear-gradient(to bottom,${sphereThemes[sphere_code]}, black)`,
        color: `black`,
      }}
      className={`md:m-auto backdrop:opacity-70 backdrop:backdrop-blur-3xl z-50 rounded-xl overflow-clip`}
      ref={ref}
      onCancel={closeModal}
    >
      <div
        style={{ borderColor: isMobile ? '' : sphereThemes[sphere_code] }}
        className="rounded-xl rounded-b-none w-full flex flex-row items-center justify-between p-5 bg-gradient-to-r from-gray-dark "
      >
        <h1 style={{ color: sphereThemes[sphere_code] }} className="font-bold">
          {name}
        </h1>
        <button className="" onClick={closeModal}>
          <img
            className="md:w-7 w-5"
            src="/CardsOfTheRings/close.png"
            alt="Close x"
          />
        </button>
      </div>

      {children}
    </dialog>
  );
};

export default Modal;
