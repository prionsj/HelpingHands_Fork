import './App.css';
import React, { useState, useEffect } from 'react';
import db from './firebase.config';

const App = () => {
  const [users, setUsers] = useState([])

    const fetchUsers=async()=>{
        const response=db.collection('user');
        const data=await response.get();
        data.docs.forEach(item=>{
            setUsers([...users,item.data()])
        })
    }

    useEffect(() => {
        fetchUsers();
    }, [])

    return (
        <div className="App">
            {
                users && users.map(user=>{
                    return(
                        <div>
                            <h4>{user.name}{user.lastname}</h4>
                            <p>{user.street}{user.number}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}



export default App;
