const authEndpoint = 'https://accounts.spotify.com/authorize';
const clientId = 'afc9840c971641f3bd65ec60a2312b67';
const redirectUri = process.env.NODE_ENV === 'production' 
  ? 'https://EZHO7518.github.io/spotify/callback' 
  : 'http://localhost:3000/callback';
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
  console.log('Hash:', hash); // 디버깅 로그 추가
  const params = hash.split('&').reduce((acc, part) => {
    const [key, value] = part.split('=');
    acc[key] = decodeURIComponent(value);
    return acc;
  }, {});
  console.log('Params:', params); // 디버깅 로그 추가
  const token = params.access_token;
  console.log('Extracted token:', token); // 디버깅 로그 추가
  return { access_token: token };
};

export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=${scopes.join('%20')}&show_dialog=true`;
