import { useContext } from "react";
import AuthContext from "../store/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
    const authCtx = useContext(AuthContext);

    if (!authCtx.isLoggedIn) {
        return <Navigate to='/auth' replace />
    }

    return <Outlet />
}

export default ProtectedRoutes;