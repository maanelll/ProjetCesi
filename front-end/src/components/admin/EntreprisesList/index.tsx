import { useEffect, useState, useContext } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Rating,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
import { DataGrid, GridCellParams, GridColDef } from "@mui/x-data-grid";
import { Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { IEntreprise, ILocalite } from "../../../types";
import AuthContext from "../../../config/authContext";
import { SNACKBAR_MESSAGES } from "../../../config/constants";
import { useSnackbar } from "../../../context/SnackBarContext";
import { styled } from "@mui/system";
import React from "react";

const EntreprisesList: React.FC = () => {
  const navigate = useNavigate();
  const showSnackbar = useSnackbar();
  const { token, role, loggedUser } = useContext(AuthContext);
  const [entreprise, setEntreprise] = useState<IEntreprise[]>([]);
  const [searchValue, setSearchValue] = useState("");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const StyledHeaderCell = styled("div")`
    font-size: 16px;
    font-weight: bold;
    text-align: "center";
  `;
  const userId = loggedUser?.id;
  useEffect(() => {
    // Check if loggedUser is available
    if (loggedUser) {
      const userId = loggedUser.id;
      axios
        .get(`http://localhost:8000/api/entreprise`, config)
        .then(async (response) => {
          const entreprises = response.data;
          // If userId is undefined, skip rating fetch
          if (userId !== undefined) {
            const ratingPromises = entreprises.map((entreprise: { id: any }) =>
              fetchRating(entreprise.id, userId)
            );
            const ratings = await Promise.all(ratingPromises);
            for (let i = 0; i < entreprises.length; i++) {
              entreprises[i].conf_pilote = ratings[i]; // Make sure to adjust this according to how your rating data is structured
            }
          }
          setEntreprise(entreprises);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [loggedUser]);

  const fetchRating = async (entrepriseId: any, userId: any) => {
    const response = await axios.get(
      `http://localhost:8000/api/note/entreprise/${entrepriseId}/user/${userId}`,
      config
    );
    return response.data;
  };

  const handleDeleteEntrepriseClick = (entrepriseId: number) => {
    axios
      .delete(`http://localhost:8000/api/entreprise/${entrepriseId}`, config)
      .then(() => {
        setEntreprise((prevState) =>
          prevState.filter((ent) => ent.id !== entrepriseId)
        );
        showSnackbar("success", SNACKBAR_MESSAGES.success.axios.delete);
      })
      .catch(() => {
        showSnackbar("error", SNACKBAR_MESSAGES.error.axios.delete);
      });
  };
  const handleEditEntrepriseClick = (entrepriseId: number) => {
    navigate(`/admin/entreprises/${entrepriseId}/edit`);
  };

  const filterEntreprise = (entreprise: IEntreprise[]) => {
    if (searchValue.trim() === "") {
      return entreprise;
    }

    return entreprise.filter(
      (ent) =>
        ent.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        ent.activity_area.toLowerCase().includes(searchValue.toLowerCase())
    );
  };

  const formatLocalites = (localities: ILocalite[]) => {
    return localities
      .map((localite) => {
        const { adress, code_postal, city } = localite;
        return `${adress}, ${code_postal} ${city}`;
      })
      .join(", ");
  };
  const handleRatingChange = (newValue: number, entrepriseId: number) => {
    axios
      .post(
        `http://localhost:8000/api/note`,
        {
          rating: newValue,
          userId,
          entrepriseId,
        },
        config
      )
      .then(() => {
        // After successfully updating the note, fetch the updated entreprise
        return axios.get(
          `http://localhost:8000/api/entreprise/${entrepriseId}`,
          config
        );
      })
      .then((response) => {
        // Use the updated data from the response to update the state
        const updatedEntreprise = response.data;

        setEntreprise((prevState) =>
          prevState.map((ent) => {
            if (ent.id === entrepriseId) {
              return updatedEntreprise;
            } else {
              return ent;
            }
          })
        );
      })
      .catch((error) => {
        console.error("Error updating rating:", error);
      });
  };
  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Nom",
      width: 100,
      renderHeader: (params) => (
        <StyledHeaderCell>{params.colDef.headerName}</StyledHeaderCell>
      ),
    },
    {
      field: "localities",
      headerName: "Localités",
      width: 200,
      renderCell: (params) => (
        <Typography>{formatLocalites(params.row.localities)}</Typography>
      ),
      renderHeader: (params) => (
        <StyledHeaderCell>{params.colDef.headerName}</StyledHeaderCell>
      ),
    },
    {
      field: "activity_area",
      headerName: "Secteur d'activité",
      width: 200,
      renderHeader: (params) => (
        <StyledHeaderCell>{params.colDef.headerName}</StyledHeaderCell>
      ),
    },
    {
      field: "nb_cesi",
      headerName: "Nb de Stagiaire",
      width: 150,
      renderHeader: (params) => (
        <StyledHeaderCell>{params.colDef.headerName}</StyledHeaderCell>
      ),
    },
    {
      field: "conf_pilote",
      headerName: "Confiance de pilote de promo",
      width: 200,
      renderCell: (params) => {
        // Find the rating for the current user in the rating array
        const ratingObject = params.row.rating.find(
          (r: { userId: number | undefined }) => r.userId === userId
        );
        const rating = ratingObject ? ratingObject.rating : 0;

        return (
          <Rating
            name={`rating-${params.row.id}`}
            value={rating} // Use the rating value
            readOnly={role !== "ROLE_PILOTE"}
            onChange={(event, newValue) => {
              console.log("here", params.row.id);
              if (newValue !== null) {
                handleRatingChange(newValue, params.row.id);
              }
            }}
          />
        );
      },
      renderHeader: (params) => (
        <StyledHeaderCell>{params.colDef.headerName}</StyledHeaderCell>
      ),
    },

    {
      field: "eval_stag",
      headerName: "Evaluation des stagiaires",
      width: 215,
      renderCell: (params) => (
        <Rating
          name={`rating-${params.row.id}`}
          value={params.value}
          readOnly
        />
      ),
      renderHeader: (params) => (
        <StyledHeaderCell>{params.colDef.headerName}</StyledHeaderCell>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params: GridCellParams) => {
        const handleButtonClick = (entrepriseId: number) => {
          navigate(`/admin/entreprises/${entrepriseId}/addOffreStageForm`);
        };

        return (
          <>
            <Button
              variant="contained"
              onClick={() => handleButtonClick(params.row.id)}
            >
              stage
            </Button>
            <Button
              variant="contained"
              onClick={() => handleDeleteEntrepriseClick(params.row.id)}
            >
              delete
            </Button>
            <Button
              variant="contained"
              onClick={() => handleEditEntrepriseClick(params.row.id)}
            >
              edit
            </Button>
          </>
        );
      },
      renderHeader: (params) => (
        <StyledHeaderCell>{params.colDef.headerName}</StyledHeaderCell>
      ),
    },
  ];

  return (
    <>
      <Box sx={{ p: 2, marginLeft: "10px" }}>
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
          <DataGrid<IEntreprise>
            rows={filterEntreprise(entreprise)}
            columns={columns}
            autoPageSize
            getRowId={(row) => row.id}
          />
        </div>
      </Box>
    </>
  );
};

export default EntreprisesList;
