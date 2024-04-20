import React, { createContext, useState, useContext } from 'react';

const ResponseIdContext = createContext();

export const ResponseIdProvider = ({ children }) => {
  const [responseId, setResponseId] = useState(null);

  const setGlobalResponseId = (id) => {
    console.log('Setting responseId:', id);
    setResponseId(id);
  };

  return (
    <ResponseIdContext.Provider value={{ responseId, setGlobalResponseId }}>
      {children}
    </ResponseIdContext.Provider>
  );
};

export const useResponseId = () => useContext(ResponseIdContext);
