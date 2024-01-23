import React from 'react'
import Navbar from '../features/navbar/Navbar'
import UserProfile from './../features/user/components/UserProfile';

export default function UserProfilePage() {
  return (
    <>  
       <Navbar >
       <div className=' mx-auto max-w-7xl  mt-4 py-2 pb-1 sm:px-6 lg:px-8'>
           <h1 className='mx-auto text-2xl font-semibold'>My Profile</h1>
            <UserProfile />
       </div>
       </Navbar>
    </>
  )
}