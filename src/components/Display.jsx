import React, { useState, useEffect } from 'react'

const Display = (props) => {

    const [wordList, setWordList] = useState([]);

    useEffect(() => {
        setWordList(props.wordList)
    }, [props.wordList, wordList.display])

    const displayDef = (index) => {

        let temp = wordList;

        for(let i = 0; i < temp.length; i++){
            if(i === index) temp[index].display = !temp[index].display;
            else temp[i].display = false;
        }
    
        setWordList([...temp])

    }

    return(
        <div className="list_container">
            <div className="word_container_item">
                {
                    wordList.map((x,j)=>(
                        <div key ={x.word} onClick={()=>displayDef(j)} className="word_item">
                            {x.word}
                            <div style={{flex: .5, padding: x.display ? "10px" : "0"}}>
                                {
                                    x.definitions.map((y,i) => (
                                        <div
                                        key={i}
                                        className="definitions"
                                        style={{display: x.display ? "block" : "none"}}>
                                            {i+1}. {y.definition}
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Display