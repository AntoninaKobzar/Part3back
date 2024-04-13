
import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import AddPerson from './components/AddPerson';
import People from './components/People';
import Person from './components/Person';
import noteService from './services/persons';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [searchResult, setSearchResult] = useState('');
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    noteService.getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      }).catch((error) => {
        showMessage('Error fetching data:', 'error');
      })
  }, []);

  const showMessage = (text, type) => {
    setMessage({ text, type }); 
    setTimeout(() => {
      setMessage(null); 
    }, 5000);
  };

  const handleSearchChange = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchResult(searchValue);
    const filteredPersons = persons.filter(person =>
      person.name.toLowerCase().includes(searchValue)
    );
    setFilteredPersons(filteredPersons);
  };
 
  return (
    <div>
      <h1>Phonebook</h1>
      {message && <Notification message={message.text} type={message.type} />}
      <Filter searchResult={searchResult} handleSearchChange={handleSearchChange} />
      <AddPerson persons={persons} setPersons={setPersons} showMessage={showMessage} />
      {searchResult ?
        <Person persons={filteredPersons} setPersons={setPersons} showMessage={showMessage} />
        :
        <People persons={persons} setPersons={setPersons} showMessage={showMessage} />
      }
    </div>
  );
};

export default App;
