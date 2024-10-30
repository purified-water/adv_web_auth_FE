import React from 'react';

const SuccessNotification = ({ message, onClose }) => {
    return (
        <div className="flex items-center justify-between p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg" role="alert">
            <div className="flex items-center">
                <svg
                    className="w-5 h-5 mr-2 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm-1-12.293l4.293 4.293-1.414 1.414L9 9.414 7.121 11.293 5.707 10l3.293-3.293z"
                        clipRule="evenodd"
                    />
                </svg>
                <span>{message}</span>
            </div>
            <button
                onClick={onClose}
                className="ml-4 text-green-600 hover:text-green-800"
                aria-label="Close"
            >
                &times;
            </button>
        </div>
    );
};

export default SuccessNotification;
