import React from 'react'

function A({ isLoading, pricesArray, prices, error }) {

    function bearishTrendCalc(arr){
        let bestStart  = 0;
        let curStart   = 0;
        let bestLength = 1;
        let curLength  = 1;

        for(let i=0;i<arr.length;i++){
            if(arr[i] < arr[i-1]){
                curLength++
                if(curLength > bestLength){
                    bestStart = curStart
                    bestLength = curLength
                }
            }else {
                curStart = i
                curLength = 1
            }
        }
        return {bestStart, bestLength}
    }
    const {bestLength} = bearishTrendCalc(pricesArray)
    
    //sorting dates and pushing an array
    let sortedDates = []  
    function sortDates(arr){
        for(let i=0; i<arr.length; i++){
            for(let j=0; j<arr[i].length; j++){
                sortedDates.push(arr[i][0])
            }
        }
    }
    sortDates(prices)

    //get the first and the last date of array in timestamp
    function readFirstAndLastDate(arr){
        let first = arr[0]
        let last = arr[arr.length - 1]
        return {first, last}
    }
    const {first, last} = readFirstAndLastDate(sortedDates)

    //converting timestamp to human date
    function timestampToDateConverter(firstTimestamp, lastTimestamp){
        let t1 = new Date(firstTimestamp)
        let t2 = new Date(lastTimestamp)
        let dateFirst = (t1.getFullYear()+"/"+(t1.getMonth()+1)+"/"+t1.getDate())
        let dateLast = (t2.getFullYear()+"/"+(t2.getMonth()+1)+"/"+t2.getDate())
        return {dateFirst, dateLast}
    }
    const {dateFirst, dateLast} = timestampToDateConverter(first, last)

    return (
        <div>
            <h4>A: How many days in the longes bearish trend within a given date range?</h4>
            {error && <p>{error}</p> }
            {isLoading ? <p>{isLoading}</p> 
            : <p>In bitcoin's historical data from CoinGecko, the price decreased <strong> {bestLength} </strong> days in a row 
            for the inputs from <strong>{dateFirst}</strong> and to <strong>{dateLast}</strong>.</p>}
        </div>
    )
}

export default A
