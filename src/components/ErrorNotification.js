import React from "react";

const ErrorNotification = ({ message, onClose }) => {
    return (
        <div className="flex items-center p-4 mb-4 text-red-700 bg-red-100 border border-red-400 rounded-lg" role="alert">
            <svg
                className="w-6 h-6 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8z"
                />
            </svg>
            <div className="flex-1">
                <p className="font-medium">{message}</p>
            </div>
            <button
                onClick={onClose}
                className="ml-4 text-red-600 hover:text-red-800 focus:outline-none"
            >
                &times;
            </button>
        </div>
    );
};

export default ErrorNotification;
