import React, { useState } from "react";
import map from "../assets/map.png";
import room23f from "../assets/2f3f.png";
import comp from "../assets/comp.png";
import { Edit, Edit2, Search } from "lucide-react";
import EditRoomModal from "./EditMapModal";
import useMap from "../hooks/map/useMap";

const Map = () => {
  const {
    selectedRoom,
    roomId,
    roomNumber,
    roomName,
    filteredRooms,
    searchTerm,
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
  } = useMap();

  // State for context menu
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    room: null,
  });

  // Handle right-click to show context menu
  const handleRightClick = (room, e) => {
    e.preventDefault();
    setContextMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      room,
    });
  };

  // Handle context menu option click
  const handleContextMenuEdit = () => {
    if (contextMenu.room) {
      handleRoomClick(contextMenu.room, { stopPropagation: () => {} }); 
      setShowModal(true); 
      setContextMenu({ visible: false, x: 0, y: 0, room: null }); 
    }
  };

  const handleMapClick = (e) => {
    setContextMenu({ visible: false, x: 0, y: 0, room: null });
    handleOutsideClick(e);
  };

  // From Gate 1 to each room
  const paths = {
    1: "471,590 414,590 414,465 115,465 115,147 54,147 54,102",
    2: "471,590 414,590 414,465 115,465 115,147 137,147 137,102",
    3: "471,590 414,590 414,146 261,146 261,102",
    4: "471,590 414,590 414,146 343,146 343,102",
    5: "471,590 414,590 414,465 115,465 115,220 54,220",
    6: "471,590 414,590 414,465 115,465 115,300 54,300",
    7: "471,590 414,590 414,465 115,465 115,423 54,423",
    8: "471,590 414,590 414,465 250,465 250,420",
    9: "471,590 471,590 174,590 175,553",
    10: "471,590 294,590 295,545",
    11: "471,590 471,550 543,550 543,305 855,305 855,105 810,105 810,60",
    12: "471,590 471,550 543,550 543,305 855,305 855,105 893,105 893,60",
    13: "471,590 471,550 543,550 543,305 855,305 855,105 976,105 976,60",
    14: "471,590 471,550 543,550 543,305 1035,305 1035,177 1095,177",
    15: "471,590 471,550 543,550 543,305 1035,305 1035,257 1095,257",
    16: "471,590 471,550 543,550 543,255 501,255",
    17: "471,590 471,550 543,550 543,305 607,305 607,255",
    18: "471,590 471,550 543,550 543,305 689,305 689,255",
    19: "471,590 471,550 543,550 543,305 775,305 775,255",
    20: "471,590 471,550 543,550 543,305 956,305 956,258",
    21: "471,590 471,550 543,550 543,337 479,337",
    22: "471,590 471,550 543,550 543,417 479,417",
    23: "471,590 471,550 543,550 543,500 479,500",
    24: "471,590 471,550 543,550 543,305 1035,305 1035,412 1095,412",
    25: "471,590 471,550 955,550 955,435",
    26: "471,590 471,550 543,550 543,305 855,305 855,105 810,105 810,85",
    27: "471,590 471,550 543,550 543,305 855,305 855,105 893,105 893,85",
    28: "471,590 471,550 543,550 543,305 855,305 855,105 976,105 976,85",
    29: "471,590 471,550 543,550 543,305 855,305 855,105 810,105 810,85",
    30: "471,590 471,550 543,550 543,305 855,305 855,105 893,105 893,85",
    31: "471,590 471,550 543,550 543,305 855,305 855,105 976,105 976,85",
    32: "471,590 414,590 414,465 250,465 250,443",
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading room data...
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );

  return (
    <div className="pt-4 mb-4 min-h-screen">
      <div className="max-w-6xl mx-auto" onClick={handleMapClick}>
        <div className="relative w-full sm:w-80">
          {/* Search bar */}
          <div className="relative z-10">
            <div
              className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
            >
              <Search className="w-4 h-4 text-gray-500" />
            </div>
            <input
              type="text"
              id="table-search-users"
              className="block w-full px-4 py-2.5 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-teal-500 focus:border-teal-500"
              placeholder="Search....."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          {/* Dropdown container */}
          {searchTerm.trim() !== "" && (
            <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto z-20">
              {filteredRooms.length > 0 ? (
                filteredRooms.map((room) => (
                  <div
                    key={room.room_id}
                    className="p-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSearchSelect(room)}
                  >
                    {room.room_number} - {room.room_name || "N/A"}
                  </div>
                ))
              ) : (
                <div className="p-2 text-gray-500">No match room/s found</div>
              )}
            </div>
          )}
        </div>

        {/* Map container */}
        <div
          className="relative transition-all ease-in-out duration-700 animate-fadeIn"
          onClick={handleMapClick}
        >
          <div className="relative">
            <img src={map} alt="School Map" className="w-full" />
            {/* SVG for drawing paths */}
            {selectedRoom && (
              <svg
                key={selectedRoom.room_id}
                className="absolute top-0 left-0 w-full h-full pointer-events-none"
                style={{ zIndex: 5 }}
              >
                <polyline
                  points={paths[selectedRoom.room_id]}
                  fill="none"
                  stroke="red"
                  strokeWidth="3"
                  className="path-animation"
                />
              </svg>
            )}
            {/* Room grid image (shown when showRooms is true) */}
            {showRooms && (
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/3 transition-all ease-in-out duration-700 animate-fadeIn border-2 border-teal-700 shadow-md">
                <img
                  src={room23f}
                  alt="Room Grid"
                  className="w-64 h-auto rounded-lg shadow-md"
                />
                <div className="absolute mt-2 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 text-xs font-semibold rounded shadow-md border border-teal-700 whitespace-nowrap">
                  2nd Floor and 3rd Floor for rooms 101, 102, and 103
                </div>
              </div>
            )}

            {/* Room grid image (shown when showRooms2 is true) */}
            {showRooms2 && (
              <div className="absolute top-1/2 -translate-1/2 left-35 transform -translate-x-1/28 transition-all ease-in-out duration-700 animate-fadeIn border-2 border-teal-700 shadow-md">
                <div className="absolute -top-1/3 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 text-xs font-semibold rounded shadow-md border border-teal-700 whitespace-nowrap">
                  2nd Floor of Special Science Building
                </div>
                <img
                  src={comp}
                  alt="Room Grid"
                  className="w-64 h-auto rounded-lg shadow-md"
                />
              </div>
            )}

            {/* Clickable points with labels */}
            {rooms.map((room) => {
              const shouldDisplay =
                (!showRooms &&
                  !showRooms2 &&
                  room.room_id >= 1 &&
                  room.room_id <= 25) ||
                (showRooms && room.room_id >= 26 && room.room_id <= 31) ||
                (showRooms2 && room.room_id == 32) ||
                selectedRoom?.room_id === room.room_id;

              if (!shouldDisplay) return null;

              const isFiltered =
                searchTerm &&
                filteredRooms.some((r) => r.room_id === room.room_id);

              return (
                <div
                  key={room.room_id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${room.x}px`, top: `${room.y}px` }}
                >
                  <div
                    className={`w-4 h-4 rounded-full cursor-pointer hover:bg-yellow-400 transition-colors ${
                      selectedRoom?.room_id === room.room_id || isFiltered
                        ? "bg-yellow-400"
                        : "bg-teal-700"
                    }`}
                    onClick={(e) => handleRoomClick(room, e)}
                    onContextMenu={(e) => handleRightClick(room, e)}
                  />
                  {(selectedRoom?.room_id === room.room_id || isFiltered) && (
                    <div className="absolute -top-7 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 text-xs font-semibold rounded shadow-md border border-teal-700 whitespace-nowrap">
                      {room.room_number}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Context Menu */}
        {contextMenu.visible && (
          <div
            className="fixed bg-white border border-gray-300 rounded-lg shadow-lg z-30"
            style={{ top: `${contextMenu.y}px`, left: `${contextMenu.x}px` }}
          >
            <div
              className="flex items-center text-sm justify-center gap-1 px-4 py-2 rounded-lg hover:border hover:text-teal-800 hover:bg-gray-100 cursor-pointer"
              onClick={handleContextMenuEdit}
            >
              <Edit2 className="h-4 w-4" />
              Edit
            </div>
          </div>
        )}

        {/* Detail view and form
        {selectedRoom && (
          <div
            ref={detailRef}
            className="mt-4 flex transition-all ease-in-out duration-700 animate-fadeIn justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-2/3 ml-4 border border-gray-300 bg-white">
              <div className="bg-teal-700 text-white p-2 grid grid-cols-4">
                <div>Room ID</div>
                <div>Room No.</div>
                <div>Room Name</div>
                <div>Action</div>
              </div>
              <div className="p-2 grid grid-cols-4 items-center">
                <div>{roomId}</div>
                <div>{roomNumber}</div>
                <div>{roomName}</div>
                <div>
                  <button
                    onClick={handleUpdate}
                    className="flex items-center text-black hover:text-teal-700 cursor-pointer"
                  >
                    <Edit2 className="h-4 w-4 mr-1" />
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        )} */}
      </div>
      <EditRoomModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSave}
        room={{ room_id: roomId, room_number: roomNumber, room_name: roomName }}
      />
    </div>
  );
};

export default Map;
