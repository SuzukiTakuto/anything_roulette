import React from 'react';
import styled from 'styled-components';
import firebase from 'firebase/app';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

export const Logout = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/signin');
    } catch (error) {
      console.log(error);
    }
  };
  return <LogoutButton onClick={handleLogout}>ログアウト</LogoutButton>;
};

export const LogoutButton = styled.button`
  position: absolute;
  top: 10%;
  right: 10%;
  max-width: 157px;
`;
