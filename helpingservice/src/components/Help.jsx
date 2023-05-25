import React, { useState, useEffect } from 'react';
import db from './firebase.config';

const Help = () => {
    const [helps, setHelps] = useState([])

    const fetchHelps=async()=>{
        const response=db.collection('helps');
        const data=await response.get();
        let helpArray = []
        data.docs.forEach((help) => {
            helpArray.push(help.data())
        })
        console.log(helpArray)
        setHelps(helpArray)
    }

    useEffect(() => {
        fetchHelps();
    }, [])

    return (
        <div className="Help">
            {
                helps && helps.map((help, index)=> {
                    console.log(help.title)
                    return (
                        <div key={help.id}>
                            <h4>{help.title} - {help.city}</h4>
                            <p>{help.description}</p>
                        </div>
                    )
                })

            }
        </div>
    )
}

export default Help;
