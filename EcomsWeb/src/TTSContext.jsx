import React, { createContext, useContext, useState } from 'react';

const TTSContext = createContext();

export const TTSProvider = ({ children }) => {
  const [isTTSEnabled, setIsTTSEnabled] = useState(true); // default ON

  const toggleTTS = () => setIsTTSEnabled(prev => !prev);

  return (
    <TTSContext.Provider value={{ isTTSEnabled, toggleTTS }}>
      {children}
    </TTSContext.Provider>
  );
};

export const useTTS = () => useContext(TTSContext);
