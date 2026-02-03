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

    const loginHandler = async (email, password) => {
        try {
            const response = await fetch(
                process.env.REACT_APP_LOGIN_API_URL,
                {
                    method: 'POST',
                    body: JSON.stringify({
                        email,
                        password
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error.message || 'Login failed');
            }
            setAuthState(prevState => {
                return {
                    ...prevState,
                    isLoggedIn: true,
                    token: data.tokenId,
                    userEmail: email
                }
            });
            localStorage.setItem('token', data.tokenId);
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