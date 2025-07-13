import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  error: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4 flex items-center space-x-2 animate-fade-in hover:bg-red-200 hover:border-red-500 transition-all duration-300 ease-in-out hover:scale-[1.01] group">
      <AlertCircle className="h-5 w-5 flex-shrink-0 group-hover:text-red-800 transition-colors duration-200 group-hover:scale-110 transform" />
      <span className="group-hover:text-red-800 transition-colors duration-200">{error}</span>
    </div>
  );
};

export default ErrorMessage; 