import './App.css';
import Search from './components/Search'
import Display from './components/Display'
import { useState } from 'react';

function App() {

  const [wordList, setWordList] = useState([])

  return (
    <div className="App">
      <div className="header">
      <span style={{alignSelf:'center', fontSize: '24px'}}>
      Anagram Finder
      </span>
      </div>
      <div className="search_container">
        <Search wordList={wordList} setWordList={setWordList} />
      </div>
      <div className="display_container">
        <Display wordList={wordList}/>
      </div>
    </div>
  );
}

export default App;
