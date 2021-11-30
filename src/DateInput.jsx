import React, {useState} from 'react'
import ReadData from './ReadData'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function DateInput() {

    const [startDateInput, setStartDateInput] = useState(new Date("2020/01/10"));
    const [endDateInput, setEndDateInput] = useState(new Date("2020/01/21"));

    const startTimestamp = new Date(startDateInput).getTime() / 1000
    const endTimestamp = new Date(endDateInput).getTime() / 1000
    //const date = new Date('2020.01.01').getTime() / 1000
    console.log('start', startTimestamp)
    console.log('end', endTimestamp)
    return (
        <div>
            <DatePicker
                selected={startDateInput}
                onChange={date => setStartDateInput(date)}
                
            />
            <DatePicker
                selected={endDateInput}
                onChange={date => setEndDateInput(date)}
              
            />
           
           <ReadData startTimestamp={startTimestamp} endTimestamp={endTimestamp}/>
        </div>
    )
}

export default DateInput
