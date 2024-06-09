import React from 'react';
import styled from 'styled-components';
import { loginUrl } from './auth';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

const LoginButton = styled.a`
  padding: 20px;
  border-radius: 99px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  font-size: 24px;
  text-decoration: none;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

const Login = () => {
  return (
    <LoginContainer>
      <h1>Login to Spotify</h1>
      <LoginButton href={loginUrl}>Login with Spotify</LoginButton>
    </LoginContainer>
  );
};

export default Login;
