//import logo from './logo.svg';
import React, {useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {

  const[users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    /**
     * fetch(): the global method that starts the process of fetching 
     * a resource from the network returning a promise that is fulfilled once the response is available
     * **/
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((result) => result.json())
    .then((data) => {
      setUsers(data)
    })
    .catch(error => console.log('Error fetching user data:', error));
  }, []);


    const[lists, setLists] = useState([]);

    useEffect(() => {
      axios.get('https://jsonplaceholder.typicode.com/todos/')
      .then(response => {
        setLists(response.data);
      })
    })

    const filteredUsers = users.filter(user =>
      user.name.toUpperCase().includes(searchTerm.toUpperCase())
    );
  

  return (
    
    <div style={{ textAlign: 'center'}}>

      <h1>User Details Table</h1>

      <input
        type='text'
        placeholder='Search by username'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <ul>
        {filteredUsers.map(user => (
          <li style={{listStyle: 'none'}} key={user.id}>{user.name}</li>
        ))}
      </ul>
    
      <table style={{ borderCollapse: 'collapse', margin: 'auto', width: '60%', border: '1px solid #ddd' }}>
        
        <thead>
          <tr style={{ border: '1px solid #ddd', backgroundColor: 'black', color: 'white' }}>
            <th>User ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
          </tr>
        </thead>

        <tbody>
          {
            users.length && users.map((item) => (
              <tr style = {{ border: '1px solid #ddd', backgroundColor: 'gray', color: 'white'}} key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
              </tr>
            ))
          }
        
        </tbody>

      </table>

      <h1>Todo list, in Latin, using Axios</h1>
    
      <table style={{ borderCollapse: 'collapse', margin: 'auto', width: '60%', border: '1px solid #ddd' }}>
        
        <thead>
          <tr style={{ border: '1px solid #ddd', backgroundColor: 'black', color: 'white' }}>
            <th>ID</th>
            <th>Todo Item</th>
            <th>Todo Item Status</th>
          </tr>
        </thead>

        <tbody>
          {lists.length && lists.map((item) => (
              <tr style = {{ border: '1px solid #ddd', backgroundColor: 'gray', color: 'white'}} key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>{item.completed === true ? 'Completed' : 'Pending'}</td>
              </tr>
            ))
          }
        
        </tbody>

      </table>

    </div>
    /**<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
    **/
  );
}

export default App;
