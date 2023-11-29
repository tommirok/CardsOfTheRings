import { mockContents } from '../App';

type InputProps = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  validInput?: boolean;
};
const Input = (props: InputProps) => {
  return (
    <>
      <form
        className="flex flex-col w-auto md:w-3/12 "
        onSubmit={props.onSubmit}
      >
        <label>{mockContents.inputIdLabel}</label>
        <input ref={props.inputRef} type="number" min="1" />
        <input type="submit" hidden />
        {props.inputRef?.current?.value === '' && (
          <label>{mockContents.formValidation}</label>
        )}{' '}
      </form>
    </>
  );
};
export default Input;
