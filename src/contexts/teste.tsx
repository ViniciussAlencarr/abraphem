import { createContext } from "react";
interface A {
    isLoggedIn: boolean;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
}
export const ThemeContext = createContext<A>({isLoggedIn: false, setIsLoggedIn: (isLoggedIn: boolean) => isLoggedIn})