import React from 'react'
import { useAuthContext } from '../hooks/useAuthContext'

const LogoutPage = () => {

    const {dispatch}=useAuthContext()


    const handleLogout=()=>{

dispatch({type:"LOGOUT", payload:null})
localStorage.setItem( null)
    }
  return (

    <div>
<button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default LogoutPage