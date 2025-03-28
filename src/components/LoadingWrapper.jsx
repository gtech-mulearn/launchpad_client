import React, { useState, useEffect } from "react";
import Loading from "./Loading";

const LoadingWrapper = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Show loading for at least 1.5 seconds for a better UX
    
    // Add event listener for beforeunload to show loading when refreshing
    const handleBeforeUnload = () => {
      setIsLoading(true);
    };
    
    window.addEventListener("beforeunload", handleBeforeUnload);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  // Add event listener for when route changes
  useEffect(() => {
    const handleStartNavigation = () => {
      setIsLoading(true);
    };
    
    const handleEndNavigation = () => {
      setIsLoading(false);
    };
    
    window.addEventListener("popstate", handleStartNavigation);
    
    return () => {
      window.removeEventListener("popstate", handleStartNavigation);
    };
  }, []);

  return isLoading ? <Loading /> : children;
};

export default LoadingWrapper; 