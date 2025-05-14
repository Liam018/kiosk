// confirmation 
export default function ConfirmationModal ({ isOpen, onClose, onConfirm, title, message }){
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        {/* Overlay */}
        <div
          className="fixed inset-0 bg-black opacity-25 transition-opacity -z-10"
        >
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
          <div className="text-gray-600 mb-6">{message}</div>
          <div className="flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 text-white bg-teal-600 rounded-lg hover:bg-teal-700"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    );
  };