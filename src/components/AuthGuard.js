import { Navigate } from "react-router-dom";
export const GuardedRoute = ({ children }) => {
    let token = JSON.parse(localStorage.getItem("auth"));
    const authed = token ? true : false;
    return authed ? children : <Navigate to="/signin" />;
}