import React from 'react'

function B({ volumes }) {

    console.log('VOLUMES', volumes)

    let currentMax = 0
    let max = 0
    let date = 0

    for(let i=0; i<volumes.length; i++){
        for(let j=0; j<volumes[i].length; j++){
            if(volumes[i][1] > max){
                max = volumes[i][1]
                date = volumes[i][0]
            }
        }
    }
    const formattedDate = convertDateToSuitableFormat(date)

    function convertDateToSuitableFormat(inputFormat) {
      function pad(s) { return (s < 10) ? '0' + s : s; }
        let d = new Date(inputFormat);
        return [ d.getFullYear(), pad(d.getMonth()+1), pad(d.getDate())].join('/');
    }
    console.log('MAX', max)
    return (
        <div>
            <h3>B</h3>
            <p>{formattedDate} within a given date range had the hihest trading volume </p>
            <p>the volume on that day <strong>{max}</strong></p>
        </div>
    )
}

export default B
