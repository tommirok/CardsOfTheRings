import Header from './components/header';
import './index.css';
import Deck from './components/deck';

export const mockContents = {
  appTitle: 'Cards of the Rings',
  inputIdLabel: 'Search for a decklist here',
  formValidation: 'Enter number greater than 0',
  heroesListLabel: 'Here are your heroes',
};

const App = () => {
  console.log('render App');
  return (
    <>
      <div className="h-full w-full flex flex-col md:flex-row  justify-center items-center ">
        <div className="w-5/6 h-5/6">
          <Header title={mockContents.appTitle} />
          <Deck />
        </div>
      </div>
    </>
  );
};

export default App;
