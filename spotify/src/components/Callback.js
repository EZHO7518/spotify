import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTokenFromUrl } from '../utils/auth';

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const { access_token } = getTokenFromUrl();
    let token = window.localStorage.getItem('spotify_token');

    if (!token && access_token) {
      token = access_token;
      window.localStorage.setItem('spotify_token', token);
    }

    if (token) {
      fetch('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => response.json())
      .then(data => {
        if (data.product !== 'premium') {
          alert('You need a Spotify Premium account to use this app.');
          window.localStorage.removeItem('spotify_token');
          navigate('/');
        } else {
          navigate('/dashboard');
        }
      })
      .catch(error => {
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
