import React from "react"

const UserContext = React.createContext<firebase.User | null>(null);

export default UserContext
