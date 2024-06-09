import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Player from './Player';
import Search from './Search';
import axios from 'axios';

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  height: calc(100vh - 100px);
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  padding: 20px;
  padding-bottom: 100px;
`;

const SearchContainerWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
`;

const Sidebar = styled.div`
  width: 300px;
  margin-right: 20px;
  background-color: ${({ theme }) => theme.colors.grey};
  padding: 20px;
  border-radius: 10px;
`;

const RecommendationList = styled.ul`
  list-style: none;
  padding: 0;
`;

const RecommendationItem = styled.li`
  margin-bottom: 10px;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Dashboard = ({ token }) => {
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        console.log('Fetching top tracks...');  // 디버깅 로그 추가
        const response = await axios.get('https://api.spotify.com/v1/me/top/tracks', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log('Top tracks:', response.data.items);

        if (response.data.items.length > 0) {
          const seedTracks = response.data.items.map(track => track.id).join(',');
          console.log('Seed tracks:', seedTracks);

          console.log('Fetching recommendations...');
          const recommendationsResponse = await axios.get('https://api.spotify.com/v1/recommendations', {
            headers: {
              Authorization: `Bearer ${token}`
            },
            params: {
              seed_tracks: seedTracks,
              limit: 10
            }
          });

          console.log('Recommendations:', recommendationsResponse.data.tracks);
          setRecommendations(recommendationsResponse.data.tracks);
        }
      } catch (error) {
        console.error('Error fetching recommendations:', error.response?.data || error.message);
      }
    };

    if (token) {
      fetchRecommendations();
    }
  }, [token]);

  if (!token) {
    return <div>Unauthorized. Please login first.</div>;
  }

  return (
    <DashboardContainer>
      <Sidebar>
        <h2>Recommended for you</h2>
        <RecommendationList>
          {recommendations.map(track => (
            <RecommendationItem key={track.id} onClick={() => setSelectedTrack(track)}>
              {track.name} by {track.artists[0].name}
            </RecommendationItem>
          ))}
        </RecommendationList>
      </Sidebar>
      <div style={{ flex: 1 }}>
        <SearchContainerWrapper>
          <Search token={token} setSelectedTrack={setSelectedTrack} />
        </SearchContainerWrapper>
        {selectedTrack && <Player token={token} track={selectedTrack} />}
      </div>
    </DashboardContainer>
  );
};

export default Dashboard;
