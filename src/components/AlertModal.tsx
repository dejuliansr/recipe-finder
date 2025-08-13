import { useEffect, useState } from 'react';

interface AlertModalProps {
  message: string;
  onClose: () => void;
}

export default function AlertModal({
  message,
  onClose,
}: AlertModalProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 10);
  }, []);

  const handleClose = () => {
    setShow(false);
    setTimeout(onClose, 300);
  };

  return (
    <div className="fixed inset-0 bg-black/40 blurred flex items-center justify-center p-4 transition-opacity duration-300 ease-out">
      <div
        className={`bg-white rounded-lg shadow-lg max-w-sm w-full p-6 transform transition-all duration-300 ease-out
        ${
          show
            ? 'opacity-100 scale-100'
            : 'opacity-0 scale-90'
        }`}
      >
        <h2 className="text-lg font-bold mb-3 text-gray-800">
          Opsss!!!
        </h2>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex justify-end">
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-500 transition-transform cursor-pointer"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
