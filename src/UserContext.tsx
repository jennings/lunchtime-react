import React from "react"
import { User } from "./interfaces";

const UserContext = React.createContext<User | null>(null);

export default UserContext
