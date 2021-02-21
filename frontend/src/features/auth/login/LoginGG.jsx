import userApi from '@api/userApi';
import { GOOGLE_CLIENT_ID } from '@constants';
import React from 'react';
import GoogleLogin from 'react-google-login';
import styled from 'styled-components';

const TextChildren = styled.span`
  margin-left: 2px;
  color: #000;
  font-size: 16px !important;
`;

const LoginGG = ({ onSetLoading, children }) => {
  const responseGoogle = async (resGG) => {
    try {
      onSetLoading(true);
      const res = await userApi.googleLogin({ idToken: resGG.tokenId });
      localStorage.setItem('token', res.access_token);
      localStorage.setItem('refresh_token', res.refresh_token);
      onSetLoading(false);
      window.location.href = '/';
    } catch (error) {
      onSetLoading(false);
      console.log('GG login error');
    }
  };
  return (
    <GoogleLogin
      clientId={GOOGLE_CLIENT_ID}
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}
      buttonText={<TextChildren>{children}</TextChildren>}
      className="kep-login-google pointer text-center d-flex justify-content-center"
    />
  );
};

export default LoginGG;
