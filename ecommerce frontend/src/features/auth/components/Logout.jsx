import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import  {selectLoggedInUser,signOutAsync } from '../authSlice'

function Logout() {
    const dispatch = useDispatch();
    const user = useSelector(selectLoggedInUser)

    useEffect( ()=>{
      if(user){
        console.log("User Logout.jsx called:",user)
        dispatch(signOutAsync());
      }
    },[dispatch,user])

  return (
    <> 
    {console.log("User Logout:",user)}
       {!user && <Navigate to="/login" replace={true} />}
    </>
  )
}

export default Logout