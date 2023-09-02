import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import SearchBar from './SearchBar';

function App() {
  const [breeds, setBreeds] = useState([]);
  const [filteredBreeds, setFilteredBreeds] = useState([]);
  const [currentBreedIndex, setCurrentBreedIndex] = useState(0);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    fetch('https://api.thedogapi.com/v1/breeds')
      .then((response) => response.json())
      .then((data) => {
        const sortedBreeds = data.sort((a, b) => a.name.localeCompare(b.name));
        setBreeds(sortedBreeds);
        setFilteredBreeds(sortedBreeds);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    if (filteredBreeds.length > 0 && currentBreedIndex >= 0 && currentBreedIndex < filteredBreeds.length) {
      fetch(`https://api.thedogapi.com/v1/images/search?breed_id=${filteredBreeds[currentBreedIndex].id}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.length > 0) {
            setImageUrl(data[0].url);
          }
        })
        .catch((error) => console.error('Error fetching image:', error));
    }
  }, [filteredBreeds, currentBreedIndex]);

  const handleSearch = (searchTerm) => {
    const filtered = breeds.filter((breed) =>
      breed.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBreeds(filtered);
    setCurrentBreedIndex(0);
  };

  const showNextBreed = () => {
    if (currentBreedIndex < filteredBreeds.length - 1) {
      setCurrentBreedIndex(currentBreedIndex + 1);
    }
  };

  const showPreviousBreed = () => {
    if (currentBreedIndex > 0) {
      setCurrentBreedIndex(currentBreedIndex - 1);
    }
  };

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="/">Razas de Perros</a>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="/">Inicio</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">Razas Grandes</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">Razas Medianas</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">Razas Pequeñas</a>
            </li>
          </ul>
        </div>
      </nav>
      <main className="container center-content">
        <SearchBar onSearch={handleSearch} />
        {filteredBreeds.length > 0 && (
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <div className="card">
                <img
                  src={imageUrl}
                  alt={`Imagen de ${filteredBreeds[currentBreedIndex].name}`}
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title">{filteredBreeds[currentBreedIndex].name}</h5>
                  <p><strong>Altura:</strong> {filteredBreeds[currentBreedIndex].height.metric} cm</p>
                  <p><strong>Peso:</strong> {filteredBreeds[currentBreedIndex].weight.metric} kg</p>
                  <p><strong>Grupo:</strong> {filteredBreeds[currentBreedIndex].breed_group}</p>
                  <p><strong>Origen:</strong> {filteredBreeds[currentBreedIndex].origin}</p>
                  <p><strong>Temperamento:</strong> {filteredBreeds[currentBreedIndex].temperament}</p>
                </div>
              </div>
            </div>
          </div>
        )}
        {filteredBreeds.length > 1 && (
          <div className="nav-buttons">
            <button className="btn btn-primary mr-2" onClick={showPreviousBreed}>Anterior</button>
            <button className="btn btn-primary" onClick={showNextBreed}>Siguiente</button>
          </div>
        )}
      </main>
      <footer className="footer mt-auto py-3">
        <div className="container">
          <p>&copy; 2023 Razas de Perros App</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
