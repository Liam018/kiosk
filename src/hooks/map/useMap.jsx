import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const useMap = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [roomId, setRoomId] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [roomName, setRoomName] = useState("");
  const [roomData, setRoomData] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const detailRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showRooms, setShowRooms] = useState(false);
  const [showRooms2, setShowRooms2] = useState(false);

  // Room data with coordinates for clickable points on the map
  const roomCoordinates = [
    { room_id: 1, x: 54, y: 102 },
    { room_id: 2, x: 137, y: 102 },
    { room_id: 3, x: 261, y: 102 },
    { room_id: 4, x: 343, y: 102 },
    { room_id: 5, x: 54, y: 220 },
    { room_id: 6, x: 54, y: 300 },
    { room_id: 7, x: 54, y: 423 },
    { room_id: 8, x: 250, y: 420 },
    { room_id: 9, x: 175, y: 553 },
    { room_id: 10, x: 295, y: 545 },
    { room_id: 11, x: 810, y: 60 },
    { room_id: 12, x: 893, y: 60 },
    { room_id: 13, x: 976, y: 60 },
    { room_id: 14, x: 1095, y: 177 },
    { room_id: 15, x: 1095, y: 257 },
    { room_id: 16, x: 501, y: 255 },
    { room_id: 17, x: 607, y: 255 },
    { room_id: 18, x: 689, y: 255 },
    { room_id: 19, x: 775, y: 255 },
    { room_id: 20, x: 956, y: 258 },
    { room_id: 21, x: 479, y: 337 },
    { room_id: 22, x: 479, y: 417 },
    { room_id: 23, x: 479, y: 500 },
    { room_id: 24, x: 1095, y: 412 },
    { room_id: 25, x: 955, y: 435 },
    { room_id: 26, x: 533, y: 110 }, // 2F
    { room_id: 27, x: 617, y: 110 },
    { room_id: 28, x: 703, y: 110 },
    { room_id: 29, x: 533, y: 19 }, // 3F
    { room_id: 30, x: 617, y: 19 },
    { room_id: 31, x: 703, y: 19 },
    { room_id: 32, x: 260, y: 333 }, // 2f COMP
  ];

  // Fetch room data on mount
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://192.168.0.213:8000/users/room/list/`
        );
        setRoomData(response.data);
        setFilteredRooms(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch room data");
        setLoading(false);
        console.error("Error fetching room data:", err);
      }
    };
    fetchRooms();
  }, []);

  // Filter rooms based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredRooms(roomData);
    } else {
      const filtered = roomData.filter(
        (room) =>
          room.room_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
          room.room_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredRooms(filtered);
    }
  }, [searchTerm, roomData]);

  // Scroll to detail view when a room is selected
  useEffect(() => {
    if (selectedRoom && detailRef.current) {
      detailRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [selectedRoom]);

  // Handler functions
  const handleRoomClick = (room, e) => {
    e.stopPropagation();
    setSelectedRoom(room);
    setRoomId(room.room_id);
    setRoomNumber(room.room_number);
    setRoomName(room.room_name || "N/A");
    setShowRooms(
      [11, 12, 13].includes(room.room_id) ||
        (showRooms && room.room_id >= 26 && room.room_id <= 31)
    );
    setShowRooms2(
      [8].includes(room.room_id) || (showRooms2 && room.room_id == 32)
    );

    console.log("Room clicked:", room.room_id, room.room_number);
  };

  const handleSearchChange = (e) => {
    setSelectedRoom(null);
    setSearchTerm(e.target.value);
    setShowRooms(false);
    setShowRooms2(false);
  };

  const handleSearchSelect = (room) => {
    setSelectedRoom(room);
    setRoomId(room.room_id);
    setRoomNumber(room.room_number);
    setRoomName(room.room_name || "N/A");
    setSearchTerm("");
    setShowRooms(
      [11, 12, 13, 26, 27, 28, 29, 30, 31].includes(room.room_id) ||
        (showRooms && room.room_id >= 26 && room.room_id <= 31)
    );
    setShowRooms2(
      [8, 32].includes(room.room_id) || (showRooms2 && room.room_id == 32)
    );
  };

  const handleUpdate = () => {
    setShowModal(true);
    setRoomId(selectedRoom.room_id);
    setRoomNumber(selectedRoom.room_number);
    setRoomName(selectedRoom.room_name || "N/A");
  };

  const handleSave = async (updatedRoom) => {
    try {
      const response = await axios.patch(
        `http://192.168.0.213:8000/users/room/update/${updatedRoom.room_id}/`,
        {
          room_number: updatedRoom.room_number,
          room_name: updatedRoom.room_name || "N/A",
        }
      );
      const updatedRoomData = roomData.map((room) =>
        room.room_id === updatedRoom.room_id
          ? {
              ...room,
              room_number: updatedRoom.room_number,
              room_name: updatedRoom.room_name,
            }
          : room
      );
      setRoomData(updatedRoomData);
      setSelectedRoom({
        ...selectedRoom,
        room_number: updatedRoom.room_number,
        room_name: updatedRoom.room_name,
      });
      setRoomId(updatedRoom.room_id);
      setRoomNumber(updatedRoom.room_number);
      setRoomName(updatedRoom.room_name || "N/A");
      toast.success("Room updated successfully!");
    } catch (err) {
      toast.error("Error updating room:", err);
      alert("Failed to update room. Please try again.");
    }
  };

  const handleOutsideClick = (e) => {
    if (e.target.tagName === "IMG") {
      setSelectedRoom(null);
      setRoomId("");
      setRoomNumber("");
      setRoomName("");
      setShowRooms(false);
      setShowRooms2(false);
    }
  };

  // Map rooms with coordinates
  const rooms = filteredRooms.map((room) => {
    const coordinates = roomCoordinates.find(
      (coord) => coord.room_id === room.room_id
    ) || { x: 0, y: 0 };
    return {
      room_id: room.room_id,
      room_number: room.room_number,
      room_name: room.room_name,
      x: coordinates.x,
      y: coordinates.y,
    };
  });

  return {
    selectedRoom,
    roomId,
    roomNumber,
    roomName,
    filteredRooms,
    searchTerm,
    detailRef,
    showModal,
    loading,
    error,
    showRooms,
    showRooms2,
    rooms,
    handleRoomClick,
    handleSearchChange,
    handleSearchSelect,
    handleUpdate,
    handleSave,
    handleOutsideClick,
    setSearchTerm,
    setShowModal,
  };
};

export default useMap;
