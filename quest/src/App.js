import logo from './logo.svg';
import './App.css';
import getData from './Services/GetQuestData';
import {useEffect, useState} from 'react'

function App() {


  const [quests,setQuests] = useState({})
  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      setQuests(data);
    };
    fetchData();
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App test.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
