import React, {useState} from 'react'
import ReadData from './ReadData'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Header() {

    const [startDateInput, setStartDateInput] = useState(new Date("2020/01/01"));
    const [endDateInput, setEndDateInput] = useState(new Date("2020/01/30"));

    const startTimestamp = convertDateToTimestamp(startDateInput)
    const endTimestamp = convertDateToTimestamp(endDateInput)

    function convertDateToTimestamp(inputDate){
        let timeStamp = new Date(inputDate).getTime() / 1000
        return timeStamp
    }

   
    console.log('start', startDateInput)
    //const date = new Date('2020.01.01').getTime() / 1000
    //console.log('start', startTimestamp)
    //console.log('end', endTimestamp)
    return (
        <div>
            <DatePicker dateFormat="yyyy-MM-dd" selected={startDateInput} onChange={date => setStartDateInput(date)}/>
            <DatePicker dateFormat="yyyy-MM-dd" selected={endDateInput} onChange={date => setEndDateInput(date)}/>
            <ReadData startTimestamp={startTimestamp} endTimestamp={endTimestamp} startDateInput={startDateInput} endDateInput={endDateInput}/>
        </div>
    )
}

export default Header
