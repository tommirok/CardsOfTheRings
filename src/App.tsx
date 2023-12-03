import Header from './components/header';
import './index.css';
import Deck from './components/deck';

export const mockContents = {
  appTitle: 'Cards of the Rings',
  inputIdLabel: 'Search for a decklist here',
  formValidation: 'Enter number greater than 0',
  heroesListLabel: 'Here are your heroes',
  error: 'Something went wrong, please try again',
};

const App = () => {
  return (
    <>
      <div className="h-full w-full flex flex-col justify-center items-center md:flex-row">
        <div className="w-[85%] h-[95%] md:w-5/6 md:h-5/6">
          <Header title={mockContents.appTitle} />
          <Deck />
        </div>
      </div>
    </>
  );
};

export default App;
