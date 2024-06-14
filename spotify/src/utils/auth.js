const authEndpoint = process.env.REACT_APP_SPOTIFY_AUTH_ENDPOINT;
const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const redirectUri = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;
const scopes = [
  'user-top-read',
  'user-read-recently-played',
  'playlist-read-private',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'user-read-playback-position',
  'user-library-read',
  'streaming',
  'user-read-private',
  'user-read-email'
];

export const getTokenFromUrl = () => {
  const hash = window.location.hash.substring(1);
  const params = hash.split('&').reduce((acc, part) => {
    const [key, value] = part.split('=');
    if (key && value) {
      acc[key] = decodeURIComponent(value);
    }
    return acc;
  }, {});
  return { access_token: params.access_token };
};

export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${process.env.REACT_APP_SPOTIFY_RESPONSE_TYPE}&scope=${scopes.join('%20')}&show_dialog=true`;
