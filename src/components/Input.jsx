import React, { useState } from "react"

const Input = (props) => {

    const [input, setInput] = useState('');

    //update input in textfield
    const onChangeHandler = (e) => {
      e.preventDefault();
     
      let value = (e.target.value);

      if(!value.charAt(value.length-1).match(/[a-z]/i) && value.length > 0) setInput(input);
      else setInput(value.substring(0,5).trim().toLowerCase());

    }

    //On submit handler
    const onSubmitHandler = (e) => {
      e.preventDefault()
      props.setWord(input)
      setInput('');
      props.setWordList([])
    }

    return(
        <div className="input_container">
            <form className="form_container" onSubmit={onSubmitHandler}>
                <input className="textfield" type="text" value={input} onChange={onChangeHandler}/>
                <input className="button" type="submit" value="Search"
                    disabled={props.disableInput ? "disabled" : ""}
                    style={{ 
                        background: props.disableInput? 
                        "rgb(221, 160, 221, .1)": "var(--color-one)", 
                        cursor: props.disableInput ? 'default': 'pointer'
                    }}
                />
            </form>
        </div>
    )
}

export default Input