import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';

const App = ()=> {
  const [users, setUsers] = useState([]);
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get('/api/users')
      setUsers(response.data);
    }
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchPets = async () => {
      const response = await axios.get('/api/pets')
      setPets(response.data);
    }
    fetchPets();
  }, []);

  return (
    <div>
      <h1>Pet Tracker</h1>
      <main>
        <div>
          <h2>Users ({ users.length })</h2>
          <ul>
            {
              users.map( user => {
                const usersPets = pets.filter(pet => pet.user_id === user.id);
                return (
                  <li key={ user.id }>
                    { user.name }
                    ({ usersPets.length })
                  </li>
                );
              })
            }
          </ul>
        </div>
        <div>
          <h2>Pets ({ pets.length })</h2>
          <ul>
            {
              pets.map( pet => {
                return (
                  <li key={ pet.id }>
                    { pet.name }
                    <ul>
                      {
                        users.map( user => {
                          return (
                            <li key={ user.id } className={ pet.user_id === user.id ? 'owner': '' }>
                              { user.name }
                            </li>
                          );
                        })
                      }
                    </ul>
                  </li>
                );
              })
            }
            </ul>
        </div>
      </main>
    </div>
  );
};

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<App />);
