import { mockContents } from '../App';

type InputProps = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  inputRef: React.RefObject<HTMLInputElement>;
};
const Input = (props: InputProps) => {
    console.log('render Input');
    
  return (
    <>
      <form
        className="flex flex-col w-auto md:w-3/12 "
        onSubmit={props.onSubmit}
      >
        <label>{mockContents.inputIdLabel}</label>
        <input className='bg-gray-light ' ref={props.inputRef} type="number" min="1" />
        <input type="submit" hidden />
     
      </form>
    </>
  );
};
export default Input;
