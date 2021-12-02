import React from 'react'

function ReadData({ setIsLoaded, setItems, startTimestamp, endTimestamp, setVolumes }) {

    const handleClick = ()=> {
        fetchDataPrices()
        fetchDataVolumes()
        setIsLoaded(true)
        //console.log(items)
      }
    
      const fetchDataPrices = ()=> {
        fetch(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=eur&from=${startTimestamp}&to=${endTimestamp}`)
        .then(res => res.json())
        .then(result => setItems(result.prices))
        
        }
        const fetchDataVolumes = ()=> {
            fetch(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=eur&from=${startTimestamp}&to=${endTimestamp}`)
            .then(res => res.json())
            .then(result => setVolumes(result.total_volumes))
            
            }

    return (
        <div>
            <button onClick={handleClick}>Get the data</button>
        </div>
    )
}

export default ReadData
