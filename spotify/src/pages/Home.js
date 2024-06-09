import React from 'react';

const Home = () => {
  return (
    <div className="Home">
      <h1>Welcome to Spotify App</h1>
      <a href={`https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_SPOTIFY_REDIRECT_URI}&response_type=${process.env.REACT_APP_SPOTIFY_RESPONSE_TYPE}`}>Login with Spotify</a>
    </div>
  );
};

export default Home;
