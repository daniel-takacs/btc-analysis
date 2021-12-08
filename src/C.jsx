import React from 'react'

function C({ isLoading, prices, differenceInDays, error }) {

    const pricesData = []

    const sortDayPrices = (diff, data)=> {
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
    sortDayPrices(differenceInDays, prices)

//find the min and max price
    let max = 0
    let min = 100000
    let timestampMin = 0
    let timestampMax = 0

    function findMinAndMaxPriceDate(arr){
        for(let i=0; i<arr.length; i++){
            for(let j=0; j<arr[i].length; j++){
                if(arr[i][1] > max){
                    max = arr[i][1]
                    timestampMax = arr[i][0]
                }else if (arr[i][1] < min){
                    min = arr[i][1]
                    timestampMin = arr[i][0]
                }
            }
        }
    }
    findMinAndMaxPriceDate(pricesData)
   
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
            { error && <p>{error}</p> }
            {isLoading ? <p>{isLoading}</p> 
            : <p>the best day <strong>{dateMinPrice}</strong> for buying bitcoin, and the best day <strong>{dateMaxPrice}</strong> for selling the bought bitcoin</p>
            }
        </div>
    )
}

export default C
