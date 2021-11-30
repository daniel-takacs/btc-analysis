import React, { useEffect, useState } from 'react'
import QuestionA from './QuestionA';

function ReadData({ startTimestamp, endTimestamp}) {
    
    const [items, setItems] = useState([]);
  
    const fetchData = ()=> {
        fetch(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=eur&from=${startTimestamp}&to=${endTimestamp}`)
          .then(res => res.json())
          .then(result => setItems(result.prices))
          console.log(items)
      }
   
    
    return (
        <>
          <button onClick={fetchData}>Fetch Data</button>
       
        </>
      );
    }
      
export default ReadData;
