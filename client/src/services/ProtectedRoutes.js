import React from 'react'
import {Navigate, Outlet} from 'react-router-dom'

function ProtectedRoutes() {
    const auth=localStorage.getItem("token");
    if(!auth){
      return  <Navigate to="/login"/>
    }
    else{
        return <Outlet/>
    }
//   return auth ? <Outlet/> : <Navigate to="/"/>
    
}

export default ProtectedRoutes