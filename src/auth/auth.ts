import { createContext } from "react";

const authContext = createContext({
    authenticated: false,
    setAuthenticated: (auth: boolean) => { console.log(auth); },
});

export default authContext;