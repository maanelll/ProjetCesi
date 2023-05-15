import { useRoutes } from "react-router-dom"
import { Suspense, lazy } from "react"

const Login = lazy(()=> import("../pages/Login"))
const SignUp = lazy(()=> import("../pages/SignUp"))

const AppRoutes = () => {
    const element = useRoutes([
        {
            path :"/",
        element: <Login/>
        },
        {
            path :"SignIn",
        element: <Login/>
        },
        {
            path :"SignUp",
        element: <SignUp/>
        }
        
    ])
    return <Suspense fallback={<div>Loading...</div>}>{element}</Suspense>
}

export default AppRoutes