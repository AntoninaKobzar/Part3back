import React from 'react';

const Filter = ({ searchResult, handleSearchChange }) => {
  return (
    <>
      <p>Filter shown with <input value={searchResult} onChange={handleSearchChange} /></p>
      
    </>
  );
};

export default Filter;