import React, { createContext, useState, useContext } from 'react';

const ResponseIdContext = createContext();

export const ResponseIdProvider = ({ children }) => {
  const [responseId, setResponseId] = useState(null);
  const [userType, setUserType] = useState(null);
  const [propicUrl, setImageUrl] = useState(null);

  const setGlobalResponseId = (id, type, url) => {
    console.log('Setting responseId:', id);
    setResponseId(id);
    setUserType(type);
    setImageUrl(url);
  };

  return (
    <ResponseIdContext.Provider
      value={{ responseId, userType, propicUrl, setGlobalResponseId }}
    >
      {children}
    </ResponseIdContext.Provider>
  );
};

export const useResponseId = () => useContext(ResponseIdContext);
