import React, { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle, X, Info } from 'lucide-react';

const AlertBanner = ({ alert, onDismiss }) => {
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    // Auto dismiss after 5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onDismiss(), 300); // Allow time for exit animation
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [onDismiss]);
  
  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(() => onDismiss(), 300); // Allow time for exit animation
  };
  
  const getAlertStyles = () => {
    switch (alert.type) {
      case 'error':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          text: 'text-red-800',
          icon: <AlertTriangle className="h-5 w-5 text-red-500" />
        };
      case 'warning':
        return {
          bg: 'bg-amber-50',
          border: 'border-amber-200',
          text: 'text-amber-800',
          icon: <AlertTriangle className="h-5 w-5 text-amber-500" />
        };
      case 'success':
        return {
          bg: 'bg-green-50',
          border: 'border-green-200',
          text: 'text-green-800',
          icon: <CheckCircle className="h-5 w-5 text-green-500" />
        };
      default:
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          text: 'text-blue-800',
          icon: <Info className="h-5 w-5 text-blue-500" />
        };
    }
  };
  
  const styles = getAlertStyles();
  
  return (
    <div 
      className={`${styles.bg} ${styles.border} ${styles.text} border rounded-md p-4 mb-3 flex items-start transition-all duration-300 ${
        isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-4'
      }`}
    >
      <div className="flex-shrink-0 mr-3">
        {styles.icon}
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium">{alert.message}</p>
      </div>
      <button 
        onClick={handleDismiss}
        className="ml-auto -my-1.5 -mr-1.5 p-1.5 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export default AlertBanner;