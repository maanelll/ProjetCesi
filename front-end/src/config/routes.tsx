import { useRoutes } from "react-router-dom";
import { Suspense, lazy, useContext } from "react";
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
const Etudiants = lazy(() => import("../pages/admin/etudiants"));
const EditEtudiant = lazy(
  () => import("../pages/admin/etudiants/[id]/editEtudiant")
);
const CreateEtudiant = lazy(() => import("../pages/admin/etudiants/create"));
const OffreStages = lazy(() => import("../pages/admin/offreStages"));

const AppRoutes = () => {
  const { role } = useContext(AuthContext);
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
      element: <AddOffreStageForm />,
    },
    {
      path: "/admin/etudiants",
      element: <Etudiants />,
    },
    {
      path: "/admin/etudiants/:etudiantId/edit",
      element: <EditEtudiant />,
    },
    {
      path: "/admin/etudiants/create",
      element: <CreateEtudiant isEditMode={false} />,
    },
    {
      path: "/admin/offreStages",
      element: <OffreStages />,
    },
  ]);
  return <Suspense fallback={<div>Loading...</div>}>{element}</Suspense>;
};

export default AppRoutes;
