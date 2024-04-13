
import { useState } from 'react';
import noteService from '../services/persons'

    const AddPerson = ({persons,setPersons,showMessage}) => {
    const [newName, setNewName] = useState('')
    const[number,setPhone]=useState('')
 

    const handleNameChange=(e)=>{
      setNewName(e.target.value)
     
    }
    const handleNumberChange=(e)=>{
      setPhone(e.target.value)
    }
  
  const handleAddName = (e) => {
    e.preventDefault();
    const personObject = {
      name: newName,
      number: number,
    };
    
  const existingPerson = persons.find(
    (person) => person.name.toLowerCase() === newName.toLowerCase()
  );

  if (existingPerson) {
    const confirmUpdate = window.confirm(
      `${newName} is already added to the phonebook. Do you want to update the phone number?`
    );

    if (confirmUpdate) {
      noteService
        .updatePerson(existingPerson.id, personObject)
        .then((updatedPerson) => {
          setPersons(
            persons.map((person) =>
              person.id !== existingPerson.id ? person : updatedPerson
            )
          );
          setNewName('');
          setPhone('');
          showMessage(`${updatedPerson.name}\`s number was changed`,'success');
        })
        .catch((error) => {
          showMessage('Failed to update phone number. Please try again later.', 'error');
        });
    }
  } else {
    noteService
      .create(personObject)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNewName('');
        setPhone('');
        showMessage(`${returnedPerson.name} was added`,'success')
      })
      .catch((error) => {
        showMessage('Failed to add new contact. Please try again later.', 'error');
      });
  }
};

  return (
    <div>
      <h2>Add a New Contact</h2>
      <form onSubmit={handleAddName}>
        <div>
          Name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          Number: <input value={number} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  );
};

export default AddPerson;