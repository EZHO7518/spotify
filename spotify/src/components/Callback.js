import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem('token');

    if (!token && hash) {
      token = hash.substring(1).split('&').find(elem => elem.startsWith('access_token')).split('=')[1];
      window.localStorage.setItem('token', token);
    }

    fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log('User data:', data);
      if (data.product !== 'premium') {
        alert('You need a Spotify Premium account to use this app.');
        window.localStorage.removeItem('token');
        navigate('/');
      } else {
        navigate('/dashboard');
      }
    })
    .catch(error => {
      console.error('Error fetching user data:', error);
      alert('Failed to authenticate. Please try again.');
      window.localStorage.removeItem('token');
      navigate('/');
    });
  }, [navigate]);

  return null;
};

export default Callback;
