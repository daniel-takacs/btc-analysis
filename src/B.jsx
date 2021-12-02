import React from 'react'

function B({ volumes }) {

    console.log('VOLUMES', volumes)

    let max = 0

    for(let i=0; i<volumes.length; i++){
        for(let j=0; j<volumes[i].length; j++){
            console.log(volumes[i][1])
        }
    }
    return (
        <div>
            <h3>B</h3>
            <p>-on date- within a given date range had the hihest trading volume </p>
            <p>the volume on that day -volume-</p>
        </div>
    )
}

export default B
