import React, { useState } from 'react';

const RejectionOverlay = ({ isOpen, onClose, onSubmit}) => {
  const [message, setMessage] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {

    onSubmit(message);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md mx-4 md:mx-0">
        <h2 className="text-xl font-semibold mb-4 text-center">Reason for Rejection</h2>
        <textarea
          className="w-full h-32 p-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Write message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="mt-4 flex justify-center">
          <button
            onClick={handleSubmit}
            className={`px-6 py-2 rounded-full text-white focus:outline-none ${
                message.trim() !== ""
                  ? "bg-blue-500 hover:bg-blue-600 cursor-pointer"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
              disabled={message.trim() === ""}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default RejectionOverlay;