import { useEffect, useRef } from 'react';
import { sphereThemes } from '../themes/sphereThemes';
import useIsMobile from '../hooks/useIsMobileScreen';
type ModalProps = {
  title: string;
  isOpen: boolean;
  closeModal: () => void;
  children: React.ReactNode;
  cardCode: string;
  theme: string;
};
const Modal = ({
  isOpen,
  closeModal,
  children,
  cardCode,
  title,
  theme,
}: ModalProps) => {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      ref.current?.showModal();
      /* Push modal and card code to url */
      window.history.pushState(
        null,
        '',
        `${window.location}?card=${cardCode}#modal`
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
        background: `linear-gradient(to bottom,${sphereThemes[theme]}, black)`,
        color: `black`,
      }}
      className={`md:m-auto backdrop:opacity-70 backdrop:backdrop-blur-3xl z-50 rounded-xl overflow-clip`}
      ref={ref}
      onCancel={closeModal}
    >
      <div
        style={{ borderColor: isMobile ? '' : sphereThemes[theme] }}
        className="rounded-xl rounded-b-none w-full flex flex-row items-center justify-between p-5 bg-gradient-to-r from-gray-dark "
      >
        <h1 style={{ color: sphereThemes[theme] }} className="font-bold">
          {title}
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
