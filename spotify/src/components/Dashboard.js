import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Player from './Player';
import Search from './Search';
import Recommendations from './Recommendations';
import { getTrackRecommendations } from '../utils/spotify';

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
  width: 350px;
  margin-right: 20px;
`;

const Dashboard = ({ token }) => {
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async (trackId) => {
      if (!token) {
        console.error('No token provided');
        return;
      }

      try {
        console.log('Fetching recommendations...');
        const recommendationTracks = await getTrackRecommendations(token, trackId);
        console.log('Recommendations:', recommendationTracks);
        setRecommendations(recommendationTracks);
      } catch (error) {
        console.error('Error fetching recommendations:', error.response?.data || error.message);
      }
    };

    if (selectedTrack) {
      fetchRecommendations(selectedTrack.id);
    }
  }, [token, selectedTrack]);

  if (!token) {
    return <div>Unauthorized. Please login first.</div>;
  }

  return (
    <DashboardContainer>
      <Sidebar>
        <Recommendations recommendations={recommendations} onTrackSelect={setSelectedTrack} />
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
