import React from 'react';
import styled from 'styled-components';

const RecommendationsContainer = styled.div`
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.grey};
  border-radius: 10px;
  max-height: 700px;
  overflow-y: auto;
  width: 700px;
`;

const RecommendationItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
  }
`;

const TrackInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;

const TrackName = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const ArtistName = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.primary};
`;

const AlbumCover = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 5px;
`;

const Recommendations = ({ recommendations, onTrackSelect }) => {
  return (
    <RecommendationsContainer>
      <h2>Recommendations</h2>
      {recommendations.map((track) => (
        <RecommendationItem key={track.id} onClick={() => onTrackSelect(track)}>
          <AlbumCover src={track.album.images[0].url} alt="Album cover" />
          <TrackInfo>
            <TrackName>{track.name}</TrackName>
            <ArtistName>{track.artists[0].name}</ArtistName>
          </TrackInfo>
        </RecommendationItem>
      ))}
    </RecommendationsContainer>
  );
};

export default Recommendations;
