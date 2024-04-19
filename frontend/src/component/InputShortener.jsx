import React, { useState } from 'react';

const InputShortener = ({setInputValue}) => {
    const [value, setValue] = useState("");

    const handleClick = () => {
      setInputValue(value);
      setValue('')
    };

  return (
    <div className='input-container'>
      <h1>URL <span>Shortener</span></h1>

      <div>
        <input 
          type="text" 
          placeholder='Your URL ...' 
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <button onClick={handleClick}>Shorten</button>
      </div>
    </div>
  )
}

export default InputShortener
