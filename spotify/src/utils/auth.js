const authEndpoint = 'https://accounts.spotify.com/authorize';
const clientId = 'afc9840c971641f3bd65ec60a2312b67';
const redirectUri = process.env.NODE_ENV === 'production' 
  ? 'http://EZHO7518.github.io/spotify/spotify/callback' 
  : 'http://localhost:3000/callback';
const scopes = [
  'user-top-read',
  'user-read-recently-played',
  'playlist-read-private',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-library-read', // 필요할 수 있는 추가 스코프
];

export const getTokenFromUrl = () => {
  return window.location.hash
    .substring(1)
    .split('&')
    .reduce((initial, item) => {
      let parts = item.split('=');
      initial[parts[0]] = decodeURIComponent(parts[1]);
      return initial;
    }, {});
};

export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=token&show_dialog=true`;
