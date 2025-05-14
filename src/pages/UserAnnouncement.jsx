import React, { useEffect } from 'react'
import useAnnouncements from '../hooks/announcements/useAnnouncements'
import FooterNavigation from '../components/FooterNavigation'
import UserAnnouncementItems from '../components/UserAnnouncementItems'

function UserAnnouncement() {
 const {
  filteredAnnouncements,
  fetchAnnouncements,
  searchQuery,
  handleSearchChange,
  selectedDate,
 } = useAnnouncements()

 useEffect(() =>{
  fetchAnnouncements()
  const interval = setInterval(fetchAnnouncements, 5000);
  return () => clearInterval(interval);
 }, [])
  return (
    <>
      <div>
        <UserAnnouncementItems />
        <FooterNavigation />
      </div>

    </>
  )
}

export default UserAnnouncement