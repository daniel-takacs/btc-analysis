import React, { useState } from 'react'
import './App.css';
import Header from './Header';
import ReadData from './ReadData';
import A from './A'
import B from './B'
import C from './C'

function App() {

  const [items, setItems] = useState([]);
  const [volumes, setVolumes] = useState([])
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [startDateInput, setStartDateInput] = useState(new Date("2020/01/01"));
  const [endDateInput, setEndDateInput] = useState(new Date("2020/01/30"));

  const startTimestamp = convertDateToTimestamp(startDateInput)
  const endTimestamp = convertDateToTimestamp(endDateInput)

  function convertDateToTimestamp(inputDate){
      let timeStamp = new Date(inputDate).getTime() / 1000
      return timeStamp
  }
  console.log('RESULT', items)
  return (
    <div className="App">
      <Header startDateInput={startDateInput} 
              setStartDateInput={setStartDateInput} 
              endDateInput={endDateInput} 
              setEndDateInput={setEndDateInput}/>
      <ReadData 
                items={items}
                setItems={setItems}
                volumes={volumes}
                setVolumes={setVolumes}
                error={error}
                setError={setError}
                isLoaded={isLoaded}
                setIsLoaded={setIsLoaded}
                startTimestamp={startTimestamp}
                endTimestamp={endTimestamp}
                />
      <A items={items} startDateInput={startDateInput} endDateInput={endDateInput}/>
      <B  volumes={volumes}
          setVolumes={setVolumes}/>
      <C />
    </div>
  );
}

export default App;
