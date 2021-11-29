import React, { useEffect, useState } from 'react'

const api = `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=eur&from=1577836800&to=1609376400`

function ReadData() {
   
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
  
    useEffect(() => {
      fetch(api)
        .then(res => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setItems(result);
            console.log(result)
          },
      
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
    }, [])
  //console.log(items)
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <>
         {items.prices[0][0]}
        </>
      );
    }
      }
export default ReadData;
