import { useRoutes } from "react-router-dom"
import { Suspense, lazy } from "react"

const Dashboard = lazy(() => import("../pages/Dashboard"))
const Login = lazy(()=> import("../pages/Login"))
const Entreprises = lazy(() => import("../pages/admin/entreprises"))
const CreateEntreprise = lazy(() => import("../pages/admin/entreprises/create"))
const EditEntreprise = lazy(()=> import("../pages/admin/entreprises/[id]/editEntreprise"))
const AddOffreStageForm = lazy(() => import("../pages/admin/entreprises/[id]/addOffreStageForm"))
const Etudiants = lazy(() => import("../pages/admin/etudiants"))


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
            path: "/admin/etudiants",
            element: <Etudiants/>
        }
        
    ])
    return <Suspense fallback={<div>Loading...</div>}>{element}</Suspense>
}

export default AppRoutes