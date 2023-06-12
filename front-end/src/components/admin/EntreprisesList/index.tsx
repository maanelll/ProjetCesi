import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Box, Button, Rating, Typography } from "@mui/material";
import { DataGrid, GridCellParams, GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { IEntreprise, ILocalite } from "../../../types";
import AuthContext from "../../../config/authContext";


const EntreprisesList: React.FC = () => {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const [entreprise, setEntreprise] = useState<IEntreprise[]>([]);
  const config = {
    headers: {
      Authorization: `Bearer ${token}` 
    }
  };
  const handleDeleteEntrepriseClick = (entrepriseId: number) => {
    axios.delete(`http://localhost:8000/api/entreprise/${entrepriseId}`, config)
      .then(()=>
        window.location.reload()
      )
      .catch((error) => {
      console.error("Error deleting", error)
    })
  };
  const handleEditEntrepriseClick = (entrepriseId: number) => {
    navigate(`/admin/entreprises/${entrepriseId}/edit`)
  };
  useEffect(() => {
  axios.get(`http://localhost:8000/api/entreprise`,config)
    .then(response => {
      setEntreprise(response.data);
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    });
  }, []);
  // const formatLocalites = (localite: ILocalite[]) => {
  //   return localite.map((localite) => localite.nom).join(", ");
  // };

const columns: GridColDef[] = [
  { field: "name", headerName: "Nom", width: 100 },
  {
      field: "localite",
      headerName: "Localités",
      width: 200,
      // renderCell: (params) => <Typography>{formatLocalites(params.row.localites)}</Typography>,
    },
  { field: "activity_area", headerName: "Secteur d'activité", width: 200 },
  { field: "nb_cesi", headerName: "Nombre de Stagiaire", width: 150 },
  {
    field: "eval_stag",
    headerName: "Evaluation des stagiaires",
    width: 200,
    renderCell: (params) => (
      <Rating name={`rating-${params.row.id}`} value={params.value} readOnly  />
      ),
    },
    {
      field: "conf_pilote",
      headerName: "Confiance de pilote de promo",
      width: 200,
      renderCell: (params) => (
        <Rating
          name={`rating-${params.row.id}`}
          value={params.value}
          readOnly
        />
      ),
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 300,
    renderCell: (params: GridCellParams) => {
      const handleButtonClick = (entrepriseId:number) => {
        navigate(`/admin/entreprises/${entrepriseId}/addOffreStageForm`)
      };

      return (
        <>
        <Button variant="contained" onClick={()=>handleButtonClick(params.row.id)}>
          stage
        </Button>
          <Button variant="contained" onClick={() => handleDeleteEntrepriseClick(params.row.id)}>
          delete
        </Button>
        <Button variant="contained" onClick={() => handleEditEntrepriseClick(params.row.id)}>
          edit
        </Button>
        </>
      );
    },
  },
];
    return (
        <>
      <Box sx={{ p: 3 , marginLeft: "20px" }}>
        <Typography variant="h5" sx={{ mb: 3 }}>
          Liste des entreprises
        </Typography>
        <div style={{ height: 300, width: "100%" }}>
          <DataGrid<IEntreprise> rows={entreprise} columns={columns} autoPageSize getRowId={(row) => row.id} />
        </div>
      </Box>
    </>
  );
};

export default EntreprisesList;