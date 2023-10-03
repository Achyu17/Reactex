import React from 'react';
import { useParams } from 'react-router-dom';

function Result() {
  const { sourceCity, destinationCity, distance } = useParams();

  return (
    <div>
      <h2>Result</h2>
      <p>
        Distance between {sourceCity} and {destinationCity}: {distance} km
      </p>
      {/* Additional result content */}
    </div>
  );
}

export default Result;
