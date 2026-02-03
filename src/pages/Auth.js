import { useContext, useRef, useState } from "react";
import AuthContext from "../store/AuthContext";

import "./Auth.css";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Auth = () => {
    const [isLoading, setIsLoading] = useState(false);
    const emailRef = useRef();
    const passRef = useRef();

    const authCtx = useContext(AuthContext);

    const navigate = useNavigate();

    const submitHandler = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            const email = emailRef.current.value;
            const password = passRef.current.value;

            const response = await fetch(
                `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_API_KEY}`,
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

            authCtx.onLogin(email, data.idToken);
            emailRef.current.value = '';
            passRef.current.value = '';
            navigate('/candies', { replace: true });
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <form className="auth-form">
            <div className="form-item">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" required ref={emailRef} />
            </div>
            <div className="form-item">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" required ref={passRef} />
            </div>
            <div className="form-actions">
                <button onClick={submitHandler}>
                    { isLoading ? <Spinner animation="border" size="sm" /> : 'Login'}
                </button>
            </div>
        </form>
    )
}

export default Auth;