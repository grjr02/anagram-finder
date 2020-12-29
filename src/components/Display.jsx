import React, { useState, useEffect } from 'react'

const Display = (props) => {

    const [wordList, setWordList] = useState([]);
    const [show, setShow] = useState(false)

    useEffect(() => {
        let list = props.wordList;
        let show = props.showFirstDefinition

        if(props.showFirstDefinition && list.length > 0 ){

            setTimeout( () => {
                setShow(true);
                if(show) displayDef(0);
                setShow(false);
            }, 2800)
            
        }
        setWordList(list)
        
    
    }, [props.wordList, wordList.display, props.showFirstDefinition])

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