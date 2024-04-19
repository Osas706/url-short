import React, { useState } from 'react';
import "./App.css";
import InputShortener from './component/InputShortener';
import Background from './component/Background';
import Result from './component/Result';

const App = () => {
  const [inputValue, setInputValue] = useState('');

  return (
    <div className='app'>
      <InputShortener setInputValue={setInputValue}/>
      <Background />
      <Result inputValue={inputValue} />
    </div>
  )
}

export default App;
