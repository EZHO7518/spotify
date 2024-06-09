import axios from 'axios';

const getSpotifyToken = () => {
  const token = window.localStorage.getItem('token');
  console.log("Stored token:", token); // 토큰 확인 로그 추가
  return token;
};

const refreshToken = async () => {
  window.localStorage.removeItem('token');
  window.location.href = '/';
};

export const searchTracks = async (query) => {
  const token = getSpotifyToken();
  if (!token) {
    throw new Error('No token available');
  }
  try {
    const response = await axios.get('https://api.spotify.com/v1/search', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: query,
        type: 'track',
      },
    });
    console.log("API response for searchTracks:", response.data); // API 응답 로그 추가
    return response.data.tracks.items;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.log("Token expired, refreshing token...");
      await refreshToken();
    }
    console.error("Error during searchTracks API call:", error);
    throw error;
  }
};

export const getRecommendations = async (seedTracks) => {
  const token = getSpotifyToken();
  if (!token) {
    throw new Error('No token available');
  }
  try {
    const response = await axios.get('https://api.spotify.com/v1/recommendations', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        seed_tracks: seedTracks.join(','),
      },
    });
    console.log("API response for getRecommendations:", response.data); // API 응답 로그 추가
    return response.data.tracks;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.log("Token expired, refreshing token...");
      await refreshToken();
    }
    console.error("Error during getRecommendations API call:", error);
    throw error;
  }
};
