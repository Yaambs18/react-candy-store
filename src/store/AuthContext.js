import { createContext } from "react";

const AuthContext = createContext({
    isLoggedIn: false,
    token: null,
    userEmail: null,
    onLogin: (email, password) => {},
    onLogout: () => {}
});

export default AuthContext;