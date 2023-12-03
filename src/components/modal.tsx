import { useEffect, useRef } from 'react';
import { sphereThemes } from '../themes/sphereThemes';
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
  console.log(theme);

  return (
    <dialog
      style={{ background: `linear-gradient(to bottom,${sphereThemes[theme]}, black)`, color: `black` }}
      className={`backdrop:opacity-70 backdrop:backdrop-blur-3xl z-50 rounded-xl`}
      ref={ref}
      onCancel={closeModal}
    >
      <div
        style={{ borderColor: sphereThemes[theme] }}
        className="rounded-xl w-full flex flex-row items-center justify-between p-5 bg-gradient-to-r from-gray-dark border-4 border-b-0"
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
