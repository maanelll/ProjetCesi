import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Box, Button, Rating, Typography } from "@mui/material";
import { DataGrid, GridCellParams, GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { IEtudiant} from "../../../types";
import AuthContext from "../../../config/authContext";


const EtudiantsList: React.FC = () => {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const [etudiant, setEtudiant] = useState<IEtudiant[]>([]);
  const config = {
    headers: {
      Authorization: `Bearer ${token}` 
    }
  };
  const handleDeleteEtudiantClick = (etudiantId: number) => {
    axios.delete(`http://localhost:8000/api/delete_etudiant/${etudiantId}`, config)
      .then(()=>
        window.location.reload()
      )
      .catch((error) => {
      console.error("Error deleting", error)
    })
  };
  const handleEditEtudiantClick = (etudiantId: number) => {
    navigate(`/admin/etudiants/${etudiantId}/edit`)
  };
  useEffect(() => {
  axios.get(`http://localhost:8000/api/etudiants`,config)
    .then(response => {
      setEtudiant(response.data);
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    });
  }, []);

const columns: GridColDef[] = [
  { field: "nom", headerName: "Nom", width: 100 },
  { field: "prenom", headerName: "prenom", width: 200 },
  { field: "centre", headerName: "centre", width: 150 },
  { field: "promotion", headerName: "promotion", width: 150 },
 
  {
    field: "actions",
    headerName: "Actions",
    width: 300,
    renderCell: (params: GridCellParams) => {
      return (
        <>
          <Button variant="contained" onClick={() => handleDeleteEtudiantClick(params.row.id)}>
          delete
        </Button>
        <Button variant="contained" onClick={() => handleEditEtudiantClick(params.row.id)}>
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
          Liste des etudiants
        </Typography>
        <div style={{ height: 300, width: "100%" }}>
          <DataGrid<IEtudiant> rows={etudiant} columns={columns} autoPageSize getRowId={(row) => row.id} />
        </div>
      </Box>
    </>
  );
};

export default EtudiantsList;