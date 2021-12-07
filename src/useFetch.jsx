import React, { useEffect, useState } from 'react'


const useFetch = (url)=> {

    const [data, setData] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetch(url)
            .then(res => {
                if(!res.ok) {
                    throw Error('can not fetch the data')
                }
                return res.json()
            })
            .then(data => {
                setData(data.prices)
                setError(null)
            })
            .catch(err => {
                setError(err.message)
            })
    },[url])

    return {data, error}
}

export default useFetch