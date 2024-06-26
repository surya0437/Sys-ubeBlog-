import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import DefaultLayout from "./views/DefaultLayout";
import Login from "./views/Login";
import Register from "./views/Register";
import Dashboard from "./views/Dashboard";
import AddBlog from "./views/AddBlog";
import EditBlog from "./views/EditBlog";
import ReadBlog from "./views/ReadBlog";

import Auth from "./Auth";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />
    },
    {
        path: '/Login',
        element: <Login />
    },
    {
        path: '/Register',
        element: <Register />
    },
    {
        path: '/ReadBlog/:id',
        element: <ReadBlog />
    },
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/Dashboard',
                element: <Auth><Dashboard /></Auth>
            },
            {
                path: '/AddBlog',
                element: <Auth><AddBlog /></Auth>

            },
            {
                path: '/EditBlog/:id',
                element: <Auth><EditBlog /></Auth>

            },
            
        ]
    },
])

export default router;