import React, {useState} from 'react'
import Content from './A'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Header({ startDateInput, setStartDateInput, endDateInput, setEndDateInput }) {

    return (
        <div>
            <DatePicker dateFormat="yyyy-MM-dd" 
                        selected={startDateInput} 
                        onChange={date => setStartDateInput(date)}
                        startDateInput={startDateInput}
                        endDateInput={endDateInput}/>
            <DatePicker dateFormat="yyyy-MM-dd" selected={endDateInput} onChange={date => setEndDateInput(date)}/>
        </div>
    )
}

export default Header
