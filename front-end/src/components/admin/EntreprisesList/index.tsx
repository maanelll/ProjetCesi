import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Box, Rating, Typography,TextField, InputAdornment, IconButton} from "@mui/material";
import { DataGrid, GridCellParams, GridColDef } from "@mui/x-data-grid";
import { Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { IEntreprise, ILocalite } from "../../../types";
import AuthContext from "../../../config/authContext";
import { SNACKBAR_MESSAGES } from "../../../config/constants";
import { useSnackbar } from "../../../context/SnackBarContext";
import { styled } from "@mui/system";
import { EditOutlined as EditIcon, DeleteOutline as DeleteIcon } from "@mui/icons-material";
import AddIcon from '@mui/icons-material/Add';

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
  const StyledHeaderCell = styled("div")`
  font-size: 16px; 
  font-weight: bold;
  text-align: "center";
`;

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
  return (
    <ul style={{ listStyleType: "none", padding: 0 }}>
      {localities.map((localite) => {
        const { adress, code_postal, city } = localite;
        const addressString: string = `${adress}, ${code_postal} ${city}`;
        return <li key={addressString}>{addressString}</li>;
      })}
    </ul>
  );
};
const columns: GridColDef[] = [
  { field: "name", headerName: "Nom", width: 100, renderHeader: (params) => <StyledHeaderCell>{params.colDef.headerName}</StyledHeaderCell>},
  {
      field: "localities",
      headerName: "Localités",
      width: 300,
      renderCell: (params) => <Typography>{formatLocalites(params.row.localities)}</Typography>,
      renderHeader: (params) => <StyledHeaderCell >{params.colDef.headerName}</StyledHeaderCell>
    },
  { field: "activity_area", headerName: "Secteur d'activité", width: 200, renderHeader: (params) => <StyledHeaderCell>{params.colDef.headerName}</StyledHeaderCell> },
  { field: "nb_cesi", headerName: "Nb de Stagiaire", width: 150,renderHeader: (params) => <StyledHeaderCell>{params.colDef.headerName}</StyledHeaderCell> },
  {
    field: "eval_stag",
    headerName: "Evaluation des stagiaires",
    width: 200,
    renderCell: (params) => (
      <Rating name={`rating-${params.row.id}`} value={params.value} readOnly  />
      ),
    renderHeader: (params) => <StyledHeaderCell>{params.colDef.headerName}</StyledHeaderCell>
    },
    {
      field: "conf_pilote",
      headerName: "Confiance de pilote",
      width: 150,
      renderCell: (params) => (
        <Rating
          name={`rating-${params.row.id}`}
          value={params.value}
          readOnly
        />
      ),
      renderHeader: (params) => <StyledHeaderCell>{params.colDef.headerName}</StyledHeaderCell>
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 200,
    renderCell: (params: GridCellParams) => {
      const handleButtonClick = (entrepriseId:number) => {
        navigate(`/admin/entreprises/${entrepriseId}/addOffreStageForm`)
      };

      return (
        <>
        <IconButton size="small"color="secondary" onClick={()=>handleButtonClick(params.row.id)}>
          < AddIcon/>
        </IconButton>
          <IconButton size="small"color="secondary" onClick={() => handleDeleteEntrepriseClick(params.row.id)}>
          <DeleteIcon />
        </IconButton>
        <IconButton size="small"color="secondary" onClick={() => handleEditEntrepriseClick(params.row.id)}>
          <EditIcon/>
        </IconButton>
        </>
      );
    },
    renderHeader: (params) => <StyledHeaderCell>{params.colDef.headerName}</StyledHeaderCell>
  },
];
    return (
        <>
      <Box sx={{ p: 2 , marginLeft: "10px" }}>
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