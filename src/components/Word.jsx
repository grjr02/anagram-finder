import React, { useState, useEffect } from "react";
import axios from "axios"
import { wordAnimations } from "../dfs";
import '../Search-style.css';


const { REACT_APP_KEY, REACT_APP_HOST } = process.env;

const Word = (props) => {

    const [arr, setArray] = useState({id:'', arr: []});
    const [currentWord, setCurrentWord] = useState('');

    var { word, setWordList } = props;

    //based on word length map out span elements
    useEffect(() => {

      setArray({id:'',arr: []});
      setCurrentWord('');
      setWordList([]);

      if(!word) return;

      const wordArr = [];

      for(let c in word) wordArr.push(word.charAt(c));
      
      setArray({ id: word, arr: wordArr });

      if(arr.arr.length > 0 && arr.id === word) search();
        
    }, [arr.id, word, setWordList, arr.arr.length])

    const search = async () => {
        props.setDisableInput(true);
        props.setShowFirstDefinition(false);
        const list = [];
        let animations = wordAnimations(props.word, list);
        let animationSeen = new Set();
        let wordSeen = new Set();

        const validWords = []
        let spinner = document.getElementsByClassName("spinner");
        spinner[0].style.display = "block";

        for(let word of list){

          if(!wordSeen.has(word)){

            wordSeen.add(word);
            
            if(word.length === 1){
              validWords.push(null);
              continue;
            }

            const options = {
              method: 'GET',
              url: `https://wordsapiv1.p.rapidapi.com/words/${word}/definitions`,
              headers: {
                'x-rapidapi-key': `${REACT_APP_KEY}`,
                'x-rapidapi-host': `${REACT_APP_HOST}`
              }
            };

            try{

              let res = await axios.request(options);
              if(res.data.definitions.length > 0) validWords.push(res.data);
              else validWords.push(null);

            }catch(e) { validWords.push(null) } 
            
          }else validWords.push(null);

        }

        spinner[0].style.display = "none";

        let j = 0;
        let animationWithWord = animations.map(a => ({an: a, list: list[j], v: validWords[j++]}))   
        
        let i = 0;
        animationWithWord.forEach(a => {

          const spanObject = document.getElementsByClassName("letters-arr");
          const curWordObj = document.getElementsByClassName("current_word_container");

          const index = [a.an]

            setTimeout(() => {

                spanObject[index].style.color =  
                spanObject[index].style.color === "red" ? "black" : "red";

                if(animationSeen.has(index)) animationSeen.delete(index);
                else{

                  curWordObj[0].style.background = a.v ? "#99edc350" : "plum";
                  curWordObj[0].style.color = a.v ? "#ffffff" : "black";

                  setCurrentWord(a.list);

                  animationSeen.add(index);

                }

                if(a.v){
                a.v = {
                    ...a.v,
                    display: false
                }

                let setWordList = props.setWordList;
                setWordList(prevList => [...prevList, a.v]);
                }
                
            }, i * 150 + 150)

          i++;

        })

      setTimeout(() =>  { 
          setCurrentWord("") 
          props.setDisableInput(false);
          props.setShowFirstDefinition(true);
        }, i * 150 + 150);
      
    }

    return(
        <div className="animation_container">

          <div className="character_container"
            style={{display: arr.arr.length > 0 ? "block":"none"}}>
           
            {
              arr.arr.map((c,i) => (
                  <span className="letters-arr" 
                    key={c + i}
                    > {c} </span>
              )) 
            }

          </div>

          <div className="spinner_container">
            <span className="spinner">

            </span>
          </div>

          <div className="current_word_container" style={{display: currentWord ? "block":"none"}}>
            { currentWord } 
          </div>

        </div>
    )

}

export default Word