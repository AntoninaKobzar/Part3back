import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl);
  const nonExisting = {
    id: 10000,
    name: 'Information of this user has been removed from server',
    important: true,
  };

  return request.then((response) => response.data.concat(nonExisting));
};


  


const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const updatePerson = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}
const deletePerson = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`);
    return request.then((response) => response.data);
  };

export default { 
  getAll,create,deletePerson,updatePerson
}