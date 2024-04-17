import React, { useState } from 'react';
import Axios from 'axios';

const App = () => {
  const [data, setData] = useState();

  const getData = async () => {
    const response = await Axios.get("http://localhost:5000//api/url/shorten")
  }
  return (
    <div>
      App
    </div>
  )
}

export default App
