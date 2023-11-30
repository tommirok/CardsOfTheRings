import { useEffect, useRef } from 'react';

type ModalProps = {
  title: string;
  isOpen: boolean;
  closeModal: () => void;
  children: React.ReactNode;
  cardCode: string;
};
const Modal = ({
  isOpen,
  closeModal,
  children,
  cardCode,
  title,
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

  return (
    <dialog
      className="backdrop:opacity-70 backdrop:backdrop-blur-3xl rounded-lg"
      ref={ref}
      onCancel={closeModal}
    >
      <div className="w-full flex flex-row items-center justify-between p-5">
        <h1>{title}</h1>
        <button className="" onClick={closeModal}>
          <img className="md:w-7 w-5" src="/close.png" alt="Close x" />
        </button>
      </div>

      {children}
    </dialog>
  );
};

export default Modal;
