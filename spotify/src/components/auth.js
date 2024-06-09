const authEndpoint = 'https://accounts.spotify.com/authorize';
const clientId = 'afc9840c971641f3bd65ec60a2312b67';  // 여기에 실제 Spotify 클라이언트 ID를 넣으세요
const redirectUri = 'http://localhost:3000/';  // 리다이렉트 URI
const scopes = [
  'user-top-read',
  'user-read-recently-played',
  'playlist-read-private',
  'user-read-playback-state',
  'user-modify-playback-state',
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
