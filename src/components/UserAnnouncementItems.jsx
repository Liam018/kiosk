import React, { useEffect, useState, useRef, useMemo } from "react";
import useAnnouncements from "../hooks/announcements/useAnnouncements";
import logo from "../assets/logo.png";
import campus from "../assets/campus.png";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "react-toastify";
import announcebg1 from "../assets/announce1.jpg";
import announcebg2 from "../assets/announce2.jpg";

function UserAnnouncementItems() {
  const {
    filteredAnnouncements,
    fetchAnnouncements,
    currentDate,
    goToPreviousMonth,
    incrementAnnouncementViews,
    goToNextMonth,
    formatMonthYear,
    daysOfWeek,
    calendarDays,
    isToday,
  } = useAnnouncements();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentSlide, setCurrentSlide] = useState(0);
  const showButtons = filteredAnnouncements.length >= 6;

  const lastViewedId = useRef(null);
  const viewTimeout = useRef(null);

  const bgImages = [announcebg1, announcebg2];

  const announcementsOnSelectedDate = useMemo(() => {
    return selectedDate
      ? filteredAnnouncements.filter((ann) => {
          const startDate = new Date(ann.announcement_start_date);
          const endDate = new Date(ann.announcement_end_date);
          return startDate <= selectedDate && endDate >= selectedDate;
        })
      : [];
  }, [selectedDate, filteredAnnouncements]);

  useEffect(() => {
    fetchAnnouncements();
    const interval = setInterval(fetchAnnouncements, 60000); // fetch every 1 minute
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (
      announcementsOnSelectedDate.length > 0 &&
      announcementsOnSelectedDate[currentSlide]
    ) {
      const announcementId =
        announcementsOnSelectedDate[currentSlide].announcement_id;

      if (viewTimeout.current) {
        clearTimeout(viewTimeout.current);
      }

      viewTimeout.current = setTimeout(() => {
        if (lastViewedId.current !== announcementId) {
          incrementAnnouncementViews(announcementId);
          lastViewedId.current = announcementId;
        }
      }, 3000);

      return () => {
        clearTimeout(viewTimeout.current);
      };
    }
  }, [currentSlide, announcementsOnSelectedDate, incrementAnnouncementViews]);

  const handleDateClick = (day) => {
    if (day) {
      const newDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day
      );
      setSelectedDate(newDate);
      setCurrentSlide(0);
    }
  };

  const showButtons2 = announcementsOnSelectedDate.length >= 2;

  return (
    <>
      <div className="h-full bg-gray-100">
        {/* Header */}
        <div className="flex items-center justify-start mb-4 p-4">
          <img src={logo} alt="School Logo" className="w-15 h-15 mr-4" />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Castor Z. Concepcion Memorial National High School
            </h1>
            <p className="text-lg text-yellow-400 font-semibold">ANNOUNCEMENTS</p>
          </div>
        </div>

        {/* Content */}
        <div className="transition-all ease-in-out duration-700 animate-fadeIn">
          {/* Upcoming Events */}
          <div className="m-4 pl-4">
            <h1 className="text-2xl text-teal-700 font-bold">UPCOMING EVENTS</h1>
          </div>

          <div className="relative pl-4 pr-4">
            {showButtons && (
              <button
                className="absolute left-4 top-1/2 transform -translate-y-1/2 hover:bg-gray-200 p-2 rounded-full shadow-md text-2xl z-10"
                onClick={() => {
                  document.getElementById("announcement-container").scrollBy({
                    left: -200,
                    behavior: "smooth",
                  });
                }}
              >
                <ChevronLeft className="h-6 w-6 text-gray-800" />
              </button>
            )}
            <div
              id="announcement-container"
              className="overflow-hidden whitespace-nowrap flex m-4"
              style={{ scrollBehavior: "smooth" }}
            >
              {[...filteredAnnouncements]
                .sort(
                  (a, b) =>
                    new Date(a.announcement_start_date) -
                    new Date(b.announcement_start_date)
                )
                .map((item, index) => (
                  <div
                    key={index}
                    className="min-w-[300px] min-h-[200px] p-5 shadow-md bg-white flex flex-col justify-center items-center relative border-t-4 border-teal-500"
                    style={{
                      backgroundImage: `url(${
                        bgImages[index % bgImages.length]
                      })`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <div className="flex flex-col items-center ml-25 gap-2">
                      <div className="flex gap-2 items-center justify-center">
                        <h1 className="text-lg font-semibold text-gray-800">
                          {new Date(item.announcement_start_date).toLocaleDateString("en-US", {
                            month: "long",
                            day: "2-digit",
                          })}
                        </h1>
                        -
                        <h1 className="text-lg font-semibold text-gray-800">
                          {new Date(item.announcement_end_date).toLocaleDateString("en-US", {
                            month: "long",
                            day: "2-digit",
                          })}
                        </h1>
                      </div>

                      <p className="text-md font-medium text-gray-600">
                        {item.announcement_title}
                      </p>
                    </div>
                  </div>
                ))}

              {filteredAnnouncements.length === 0 && (
                <p className="text-lg text-center text-red-500">
                  No announcements available.
                </p>
              )}
            </div>
            {showButtons && (
              <button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 hover:bg-gray-200 p-2 rounded-full shadow-md text-2xl z-10"
                onClick={() => {
                  document.getElementById("announcement-container").scrollBy({
                    left: 200,
                    behavior: "smooth",
                  });
                }}
              >
                <ChevronRight className="h-6 w-6 text-gray-800" />
              </button>
            )}
          </div>

          {/* Happening This Week */}
          <div className="m-4 px-4 pt-5">
            <h1 className="text-2xl text-teal-700 font-bold">HAPPENING THIS WEEK</h1>
          </div>

          <div className="flex flex-col md:flex-row gap-4 m-4 px-4">
            {/* Calendar */}
            <div className="bg-white p-5 rounded-lg shadow-lg w-full md:w-1/3">
              <div className="flex items-center justify-between mb-4 p-4">
                <button
                  onClick={goToPreviousMonth}
                  className="p-2 text-gray-600 hover:text-teal-600"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <div className="text-center">
                  <span className="text-lg font-semibold">
                    {formatMonthYear()}
                  </span>
                </div>
                <button
                  onClick={goToNextMonth}
                  className="p-2 text-gray-600 hover:text-teal-600"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium text-gray-600 mb-2">
                {daysOfWeek.map((day) => (
                  <div key={day} className="py-2">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1 text-center">
                {calendarDays.map((day, index) => {
                  const isSelected =
                    day &&
                    selectedDate &&
                    day === selectedDate.getDate() &&
                    currentDate.getMonth() === selectedDate.getMonth() &&
                    currentDate.getFullYear() === selectedDate.getFullYear();

                  return (
                    <div
                      key={index}
                      onClick={() => handleDateClick(day)}
                      className={`flex items-center justify-center p-4 h-12 transition-colors cursor-pointer
                      ${day === null ? "text-gray-300" : "text-gray-800"}
                      ${
                        isToday(day)
                          ? "bg-teal-700 text-white rounded-full"
                          : ""
                      }
                      ${
                        isSelected
                          ? "bg-yellow-400 text-gray-800 font-semibold rounded-full"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {day || ""}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Announcements for Selected Date */}
            <div className="w-full md:w-2/3 ">
              <div
                className="w-full h-full bg-white rounded-lg shadow-lg p-10 relative overflow-hidden flex flex-col justify-center "
                style={{
                  backgroundImage: `url(${
                    bgImages[currentSlide % bgImages.length]
                  })`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-black opacity-40 z-0"></div>
                {announcementsOnSelectedDate.length > 0 ? (
                  <div className="relative flex items-center z-10">
                    {showButtons2 && announcementsOnSelectedDate.length > 0 && (
                      <button
                        className="absolute left-0 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 cursor-pointer"
                        onClick={() =>
                          setCurrentSlide((prev) =>
                            prev === 0
                              ? announcementsOnSelectedDate.length - 1
                              : prev - 1
                          )
                        }
                      >
                        <ChevronLeft className="h-6 w-6 text-gray-800" />
                      </button>
                    )}

                    <div className="w-full flex justify-center items-center p-4 z-9">
                      <div className="text-center">
                        <h1 className="text-4xl font-bold text-teal-300 mb-2 leading-border-text">
                          {
                            announcementsOnSelectedDate[currentSlide]
                              .announcement_title
                          }
                        </h1>
                        <p className="text-white text-lg mb-2">
                          {new Date(
                            announcementsOnSelectedDate[
                              currentSlide
                            ].announcement_start_date
                          ).toLocaleDateString()}{" "}
                          -{" "}
                          {new Date(
                            announcementsOnSelectedDate[
                              currentSlide
                            ].announcement_end_date
                          ).toLocaleDateString()}
                        </p>
                        <p className="text-white text-2xl mt-6 break-words whitespace-normal">
                          {announcementsOnSelectedDate[currentSlide]
                            ?.announcement_description ||
                            "No description available"}
                        </p>
                      </div>
                    </div>

                    {showButtons2 && announcementsOnSelectedDate.length > 0 && (
                      <button
                        className="absolute right-0 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-200 cursor-pointer"
                        onClick={() =>
                          setCurrentSlide((prev) =>
                            prev === announcementsOnSelectedDate.length - 1
                              ? 0
                              : prev + 1
                          )
                        }
                      >
                        <ChevronRight className="h-6 w-6 text-gray-800" />
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="text-center text-gray-500 z-10">
                    {selectedDate
                      ? "No current announcement on selected date."
                      : "No announcements in today's date."}
                  </div>
                )}
                <div className="text-sm text-black mt-4 absolute left-5 top-0">
                  {currentSlide + 1} / {announcementsOnSelectedDate.length || 1}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserAnnouncementItems;
