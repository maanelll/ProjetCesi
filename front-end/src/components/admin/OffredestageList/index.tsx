import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid, GridCellParams, GridColDef } from "@mui/x-data-grid";
import { IOffrestage } from "../../../types";
import { Search } from "@mui/icons-material";
import AuthContext from "../../../config/authContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useSnackbar } from "../../../context/SnackBarContext";
import { SNACKBAR_MESSAGES } from "../../../config/constants";
import { useNavigate } from "react-router-dom";

const OffredestageList: React.FC = () => {
  const { token } = useContext(AuthContext);
  const [offreStage, setOffreStage] = useState<IOffrestage[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const navigate = useNavigate();

  const showSnackbar = useSnackbar();

  const handleDeleteOffreClick = (offreId: number) => {
    axios
      .delete(`http://localhost:8000/api/offrestage/${offreId}`, config)
      .then(() => {
        setOffreStage((prevState) =>
          prevState.filter((ent) => ent.id !== offreId)
        );
        showSnackbar("success", SNACKBAR_MESSAGES.success.axios.delete);
      })
      .catch(() => {
        showSnackbar("error", SNACKBAR_MESSAGES.error.axios.delete);
      });
  };
  const handleEditOffreClick = (offreId: number) => {
    navigate(`/admin/offrestages/${offreId}/edit`);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/offrestage`, config)
      .then((response) => {
        setOffreStage(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const filterOffre = (offre: IOffrestage[]) => {
    if (searchValue.trim() === "") {
      return offre;
    }

    return offre.filter((ent) =>
      ent.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "offre de stage ", width: 100 },

    { field: "internship_duration", headerName: "durée de stage", width: 150 },

    {
      field: "nb_places_offered",
      headerName: "nombre de place offert",
      width: 200,
    },
    {
      field: "competence",
      headerName: "competences",
      width: 200,
    },

    {
      field: "entreprise_name",
      headerName: "entreprise",
      width: 200,
    },

    {
      field: "localite",
      headerName: "localité",
      width: 200,
    },
    {
      field: "promotion",
      headerName: "promotion",
      width: 200,
    },
    {
      field: "offer_date",
      headerName: "date de début de stage",
      width: 200,
    },
    {
      field: "compensation_basis",
      headerName: "rénumération",
      width: 200,
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 300,
      renderCell: (params: GridCellParams) => {
        return (
          <>
            <Button
              variant="contained"
              onClick={() => handleDeleteOffreClick(params.row.id)}
            >
              delete
            </Button>
            <Button
              variant="contained"
              onClick={() => handleEditOffreClick(params.row.id)}
            >
              edit
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <>
      <Box sx={{ p: 3, marginLeft: "10px" }}>
        <Typography variant="h5" sx={{ mb: 3 }}>
          Liste des offres de stages
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
          <DataGrid<IOffrestage>
            rows={filterOffre(offreStage)}
            columns={columns}
            autoPageSize
            getRowId={(row) => row.id}
          />
        </div>
      </Box>
    </>
  );
};
export default OffredestageList;
