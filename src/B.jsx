import React from 'react'

function B({ volumes, differenceInDays, isLoading, error }) {

  const volumesArray = []

  const sortDayVolume = (diff, data)=> {
    if(diff >= 90){
      for(let i=0; i<data.length; i++){
        volumesArray.push(data[i])
      }
    }else {
      for(let i=0; i<data.length; i=i+23){
        volumesArray.push(data[i])
      }
    }
    return volumesArray
  }
  sortDayVolume(differenceInDays, volumes)

  //finding highest trading volume

    let max = 0
    let timestamp = 0

    function findHighestTradingVolume(arr){
        for(let i=0; i<arr.length; i++){
            for(let j=0; j<arr[i].length; j++){
                if(arr[i][1] > max){
                    max = arr[i][1]
                    timestamp = arr[i][0]
                }
            }
        }
    }
    findHighestTradingVolume(volumesArray)
   
    function timestampToDateConverter(timestamp){
        let t = new Date(timestamp)
        let date = (t.getFullYear()+"/"+(t.getMonth()+1)+"/"+t.getDate())
        return date
    }
    let { date } = timestampToDateConverter(timestamp)

    return (
        <div>
            <h3>B: Which date within a given date range had the highest trading volume?</h3>
            {error && <p>{error}</p> }
            {isLoading ? <p>{isLoading}</p> 
            : <div>
                <p><strong>{date}</strong> had the hihest trading volume and the volume on that day was <strong>{max}</strong> in euros.</p>
              </div>
            }
        </div>
    )
}

export default B
