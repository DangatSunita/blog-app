import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { getCurrentUserDetail, isLoggedIn } from '../auth'
import userContext from "../context/userContext";

function UserProvider({ children }) {

    const [user, setUser] = useState({
        name: 'sunita'
    })

    useEffect(() => {
        setUser({
            name: "Shalini"
        })
    }, [])

    return (

        <userContext.Provider value={ user }>
            {children}
        </userContext.Provider>

    )
}

export default UserProvider