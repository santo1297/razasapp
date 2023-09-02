import React from "react";

function DogBreeds({ breed }) {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{breed.name}</h5>
        <p className="card-text">
          <strong>Peso:</strong> {breed.weight}
        </p>
        <p className="card-text">
          <strong>Altura:</strong> {breed.height}
        </p>
        <p className="card-text">
          <strong>Pelaje:</strong> {breed.coat}
        </p>
        <p className="card-text">
          <strong>Temperamento:</strong> {breed.temperament}
        </p>
      </div>
    </div>
  );
}

export default DogBreeds;
