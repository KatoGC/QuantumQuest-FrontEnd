import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CssBaseline, Box } from "@mui/material";
import { AuthProvider } from "./context/AuthContext";
import { checkCoursePermissions } from "./utils/permissions";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CoursesDetails";
import CreateCourse from "./pages/CreateCourse";
import CourseEditContainer from "./components/CourseEditContainer";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import EmailVerification from "./pages/EmailVerification";
import VerifyEmailNotice from "./pages/VerifyEmailNoticePage";
import ProtectedRoute from "./components/ProtectedRoute";
import CategoriesView from "./pages/CategoriesView";
import CategoryDetail from "./pages/CategoryDetail";

import Dashboard from "./pages/Dashboard";

function App() {
    return (
        <AuthProvider>
            <Router>
                <CssBaseline />
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        minHeight: "100vh",
                    }}
                >
                    <Navbar />
                    <Box component="main" sx={{ flexGrow: 1, width: "100%" }}>
                        <Routes>
                            {/* Rutas públicas */}
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<SignUp />} />
                            <Route path="/courses" element={<Courses />} />

                            <Route
                                path="/verify-email/:token"
                                element={<EmailVerification />}
                            />

                            <Route
                                path="/verify-email-notice"
                                element={<VerifyEmailNotice />}
                            />

                            {/* Rutas protegidas que requieren verificación */}
                            <Route
                                path="/profile"
                                element={
                                    <ProtectedRoute requireVerification={true}>
                                        <Profile />
                                    </ProtectedRoute>
                                }
                            />

                            <Route
                                path="/dashboard"
                                element={
                                    <ProtectedRoute requireVerification={true}>
                                        <Dashboard />
                                    </ProtectedRoute>
                                }
                            />

                            <Route
                                path="/courses/:id"
                                element={
                                    <ProtectedRoute requireVerification={true}>
                                        <CourseDetail />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/courses/create"
                                element={
                                    <ProtectedRoute
                                        requireVerification={true}
                                        allowedRoles={["teacher", "admin"]}
                                    >
                                        <CreateCourse />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/courses/:id/edit"
                                element={
                                    <ProtectedRoute
                                        roles={["teacher", "admin"]}
                                        checkPermissions={(params) =>
                                            checkCoursePermissions(params.id)
                                        }
                                    >
                                        <CourseEditContainer />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/categories"
                                element={
                                    <ProtectedRoute requireVerification={true}>
                                        <CategoriesView />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/categories/:id"
                                element={
                                    <ProtectedRoute>
                                        <CategoryDetail />
                                    </ProtectedRoute>
                                }
                            />
                        </Routes>
                    </Box>
                </Box>
            </Router>
        </AuthProvider>
    );
}

export default App;
