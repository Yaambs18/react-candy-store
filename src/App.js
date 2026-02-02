import logo from './logo.svg';
import './App.css';
import Header from './layouts/Header';
import Candies from './components/Candies';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <h1>Welcome to Candy Store</h1>
        <Candies />
      </main>
    </div>
  );
}

export default App;
