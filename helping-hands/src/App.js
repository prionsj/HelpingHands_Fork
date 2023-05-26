import './App.css';
import React, { useState, useEffect } from 'react';
import db from './firebase.config';


function MyButton() {
    return (
      <button>Hilfe anbieten</button>
    );
  }

const App = () => {
  const [users, setUsers] = useState([])
  const [helps, setHelps] = useState([])

    const fetchUsers=async()=>{
        const response=db.collection('user');
        const data=await response.get();
        data.docs.forEach(item=>{
            setUsers([...users,item.data()])
        })
    }
    const fetchHelps=async()=>{
        const response=db.collection('helps');
        const data=await response.get();
        data.docs.forEach(item=>{
            setHelps([...helps,item.data()])
        })
    }

    useEffect(() => {
        fetchUsers();
        fetchHelps();
    }, [])


    return (
        <div>

        
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
        <div className="App">
            {
                helps && helps.map(help=>{
                    return(
                        <div>
                        <h4> {help.category}</h4>
                        <MyButton />
                        </div>
                    )
                })
               
            }
        </div>


        </div>

        
    )
}
  



export default App;
