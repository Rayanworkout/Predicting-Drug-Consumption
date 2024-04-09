import {createBrowserRouter, RouterProvider} from "react-router-dom";
import App from "@/App.jsx";
import Dashboard from "@/view/Dashboard.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />
    },
    {
        path: '/statistics',
        element: <Dashboard />
    }
]);

function Router() {
    return <RouterProvider router={router} />;
}

export default Router;