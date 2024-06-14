import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTokenFromUrl } from '../utils/auth';

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const { access_token } = getTokenFromUrl();
    console.log('Access token from URL:', access_token); // 디버깅 로그 추가
    let token = window.localStorage.getItem('spotify_token');
    console.log('Token from localStorage:', token); // 디버깅 로그 추가

    if (!token && access_token) {
      token = access_token;
      window.localStorage.setItem('spotify_token', token);
      console.log('Token set in localStorage:', token); // 디버깅 로그 추가
    }

    if (token) {
      fetch('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => response.json())
      .then(data => {
        console.log('User data:', data); // 디버깅 로그 추가
        if (data.product !== 'premium') {
          alert('You need a Spotify Premium account to use this app.');
          window.localStorage.removeItem('spotify_token');
          navigate('/');
        } else {
          navigate('/dashboard');
        }
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        alert('Failed to authenticate. Please try again.');
        window.localStorage.removeItem('spotify_token');
        navigate('/');
      });
    } else {
      navigate('/');
    }
  }, [navigate]);

  return null;
};

export default Callback;
