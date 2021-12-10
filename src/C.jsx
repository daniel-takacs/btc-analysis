import React from 'react'

function C({ isLoading, prices, differenceInDays, error }) {

  
  const sortDayPrices = (diff, data)=> {
    const pricesData = []
    if(diff >= 90){
      for(let i=0; i<data.length; i++){
        pricesData.push(data[i])
      }
    }else {
      for(let i=0; i<data.length; i=i+23){
        pricesData.push(data[i])
      }
    }
    return pricesData
  }
  const pricesData = sortDayPrices(differenceInDays, prices)

  //find the min and max price
  
  function findMinAndMaxPriceDate(arr){
    
    let min = Number.POSITIVE_INFINITY
    let max = 0
    let timestampMin = 0
    let timestampMax = 0
    let decrease = false
    let bearishCounter = 0

    for(let i=0; i<arr.length; i++){
        for(let j=0; j<arr[i].length; j++){
            if(arr[i][1] > max){
                max = arr[i][1]
                timestampMax = arr[i][0]
            }else if (arr[i][1] < min){
                min = arr[i][1]
                timestampMin = arr[i][0]   
                if(arr[i][1] < arr[i][1-1]) {
                  bearishCounter++
                }
            } 
        }
        if(bearishCounter === arr.length){
          decrease = true
        }
    }
    return {timestampMin, timestampMax, decrease}
  }
  const {timestampMin, timestampMax, decrease} = findMinAndMaxPriceDate(pricesData)
  
  function timestampToDateConverter(timestamp1, timestamp2){
      let t1 = new Date(timestamp1)
      let t2 = new Date(timestamp2)
      let dateMinPrice = (t1.getFullYear()+"/"+(t1.getMonth()+1)+"/"+t1.getDate())
      let dateMaxPrice = (t2.getFullYear()+"/"+(t2.getMonth()+1)+"/"+t2.getDate())
      return {dateMinPrice, dateMaxPrice }
  }
  const {dateMinPrice, dateMaxPrice} = timestampToDateConverter(timestampMin, timestampMax)

  return (
      <div>
          <h3>C: Which the best day for buying bitcoin, and the best day for selling the bought bitcoin to maximize profits?</h3>
          {error && <p>{error}</p>}
          {isLoading ? <p>{isLoading}</p>
          : decrease ? <p>You should not buy (nor sell) bitcoin on any of the days</p>
          : <p>The best day <strong>{dateMinPrice}</strong> for buying bitcoin, and the best day <strong>{dateMaxPrice}</strong> for selling the bought bitcoin.</p>
          }
      </div>
  )
}

export default C
