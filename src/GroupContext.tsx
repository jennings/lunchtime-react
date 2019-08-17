import React from "react"
import { Group } from "./interfaces";

const GroupContext = React.createContext<Group | null>(null);

export default GroupContext
