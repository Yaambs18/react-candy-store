import { useState } from "react";
import AuthContext from "./AuthContext";

const defaultAuthState = {
    isLoggedIn: localStorage.getItem('token') ? true : false,
    token: localStorage.getItem('token'),
    userEmail: localStorage.getItem('userEmail'),
    onLogin: (email, password) => {},
    onLogout: () => {}
}

const AuthProvider = (props) => {
    const [authState, setAuthState] = useState(defaultAuthState);

    const loginHandler = async (email, token) => {
        try {
            
            setAuthState(prevState => {
                return {
                    ...prevState,
                    isLoggedIn: true,
                    token: token,
                    userEmail: email
                }
            });
            localStorage.setItem('token', token);
            localStorage.setItem('userEmail', email);
        } catch (error) {
            console.error("Login failed:", error);
        }
    }

    const logoutHandler = () => {
        setAuthState(prevState => {
            return {
                ...prevState,
                isLoggedIn: false,
                token: null,
                userEmail: null
            }
        });
        localStorage.removeItem('token');
        localStorage.removeItem('userEmail');
    }

    return (
        <AuthContext.Provider value={{
            isLoggedIn: authState.isLoggedIn,
            userEmail: authState.userEmail,
            token: authState.token,
            onLogin: loginHandler,
            onLogout: logoutHandler
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;