import React from 'react';
import styled from 'styled-components';

const CLIENT_ID = 'afc9840c971641f3bd65ec60a2312b67';
const REDIRECT_URI = 'http://localhost:3000/callback';
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const RESPONSE_TYPE = 'token';
const SCOPES = [
  'user-top-read',
  'user-read-recently-played',
  'user-modify-playback-state',
  'user-read-playback-state',
  'user-read-currently-playing',
  'user-read-playback-position',
  'user-library-read',
  'streaming',
  'user-read-private',
  'user-read-email'
];

const authUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPES.join('%20')}`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`;

const LoginButton = styled.a`
  display: inline-block;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 15px 30px;
  border-radius: 50px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;

const Login = () => {
  return (
    <LoginContainer>
      <h1>Spotify Login</h1>
      <LoginButton href={authUrl}>Login with Spotify</LoginButton>
    </LoginContainer>
  );
};

export default Login;
