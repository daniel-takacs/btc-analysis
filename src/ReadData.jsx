import React, { useEffect, useState } from 'react'
import QuestionA from './QuestionA';

function ReadData({ startTimestamp, endTimestamp, startDateInput, endDateInput}) {
    
    const [items, setItems] = useState([]);
  
    const fetchData = ()=> {
        fetch(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=eur&from=${startTimestamp}&to=${endTimestamp}`)
          .then(res => res.json())
          .then(result => setItems(result.prices))
          //console.log(items)
      }
   
    console.log('items',items)

    const dayPriceArr = []
    const dayPrice = ()=> {
      //pushing every 23th hour price of every day to dayPriceArr
      for(let i=0; i<items.length; i=i+23){
        //for(let j=0; j<items[i].length; j++){
          dayPriceArr.push(items[i][1])
        //}
      }
    }
    dayPrice()
    console.log('daypricearr',dayPriceArr)
   
    let bestStart  = 0;
    let curStart   = 0;
    let bestLength = 1;
    let curLength  = 1;

    //check downward trend and push element to tempArr array
    let tempArr = []
        function bearishTrendCalc(arr){
            for(let j=0;j<arr.length;j++){
                if(arr[j] < arr[j-1]){
                    curLength++
                    if(curLength > bestLength){
                        bestStart = curStart
                        bestLength = curLength
                    }
                }else {
                    curStart = j
                    curLength = 1
                }
            }
        }
    bearishTrendCalc(dayPriceArr)

    for(let i=bestStart; i<bestStart+bestLength;i++){
      tempArr.push(dayPriceArr[i])
    }

    let formattedStartDate = convertDateToSuitableFormat(startDateInput)
    let formattedEndDate = convertDateToSuitableFormat(endDateInput)

    function convertDateToSuitableFormat(inputFormat) {
      function pad(s) { return (s < 10) ? '0' + s : s; }
        let d = new Date(inputFormat);
        return [ d.getFullYear(), pad(d.getMonth()+1), pad(d.getDate())].join('/');
    }
    //debugger
    return (
        <>
          <button onClick={fetchData}>Start</button>
          <p>In bitcoin's historical data from CoinGecko, the price decreased {bestLength} days in a row 
          for the inputs from {formattedStartDate} and to {formattedEndDate}.</p>
        </>
      );
    }
      
export default ReadData;
