import { mockContents } from '../App';

type InputProps = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  inputRef: React.RefObject<HTMLInputElement>;
};
const Input = (props: InputProps) => {
  return (
    <>
      <form
        className=" w-auto md:w-3/12 flex flex-col"
        onSubmit={props.onSubmit}
      >
        <label className='py-2'>{mockContents.inputIdLabel}</label>
        <input
          className="p-1 rounded-md bg-gray-light text-gray-dark"
          ref={props.inputRef}
          type="number"
          min="1"
        />
        <button className="py-2 hover:cursor-pointer text-left">
          <input
            style={{
              WebkitTextFillColor: 'transparent',
              WebkitBackgroundClip: 'text',
            }}
            className="hover:cursor-pointer bg-gradient-to-r from-purple to-pink bg-clip-text"
            type="submit"
            value={'Search'}
          ></input>
        </button>
      </form>
    </>
  );
};
export default Input;
