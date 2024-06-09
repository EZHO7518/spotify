import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 600px;
`;

const SearchInput = styled.input`
  flex-grow: 1;
  padding: 10px;
  border-radius: 20px 0 0 20px;
  border: none;
  margin-bottom: 0;
  font-size: 16px;
`;

const SearchButton = styled.button`
  padding: 10px 20px;
  border-radius: 0 20px 20px 0;
  border: none;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  font-size: 16px;
  cursor: pointer;
  margin-left: -1px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;

const TrackList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 20px 0 0 0;
  width: 100%;
  max-width: 600px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TrackItem = styled.li`
  width: 100%;
  max-width: 600px;
  padding: 10px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.grey};
  }
`;

const Search = ({ token, setSelectedTrack }) => {
  const [query, setQuery] = useState('');
  const [tracks, setTracks] = useState([]);

  const searchTracks = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`https://api.spotify.com/v1/search`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          q: query,
          type: 'track',
        },
      });

      setTracks(response.data.tracks.items);
    } catch (error) {
      console.error('Error during searchTracks API call', error);
    }
  };

  return (
    <div>
      <form onSubmit={searchTracks} style={{ width: '100%' }}>
        <SearchContainer>
          <SearchInput
            type="text"
            value={query || ''}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a song..."
          />
          <SearchButton type="submit">Search</SearchButton>
        </SearchContainer>
      </form>
      <TrackList>
        {tracks.map((track) => (
          <TrackItem key={track.id} onClick={() => setSelectedTrack(track)}>
            {track.name} by {track.artists[0].name}
          </TrackItem>
        ))}
      </TrackList>
    </div>
  );
};

export default Search;
