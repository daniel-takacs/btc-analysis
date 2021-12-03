import React, { useState } from 'react'

function A({ items, startDateInput, endDateInput }) {


    const dayPriceArr = []
    const dayPrice = ()=> {
      //pushing every 23th hour price of every day to dayPriceArr
      for(let i=0; i<items.length; i=i+23){
          dayPriceArr.push(items[i][1])
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

    const formattedStartDate = convertDateToSuitableFormat(startDateInput)
    const formattedEndDate = convertDateToSuitableFormat(endDateInput)

    function convertDateToSuitableFormat(inputFormat) {
      function pad(s) { return (s < 10) ? '0' + s : s; }
        let d = new Date(inputFormat);
        return [ d.getFullYear(), pad(d.getMonth()+1), pad(d.getDate())].join('/');
    }
 
    return (
        <div>  
          <h3>A: How many days in the longes bearish trend within a given date range?</h3>
            <p>In bitcoin's historical data from CoinGecko, the price decreased <strong> {bestLength} </strong> days in a row 
            for the inputs from {formattedStartDate} and to {formattedEndDate}.</p> 
        </div>
      );
    }
      
export default A;
