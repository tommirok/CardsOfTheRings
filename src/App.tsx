import React, { useRef } from 'react';
import Header from './components/header';
import './index.css';
import { getDeckById } from './api';

const mockContents = {
  appTitle: 'Cards of the Rings',
  inputIdLabel: 'Search for a decklist here',
};

const Input = () => {
  const inputIdRef = useRef<HTMLInputElement>(null);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await getDeckById(Number(inputIdRef.current?.value));
    console.log(JSON.stringify(response,null,2));

    if (inputIdRef.current) {
      console.log(inputIdRef.current.value);
      inputIdRef.current.value = '';
    }
  };
  return (
    <>
      <form className="flex flex-col w-auto md:w-3/12 " onSubmit={onSubmit}>
        <label htmlFor="Id Input">{mockContents.inputIdLabel}</label>
        <input ref={inputIdRef} type="number" min="0" />
        <input type="submit" hidden />
      </form>
    </>
  );
};

const Decklist = () => {
  return (
    <>
      <Input />
    </>
  );
};

function App() {
  return (
    <>
      <div className="h-screen w-screen flex justify-center items-center bg-gray-light">
        <div className="w-5/6 h-5/6">
          <Header title={mockContents.appTitle} />
          <p>{'Jauzaa!!'}</p>
          <div>
            <Decklist />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
