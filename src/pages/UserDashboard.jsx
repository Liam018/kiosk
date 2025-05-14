import React, { useEffect } from 'react'
import FooterNavigation from '../components/FooterNavigation'
import UserDashboardItems from '../components/UserDashboardItems'


function UserDashboard() {
 
  return (
    <>
      <div>
        <UserDashboardItems />
        <FooterNavigation />
      </div>

    </>
  )
}

export default UserDashboard