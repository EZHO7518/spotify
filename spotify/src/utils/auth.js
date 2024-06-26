const authEndpoint = process.env.REACT_APP_SPOTIFY_AUTH_ENDPOINT || 'https://accounts.spotify.com/authorize';
const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID || 'afc9840c971641f3bd65ec60a2312b67';
const redirectUri = process.env.REACT_APP_SPOTIFY_REDIRECT_URI || 'https://ezho7518.github.io/spotify/callback';
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

console.log("Auth Endpoint:", authEndpoint);
console.log("Client ID:", clientId);
console.log("Redirect URI:", redirectUri);

export const getTokenFromUrl = () => {
  const hash = window.location.hash.substring(1);
  const params = hash.split('&').reduce((acc, part) => {
    const [key, value] = part.split('=');
    if (key && value) {
      acc[key] = decodeURIComponent(value);
    }
    return acc;
  }, {});
  console.log('Params:', params); // Debugging log
  const token = params.access_token;
  console.log('Extracted token:', token); // Debugging log
  return { access_token: token };
};

export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=${scopes.join('%20')}&show_dialog=true`;
