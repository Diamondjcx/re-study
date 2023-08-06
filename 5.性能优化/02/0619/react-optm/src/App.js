import React, { useState, useCallback } from 'react';

const PageA = React.memo(function(props) {
  console.log('render');
  const handleClick = () => {
    props.onClick();
  }
  return <div>
    <button onClick={handleClick}> + </button>
  </div>
})


export default function App() {
  const [counter, setCounter] = useState(0);
  const counterAdd = () => setCounter((counter) => counter +1);
  const handleCounter = useCallback(counterAdd, [])
  
  return (
    <div className="App">
          <button onClick={() => setCounter((counter) => counter -1)}> - </button>
          <div>{counter}</div>
          <PageA onClick={handleCounter}></PageA>
    </div>
  );
}


