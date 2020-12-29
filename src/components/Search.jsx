import React, { useState } from 'react'
import Input from "./Input"
import Word from "./Word"

import '../Search-style.css';

const Search = (props) => {

    const [word, setWord] = useState('');
    const [disableInput, setDisableInput] = useState(false)

    return(
      <div className="input_and_display">
        <div className="search_input">
          <h4 className="label">Enter text</h4>
          <Input setWord={setWord} setWordList={props.setWordList} 
            disableInput={disableInput}
          />
        </div>
        <div className="word_display">
          <Word wordList={props.wordList} 
            setWordList={props.setWordList} word={word}
            setDisableInput={setDisableInput}
            setShowFirstDefinition={props.setShowFirstDefinition}
          />
        </div>
      </div>
    )
}

export default Search