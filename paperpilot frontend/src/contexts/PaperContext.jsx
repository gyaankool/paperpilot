import React, { createContext, useContext, useState } from 'react';

const PaperContext = createContext();

export const usePaper = () => {
  const context = useContext(PaperContext);
  if (!context) {
    throw new Error('usePaper must be used within a PaperProvider');
  }
  return context;
};

export const PaperProvider = ({ children }) => {
  const [processedPapers, setProcessedPapers] = useState([]);
  const [currentPaper, setCurrentPaper] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const addProcessedPaper = (paper) => {
    setProcessedPapers(prev => [...prev, paper]);
  };

  const setProcessedPapersData = (papers) => {
    setProcessedPapers(papers);
  };

  const clearProcessedPapers = () => {
    setProcessedPapers([]);
    setCurrentPaper(null);
  };

  const selectPaper = (paper) => {
    setCurrentPaper(paper);
  };

  const value = {
    processedPapers,
    currentPaper,
    isProcessing,
    setIsProcessing,
    addProcessedPaper,
    setProcessedPapersData,
    clearProcessedPapers,
    selectPaper
  };

  return (
    <PaperContext.Provider value={value}>
      {children}
    </PaperContext.Provider>
  );
};

