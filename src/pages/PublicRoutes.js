import { useContext } from "react";
import AuthContext from "../store/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoutes = () => {
    const authCtx = useContext(AuthContext);

    if (authCtx.isLoggedIn) {
        return <Navigate to='/candies' replace />
    }
    return (
        <Outlet />
    )
}

export default PublicRoutes;