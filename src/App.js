import React, { useState } from 'react'
import './App.css'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import A from './A'
import B from './B'
import C from './C'

function App() {

  const [prices, setprices] = useState([])
  const [volumes, setVolumes] = useState([])
  const [isLoading, setIsLoading] = useState([])
  const [error, setError] = useState(null)
  const [startDateInput, setStartDateInput] = useState(new Date("2020/03/01"))
  const [endDateInput, setEndDateInput] = useState(new Date("2021/08/01"))
  const differenceInDays = diffInDaysCalculator(startDateInput, endDateInput)
  const {startTimestamp, endTimestamp} = convertToTimestamp(startDateInput, endDateInput)
  const API_URL = `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=eur&from=${startTimestamp}&to=${endTimestamp}`

  //check how many days in given date range
  function diffInDaysCalculator(firstDate, lastDate){
      let diffInTime = lastDate.getTime() - firstDate.getTime()
      let diffInDays = Math.floor(diffInTime / (1000 * 3600 * 24))
      return diffInDays
  }
  //convert the given dates to timestamp
  function convertToTimestamp(startDate, endDate){
      let startTimestamp = Math.floor((new Date(startDate)).getTime() / 1000)
      let endTimestamp = Math.floor((new Date(endDate)).getTime() / 1000)+(3*60*60) //giving 3 hour to get UTC / 3 hours to Current Timezone
      return {startTimestamp, endTimestamp}
  }
  
  const handleClick = ()=> {
    fetchData()
  }

  const fetchData = ()=> {
        setIsLoading('Loading...')
        setError(null)
        fetch(API_URL)
          .then(res => res.json())
          .then(data => {
            setIsLoading(false)
            setprices(data.prices)
            setVolumes(data.total_volumes)
          })
          .catch(err => {
            setIsLoading(false)
            setError(err.message)
          })
  }

  //sorting prices to an array
  const pricesArray = []

  const sortDayPrice = (diff, data)=> {
    if(diff >= 90){
      for(let i=0; i<data.length; i++){
          pricesArray.push(data[i][1])
      }
    }else {
      for(let i=0; i<data.length; i=i+23){
        pricesArray.push(data[i][1])
      }
    }
    return pricesArray
  }
  sortDayPrice(differenceInDays, prices)

    return (
      <div className="App">
        <div className='date_input_container'>
          <div>
            <DatePicker dateFormat="yyyy-MM-dd" selected={startDateInput} onChange={date => setStartDateInput(date)}
                        startDateInput={startDateInput} endDateInput={endDateInput}/>
          </div>
          <div>
            <DatePicker dateFormat="yyyy-MM-dd" selected={endDateInput} onChange={date => setEndDateInput(date)}/>
          </div>
          <div>
            <button onClick={handleClick}>Get data</button>
          </div>
        </div>
        <div className='answer_container'>
          <A prices={prices} isLoading={isLoading} pricesArray={pricesArray} error={error}/>
          <B volumes={volumes} isLoading={isLoading} differenceInDays={differenceInDays}error={error}/>
          <C prices={prices} isLoading={isLoading} pricesArray={pricesArray} differenceInDays={differenceInDays}error={error}/>
        </div>
      </div>
    );
  }

export default App;
