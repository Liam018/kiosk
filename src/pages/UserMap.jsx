import React from 'react'
import FooterNavigation from '../components/FooterNavigation'
import UserMapItems from '../components/UserMapItems'


function UserMap() {
  return (
    <>
        <div className="w-full min-h-screen">
            <UserMapItems />
            <FooterNavigation />
        </div>
    </>
  )
}

export default UserMap