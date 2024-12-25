import React, { createContext, useContext, useEffect, useState } from 'react';
import CryptoJS from 'crypto-js';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [userData, setuserData] = useState({})

  const storedUserData = localStorage.getItem('userData');
  useEffect(() => {
    if (storedUserData) {
      setuserData(decryptData(storedUserData))
    }
  }, [storedUserData]);
  const updateUserData = (newUserData) => {
    localStorage.setItem('userData', encryptData(newUserData));
    setuserData(newUserData)
  };


  const logoutremove = () => {
    localStorage.removeItem("userData");
    setuserData({})
  }


  return (
    <AuthContext.Provider value={{
      userData, updateUserData, logoutremove
    }}>
      {children}
    </AuthContext.Provider>
  );
};


const secretKey = 'Shopping';


const encryptData = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
};


const decryptData = (cipherText) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};