"use client";

import React, { useEffect, useState } from "react";
import {
  X,
  CheckCircle,
  AlertCircle,
  Info,
  AlertTriangle,
  Heart,
} from "lucide-react";
import { Toast as ToastType } from "../../types/toast";
import FavoriteHeartIcon from "./FavoriteHeartIcon";

interface ToastProps {
  toast: ToastType;
  onRemove: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({ toast, onRemove }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  // Auto-dismiss after duration
  useEffect(() => {
    if (toast.duration && toast.duration > 0) {
      const timer = setTimeout(() => {
        setIsExiting(true);
        setTimeout(() => onRemove(toast.id), 300);
      }, toast.duration);

      return () => clearTimeout(timer);
    }
  }, [toast.duration, toast.id, onRemove]);

  const handleRemove = () => {
    setIsExiting(true);
    setTimeout(() => onRemove(toast.id), 300);
  };

  const getToastStyles = () => {
    const baseStyles =
      "flex items-center space-x-3 p-4 rounded-lg shadow-lg border transition-all duration-300 ease-in-out transform";

    switch (toast.type) {
      case "success":
        return `${baseStyles} bg-green-50 border-green-200 text-green-800`;
      case "error":
        return `${baseStyles} bg-red-50 border-red-200 text-red-800`;
      case "warning":
        return `${baseStyles} bg-yellow-50 border-yellow-200 text-yellow-800`;
      case "info":
      default:
        return `${baseStyles} bg-blue-50 border-blue-200 text-blue-800`;
    }
  };

  const getIcon = () => {
    const iconClass = "h-5 w-5 flex-shrink-0";

    switch (toast.type) {
      case "success":
        return <CheckCircle className={`${iconClass} text-green-600`} />;
      case "error":
        return <AlertCircle className={`${iconClass} text-red-600`} />;
      case "warning":
        return <AlertTriangle className={`${iconClass} text-yellow-600`} />;
      case "info":
      default:
        return <Info className={`${iconClass} text-blue-600`} />;
    }
  };

  const animationClass = isExiting
    ? "translate-x-full opacity-0 scale-95"
    : isVisible
    ? "translate-x-0 opacity-100 scale-100"
    : "translate-x-full opacity-0 scale-95";

  return (
    <div
      className={`${getToastStyles()} ${animationClass} max-w-sm w-full hover:scale-105 hover:shadow-xl cursor-pointer`}
      onClick={toast.action?.onClick}
    >
      {getIcon()}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium">{toast.message}</p>
      </div>

      {toast.action && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            toast.action?.onClick();
          }}
          className="text-sm font-medium underline hover:no-underline transition-all duration-200"
        >
          {toast.action.label}
        </button>
      )}

      <button
        onClick={(e) => {
          e.stopPropagation();
          handleRemove();
        }}
        className="p-1 hover:bg-black/10 rounded-full transition-colors duration-200 group"
      >
        <X className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
      </button>
    </div>
  );
};

export default Toast;
