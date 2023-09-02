import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  // Define tu lista de razas aquí
  const breeds = [];

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    const filteredSuggestions = inputLength === 0 ? [] : breeds.filter(
      (suggestion) => suggestion.toLowerCase().slice(0, inputLength) === inputValue
    );

    setSuggestions(filteredSuggestions);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getSuggestionValue = (suggestion) => suggestion;

  const renderSuggestion = (suggestion) => (
    <div>
      {suggestion}
    </div>
  );

  const handleSearchClick = () => {
    onSearch(searchTerm);
  };

  const inputProps = {
    placeholder: 'Buscar por raza de perro',
    value: searchTerm,
    onChange: handleInputChange,
  };

  return (
    <div className="search-bar">
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
      <button onClick={handleSearchClick}>Buscar Raza</button>
    </div>
  );
}

export default SearchBar;
