import React from 'react';

const Recommendations = ({ recommendations, onTrackSelect }) => {
  return (
    <div className="Recommendations">
      <h2>Recommendations</h2>
      {recommendations.map((track) => (
        <div key={track.id} onClick={() => onTrackSelect(track)}>
          {track.name} by {track.artists[0].name}
        </div>
      ))}
    </div>
  );
};

export default Recommendations;
