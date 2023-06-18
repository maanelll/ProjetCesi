import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Box, Button, Rating, Typography,TextField, InputAdornment} from "@mui/material";
import { DataGrid, GridCellParams, GridColDef } from "@mui/x-data-grid";
import { Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { IEntreprise, ILocalite } from "../../../types";
import AuthContext from "../../../config/authContext";
import { SNACKBAR_MESSAGES } from "../../../config/constants";
import { useSnackbar } from "../../../context/SnackBarContext";


const EntreprisesList: React.FC = () => {
  const navigate = useNavigate();
  const showSnackbar = useSnackbar();
  const { token } = useContext(AuthContext);
  const [entreprise, setEntreprise] = useState<IEntreprise[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const config = {
    headers: {
      Authorization: `Bearer ${token}` 
    }
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
  
  const handleDeleteEntrepriseClick = (entrepriseId: number) => {
    axios.delete(`http://localhost:8000/api/entreprise/${entrepriseId}`, config)
      .then(() => {
        setEntreprise(prevState => prevState.filter(ent => ent.id !== entrepriseId));
        showSnackbar("success", SNACKBAR_MESSAGES.success.axios.delete);
      })
      .catch(() => {
        showSnackbar("error", SNACKBAR_MESSAGES.error.axios.delete);
    })
  };
  const handleEditEntrepriseClick = (entrepriseId: number) => {
    navigate(`/admin/entreprises/${entrepriseId}/edit`)
  };
  
  const filterEntreprise = (entreprise: IEntreprise[]) => {
  if (searchValue.trim() === "") {
    return entreprise;
  }

  return entreprise.filter((ent) =>
    ent.name.toLowerCase().includes(searchValue.toLowerCase()) ||
    ent.activity_area.toLowerCase().includes(searchValue.toLowerCase())
  );
};

  const formatLocalites = (localities: ILocalite[]) => {
    return localities.map((localite) => {
      const { adress, code_postal, city } = localite;
      return `${adress}, ${code_postal} ${city}`;
    }).join(", ");
  };
const columns: GridColDef[] = [
  { field: "name", headerName: "Nom", width: 100 },
  {
      field: "localities",
      headerName: "Localités",
      width: 300,
      renderCell: (params) => <Typography>{formatLocalites(params.row.localities)}</Typography>,
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
      <Box sx={{ p: 3 , marginLeft: "10px" }}>
        <Typography variant="h5" sx={{ mb: 3 }}>
          Liste des entreprises
        </Typography>
        <TextField
          variant="outlined"
          placeholder="Search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          style={{ marginBottom: "10px" }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        <div style={{ height: 350, width: "100%" }}>
          <DataGrid<IEntreprise> rows={filterEntreprise(entreprise)} columns={columns} autoPageSize getRowId={(row) => row.id} />
        </div>
      </Box>
    </>
  );
};

export default EntreprisesList;