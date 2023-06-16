import { useRoutes } from "react-router-dom"
import { Suspense, lazy } from "react"

const Dashboard = lazy(() => import("../pages/Dashboard"))
const Login = lazy(()=> import("../pages/Login"))
const Entreprises = lazy(() => import("../pages/admin/entreprises"))
const CreateEntreprise = lazy(() => import("../pages/admin/entreprises/create"))
const EditEntreprise = lazy(()=> import("../pages/admin/entreprises/[id]/editEntreprise"))
const AddOffreStageForm = lazy(() => import("../pages/admin/entreprises/[id]/addOffreStageForm"))
const Users = lazy(() => import("../pages/admin/users"))
const  EditUser = lazy(()=> import("../pages/admin/users/[id]/editUser"))
const CreateUser = lazy(() => import("../pages/admin/users/create"))


const AppRoutes = () => {
    const element = useRoutes([
        {
        path: "/",
        element: <Dashboard />,
        },
        {
            path :"signIn",
        element: <Login/>
        },
        {
            path: "/admin/entreprises",
            element: <Entreprises/>
        },
        {
            path: "/admin/entreprises/:entrepriseId/edit",
            element: <EditEntreprise/>
            
        },
        {
            path: "/admin/entreprises/create",
            element: <CreateEntreprise isEditMode={false}/>
        },
        {
            path: "/admin/entreprises/:entrepriseId/addOffreStageForm",
            element: <AddOffreStageForm/>
        },
        {
            path: "/admin/users",
            element: <Users/>
        },
           {
            path: "/admin/users/:userId/edit",
            element: <EditUser/>
        },
        {
            path: "/admin/users/create",
            element: <CreateUser isEditMode={false}/>
        }
        
    ])
    return <Suspense fallback={<div>Loading...</div>}>{element}</Suspense>
}

export default AppRoutes