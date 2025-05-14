import React from "react";
import "react-calendar/dist/Calendar.css";
import "../styles.css";
import { Archive, Plus, Filter, ChevronLeft, ChevronRight, Search } from "lucide-react";
import AnnouncementTable from "./AnnouncementTable";
import ArchiveModal from "./ArchiveModal";
import useAnnouncements from "../hooks/announcements/useAnnouncements";
import CreateAnnounceModal from "./CreateAnnounceModal";

const CalendarAnnouce = () => {
  const {
    currentDate,
    selectedDate,
    isPickerOpen,
    isModalOpen,
    isArchiveModalOpen,
    loading,
    error,
    searchQuery,
    pickerRef,
    filteredAnnouncements,
    handleSearchChange,
    goToPreviousMonth,
    goToNextMonth,
    setIsPickerOpen,
    handleDateClick,
    isToday,
    handleMonthYearChange,
    handleAddClick,
    handleAnnouncementCreated,
    setIsModalOpen,
    setIsArchiveModalOpen,
    fetchAnnouncements,
    years,
    months,
    formatMonthYear,
    daysOfWeek,
    calendarDays,
  } = useAnnouncements();

  return (
    <>
      {/* Search and Buttons */}
      <div className="flex flex-col flex-wrap sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4 px-5 pt-5">
        <div className="relative w-full sm:w-80 transition-all ease-in-out duration-700 animate-fadeIn">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="text-gray-400 w-4 h-4"/>
          </div>
          <input
            type="text"
            id="table-search-users"
            className="block w-full px-4 py-2.5 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-teal-500 focus:border-teal-500"
            placeholder="Search....."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <div className="flex space-x-3">
          <button
            className="border border-gray-400 rounded-lg px-4 py-2 flex items-center justify-center shadow font-semibold bg-teal-700 text-white hover:bg-teal-800 hover:text-white cursor-pointer"
            onClick={() => setIsArchiveModalOpen(true)}
          >
            <Archive className="w-4 h-4 mr-1" />
            Archive
          </button>
          <button
            className="border border-gray-400 rounded-lg px-4 py-2 flex items-center justify-center shadow font-semibold bg-teal-700 text-white hover:bg-teal-800 hover:text-white cursor-pointer"
            onClick={handleAddClick}
          >
            <Plus className="w-4 h-4 mr-1" />
            Create
          </button>
        </div>
      </div>

      {/* Calendar and Table */}
      <div className="flex flex-col lg:flex-row gap-4 w-full max-w-7xl mx-auto px-5 py-5">
        {/* Calendar */}
        <div
          className={`bg-white p-5 rounded-lg shadow-lg transition-all ease-in-out duration-800 animate-fadeIn ${
            selectedDate || searchQuery ? "w-full lg:w-1/3" : "w-full"
          }`}
        >
          {/* Header with navigation */}
          <div className="flex items-center justify-between mb-4 p-4">
            <button
              onClick={goToPreviousMonth}
              className="p-2 text-gray-600 hover:text-teal-600"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="text-center relative" ref={pickerRef}>
              <button
                onClick={() => setIsPickerOpen(!isPickerOpen)}
                className="text-gray-600 hover:text-teal-600 active:text-teal-600 transition-colors flex items-center space-x-2"
              >
                <span className="text-lg font-semibold">{formatMonthYear()}</span>
                <Filter className="w-5 h-5" />
              </button>
              {isPickerOpen && (
                <div className="absolute top-10 left-1/2 transform -translate-x-1/2 z-10 bg-white border border-gray-200 rounded-lg shadow-lg p-3 sm:p-4 w-64 sm:w-72">
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      value={currentDate.getMonth()}
                      onChange={(e) =>
                        handleMonthYearChange(parseInt(e.target.value), currentDate.getFullYear())
                      }
                      className="w-full p-2 border border-gray-300 rounded-md text-gray-800 text-sm sm:text-base"
                    >
                      {months.map((month, index) => (
                        <option key={month} value={index}>
                          {month}
                        </option>
                      ))}
                    </select>
                    <select
                      value={currentDate.getFullYear()}
                      onChange={(e) =>
                        handleMonthYearChange(currentDate.getMonth(), parseInt(e.target.value))
                      }
                      className="w-full p-2 border border-gray-300 rounded-md text-gray-800 text-sm sm:text-base"
                    >
                      {years.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={goToNextMonth}
              className="p-2 text-gray-600 hover:text-teal-600"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Days of the week */}
          <div className="grid grid-cols-7 gap-1 text-center text-sm sm:text-base font-medium text-gray-600 mb-2">
            {daysOfWeek.map((day) => (
              <div key={day} className="py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {calendarDays.map((day, index) => (
              <div
                key={index}
                onClick={() => handleDateClick(day)}
                className={`flex items-center justify-center cursor-pointer transition-colors
                            ${selectedDate ? "p-4 sm:p-4 h-12 sm:h-14" : "p-4 sm:p-6 h-12 sm:h-14"}
                            ${day === null ? "text-gray-300" : "text-gray-800"}
                            ${isToday(day) ? "bg-teal-700 text-white ": ""}
                            ${
                              selectedDate &&
                              day === selectedDate.getDate() &&
                              currentDate.getMonth() === selectedDate.getMonth() &&
                              currentDate.getFullYear() === selectedDate.getFullYear()
                                ? "bg-yellow-400 text-gray-800 font-semibold hover:border"
                                : "hover:border-teal-800 hover:border"
                            }`
                          }
              >
                {day || ""}
              </div>
            ))}
          </div>
        </div>

        {/* Announcement Table */}
        {(selectedDate || searchQuery) && (
          <div className="w-full lg:w-2/3">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
              </div>
            ) : error ? (
              <div className="bg-white p-5 rounded-lg shadow-lg text-center text-red-500">
                Error loading announcements: {error}
              </div>
            ) : (
              <AnnouncementTable
                selectedDate={selectedDate}
                announcements={filteredAnnouncements}
                onRefresh={fetchAnnouncements}
              />
            )}
          </div>
        )}
      </div>

      {/* Modals */}
      <CreateAnnounceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAnnouncementCreated={handleAnnouncementCreated}
      />
      <ArchiveModal
        isOpen={isArchiveModalOpen}
        onClose={() => setIsArchiveModalOpen(false)}
        onRestore={fetchAnnouncements}
      />
    </>
  );
};

export default CalendarAnnouce;