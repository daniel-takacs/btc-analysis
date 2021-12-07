import React, {useState} from 'react'
import './App.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import A from './A'
import B from './B';

function App() {

  const [items, setItems] = useState([]);
  const [volumes, setVolumes] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startDateInput, setStartDateInput] = useState(new Date("2020/03/01"));
  const [endDateInput, setEndDateInput] = useState(new Date("2021/08/01"))
  const differenceInDays = diffInDaysCalculator(startDateInput, endDateInput)
  const {startTimestamp, endTimestamp} = convertToTimestamp(startDateInput, endDateInput)

  //calculate number of days between the range
  function diffInDaysCalculator(firstDate, lastDate){
      let diffInTime = lastDate.getTime() - firstDate.getTime()
      let diffInDays = Math.floor(diffInTime / (1000 * 3600 * 24))
      return diffInDays
  }
  //convert the given Date to Timestamp
  function convertToTimestamp(startDate, endDate){
      let startTimestamp = Math.floor((new Date(startDate)).getTime() / 1000)
      let endTimestamp = Math.floor((new Date(endDate)).getTime() / 1000)+(4*60*60) //give 1 hour to UTC - 3 hours to Current Timezone
      return {startTimestamp, endTimestamp}
  }
  
  const handleClick = ()=> {
    fetchDataPrices()
    fetchDataVolumes()
  }

  const API_URL = `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=eur&from=${startTimestamp}&to=${endTimestamp}`
  
  const fetchDataPrices = ()=> {
        setIsLoading(true)
        fetch(API_URL)
          .then(res => res.json())
          .then(data => {
            setIsLoading(false)
            setItems(data.prices)
          })
          .catch(err => {
            setIsLoading(false)
            setError(err.message)
          })
  }

  const fetchDataVolumes = ()=> {
      setIsLoading(true)
      fetch(API_URL)
          .then(res => res.json())
          .then(data => {
            setIsLoading(false) 
            setVolumes(data.total_volumes)
          })
    
          .catch(err => {
            setIsLoading(false)
            setError(err.message)
          })
  }

  //Sort prices to an array
  const pricesArray = []

  const sortDayPrice = (diff, data)=> {
    if(diff >= 90){
      for(let i=0; i<data.length; i++){
          pricesArray.push(data[i][1])
      }
      //console.log('more than 90')
    }else {
      for(let i=0; i<data.length; i=i+23){
        pricesArray.push(data[i][1])
      }
      //console.log('less than 90')
    }
    return pricesArray
  }
  sortDayPrice(differenceInDays, items)
  //console.log('sorted prices',pricesArray)

  


  //debugger
    return (
      <div className="App">
         <DatePicker dateFormat="yyyy-MM-dd" selected={startDateInput} onChange={date => setStartDateInput(date)}startDateInput={startDateInput}
                     endDateInput={endDateInput}/>
         <DatePicker dateFormat="yyyy-MM-dd" selected={endDateInput} onChange={date => setEndDateInput(date)}/>
        <button onClick={handleClick}>Get the data</button>
        <A isLoading={isLoading} items={items} pricesArray={pricesArray}/>
        <B volumes={volumes} isLoading={isLoading} differenceInDays={differenceInDays}/>
      </div>
    );
  }

export default App;
