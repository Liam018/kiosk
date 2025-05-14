import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmationModal from './ConfirmationModal';

export default function EditRoomModal({ room, isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    room_id: '',
    room_number: '',
    room_name: '',
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [submitData, setSubmitData] = useState(null);

  useEffect(() => {
    if (room) {
      setFormData({
        room_id: room.room_id,
        room_number: room.room_number,
        room_name: room.room_name || '',
      });
    }
    setShowConfirmation(false);
    setSubmitData(null);
  }, [room, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.room_id || !formData.room_number) {
      toast.error('Please fill in all required fields');
      return;
    }

    const dataToSubmit = {
      room_id: formData.room_id,
      room_number: formData.room_number,
      room_name: formData.room_name,
    };

    setSubmitData(dataToSubmit);
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    onSave(submitData);
    setShowConfirmation(false);
    onClose();
  };

  const handleCancelConfirm = () => {
    setShowConfirmation(false);
    setSubmitData(null);
  };

  const getConfirmationMessage = () => {
    if (!submitData) return '';

    const changes = [];

    // Check room_number change
    if (room && submitData.room_number !== room.room_number) {
      changes.push(
        `room number from "${room.room_number}" to "${submitData.room_number}"`
      );
    }

    // Check room_name change
    if (room && submitData.room_name !== (room.room_name || '')) {
      changes.push(
        `room name from "${room.room_name || ''}" to "${submitData.room_name}"`
      );
    }

    if (changes.length === 0) {
      return 'No changes were made. Are you sure you want to proceed?';
    }

    return `Are you sure you want to update this room's: ${changes.join(' and ')}?`;
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto shadow">
      <div className="flex items-center justify-center min-h-screen px-4 py-8">
        {/* Overlay */}
        <div
          className="fixed inset-0 bg-black opacity-25"
        ></div>

        {/* Modal Content */}
        <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-auto transition-all animate-fadeIn">
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Edit Room</h2>
          </div>

          <form onSubmit={handleSubmit} className="px-6 py-4">
            <div className="space-y-4">
              {/* Room ID Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Room ID
                </label>
                <input
                  type="text"
                  name="room_id"
                  value={formData.room_id}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  readOnly
                />
              </div>

              {/* Room Number Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Room Number
                </label>
                <input
                  type="text"
                  name="room_number"
                  value={formData.room_number}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  required
                />
              </div>

              {/* Room Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Room Name
                </label>
                <input
                  type="text"
                  name="room_name"
                  value={formData.room_name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  placeholder="Optional"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex justify-end space-x-3 border-t border-gray-200 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-md hover:bg-teal-700 cursor-pointer"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={handleCancelConfirm}
        onConfirm={handleConfirm}
        title="Confirm Room Update"
        message={getConfirmationMessage()}
      />
    </div>
  );
}