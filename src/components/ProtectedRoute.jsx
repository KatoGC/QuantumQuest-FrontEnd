/* eslint-disable react/prop-types */
import { Navigate, useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { CircularProgress, Box } from "@mui/material";

const ProtectedRoute = ({
    children,
    requireVerification = true,
    roles = [],
    checkPermissions,
}) => {
    const { user, loading, isAuthenticated } = useAuth();
    const location = useLocation();
    const params = useParams();
    const [hasPermission, setHasPermission] = useState(true);

    useEffect(() => {
        const validatePermissions = async () => {
            if (checkPermissions) {
                const permitted = await checkPermissions(params);
                setHasPermission(permitted);
            }
        };
        validatePermissions();
    }, [params, checkPermissions]);

    if (loading)
        return (
            <Box display="flex" justifyContent="center">
                <CircularProgress />
            </Box>
        );

    if (!isAuthenticated)
        return <Navigate to="/login" state={{ from: location }} replace />;

    if (requireVerification && !user.isVerified) {
        return (
            <Navigate
                to="/verify-email-notice"
                state={{ email: user.email }}
                replace
            />
        );
    }

    if (roles.length > 0 && !roles.includes(user.role)) {
        return <Navigate to="/" replace />;
    }

    if (!hasPermission) return <Navigate to="/" replace />;

    return children;
};

export default ProtectedRoute;
