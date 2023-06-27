import { Suspense, lazy, useContext } from "react";
import { useRoutes } from "react-router-dom";
import AuthContext from "./authContext";

const Dashboard = lazy(() => import("../pages/Dashboard"));
const Login = lazy(() => import("../pages/Login"));
const Entreprises = lazy(() => import("../pages/admin/entreprises"));
const CreateEntreprise = lazy(
  () => import("../pages/admin/entreprises/create")
);
const EditEntreprise = lazy(
  () => import("../pages/admin/entreprises/[id]/editEntreprise")
);
const AddOffreStageForm = lazy(
  () => import("../pages/admin/entreprises/[id]/addOffreStageForm")
);
const Users = lazy(() => import("../pages/admin/users"));
const EditUser = lazy(() => import("../pages/admin/users/[id]/editUser"));
const CreateUser = lazy(() => import("../pages/admin/users/create"));
const Internship = lazy(() => import("../pages/Internship"));
const WishList = lazy(() => import("../pages/WishList"));

const OffreStages = lazy(() => import("../pages/admin/offreStages"));
const EditOffreStage = lazy(
  () => import("../pages/admin/offreStages/[id]/editOffreStage")
);
const AppRoutes = () => {
  const element = useRoutes([
    {
      path: "/",
      element: <Dashboard />,
    },
    {
      path: "signIn",
      element: <Login />,
    },
    {
      path: "/internships",
      element: <Internship />,
    },
    {
      path: "/wishList",
      element: <WishList />,
    },
    {
      path: "signIn",
      element: <Login />,
    },
    {
      path: "/admin/entreprises",
      element: <Entreprises />,
    },
    {
      path: "/admin/entreprises/:entrepriseId/edit",
      element: <EditEntreprise />,
    },
    {
      path: "/admin/entreprises/create",
      element: <CreateEntreprise isEditMode={false} />,
    },
    {
      path: "/admin/entreprises/:entrepriseId/addOffreStageForm",
      element: <AddOffreStageForm isEditMode={false} />,
    },

    {
      path: "/admin/users",
      element: <Users />,
    },
    {
      path: "/admin/users/:userId/edit",
      element: <EditUser />,
    },
    {
      path: "/admin/users/create",
      element: <CreateUser isEditMode={false} />,
    },
    {
      path: "/admin/offreStages",
      element: <OffreStages />,
    },
    {
      path: "/admin/offreStages/:offreStageId/edit",
      element: <EditOffreStage />,
    },
  ]);
  return <Suspense fallback={<div>Loading...</div>}>{element}</Suspense>;
};

export default AppRoutes;
