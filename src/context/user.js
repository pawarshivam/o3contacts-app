import React, { createContext, useState } from "react";

const UserContext = createContext(null);
const UserDispatchContext = createContext(null);

const UserProvider = ({ children }) => {
    const localUser = localStorage.getItem("user");
    let parsedLocalUser = null;

    if (localUser) {
        parsedLocalUser = JSON.parse(localUser);
    }

    const [user, setUser] = useState(parsedLocalUser);

    return (
        <UserContext.Provider value={user}>
            <UserDispatchContext.Provider value={setUser}>
                {children}
            </UserDispatchContext.Provider>
        </UserContext.Provider>
    )
}

export {
    UserProvider,
    UserContext,
    UserDispatchContext,
};