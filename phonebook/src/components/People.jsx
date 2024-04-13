

import noteService from '../services/persons'


const People = ({ persons,setPersons,showMessage }) => {

const handleDelete=(id)=>{
  const confirmDelete = window.confirm("Are you sure you want to delete this user?");
  if (confirmDelete) {
noteService.deletePerson(id)
.then(()=>{
setPersons([...persons].filter(person=>person.id!==id))
showMessage('Person was deleted','success')
})
.catch((error) => {
  showMessage('Person has already been removed from server.', 'error')
})
  }}
 
  return (
    <>
      <h2>Numbers</h2>
      <div>
        <ul>
          {persons.map(person => (
            <li key={person.id}>{person.name} {person.number}  <button onClick={()=>handleDelete(person.id)}>delete</button></li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default People;