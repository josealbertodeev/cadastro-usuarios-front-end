import {createHashRouter} from "react-router"
import Home from "./pages/Home"
import ListUsers from "./pages/ListUsers"

const router = createHashRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/Lista-de-usuarios",
        element: <ListUsers />
    }
])

export default router