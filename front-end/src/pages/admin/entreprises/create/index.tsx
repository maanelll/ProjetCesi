import { Box, Button, IconButton, Rating, TextField, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IEntreprise, ILocalite } from "../../../../types";
import AuthContext from "../../../../config/authContext";
import DeleteIcon from '@mui/icons-material/Delete';
import { SNACKBAR_MESSAGES } from "../../../../config/constants";
import { useSnackbar } from "../../../../context/SnackBarContext";

interface CreateEntrepriseProps {
  isEditMode: boolean;
  existingEntreprise?: IEntreprise | null;
}

const CreateEntreprise:React.FC<CreateEntrepriseProps>= ({isEditMode,existingEntreprise}) => {
  const navigate = useNavigate();
  const showSnackbar = useSnackbar();
  const { token } = useContext(AuthContext);
  const [entreprise, setEntreprise] = useState<IEntreprise>({
    id: isEditMode ? existingEntreprise?.id || 0 : 0,
    name: isEditMode ? existingEntreprise?.name || "" : "",
    activity_area: isEditMode ? existingEntreprise?.activity_area || "" : "",
    nb_cesi: isEditMode ? existingEntreprise?.nb_cesi || 0 : 0,
    localities: isEditMode ? existingEntreprise?.localities || [] : [],
  });
  const [localiteInput, setLocaliteInput] = useState<ILocalite>({
    id: 0,
    adress: "",
    city: "",
    code_postal: "",
  });

  const handleChangeEntreprise = (e: React.ChangeEvent<HTMLInputElement>) => {
      
    const { name, value } = e.target;
    setEntreprise((prevData) => ({ ...prevData, [name]: value }));
    };
  //   const handleRatingChange = (value: number | null) => {
  //   setFormData((prevData) => ({ ...prevData, confiance: value || 0 }));
  // };

  const handleLocaliteInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocaliteInput((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddLocalite = () => {
    if (
      localiteInput.adress.trim() !== "" &&
      localiteInput.city.trim() !== "" &&
      localiteInput.code_postal.trim() !== ""
    ) {
      const localiteData: ILocalite = {
        id: 0,
        adress: localiteInput.adress.trim(),
        city: localiteInput.city.trim(),
        code_postal: localiteInput.code_postal.trim()
      };

      axios
        .post("http://localhost:8000/api/localite", localiteData, config)
        .then((response) => {
          const newLocalite: ILocalite = {
            id: response.data.localite,
            adress: localiteData.adress,
            city: localiteData.city,
            code_postal: localiteData.code_postal,
          };
          setEntreprise((prevData) => ({
            ...prevData,
            localities: [...prevData.localities, newLocalite],
          }));

          setLocaliteInput({
            id:0,
            adress: "",
            city: "",
            code_postal: "",
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  const handleRemoveLocalite = (localiteId: number) => {
  // Make API request to delete the localite
  axios.delete(`http://localhost:8000/api/localite/${localiteId}`, config)
    .then(() => {
      // Remove the localite from the entreprise state
      setEntreprise((prevData) => ({
        ...prevData,
        localities: prevData.localities.filter((localities) => localities.id !== localiteId)
      }));
    })
    .catch((error) => {
      console.error(error);
    });
};


  const config = {
    headers: {
      Authorization: `Bearer ${token}` 
    }
  };


  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  // Create an array of localite IDs
  const localiteIds = entreprise.localities.map((localites) => localites.id);

  // Create the entreprise data with the associated localite IDs
  const entrepriseData = {
    name: entreprise.name,
    activity_area: entreprise.activity_area,
    nb_cesi: entreprise.nb_cesi,
    localities: localiteIds
  };
  
  if (isEditMode) {
    // Edit mode: Update existing entreprise
    axios.put(`http://localhost:8000/api/entreprise/${entreprise.id}`, entrepriseData, config)
      .then(() => {
        showSnackbar("success", SNACKBAR_MESSAGES.success.axios.patch)
        navigate("/admin/entreprises");
      })
      .catch((error) => {
        showSnackbar("error", SNACKBAR_MESSAGES.error.axios.patch)
      });
  } else {
    // Create mode: Create new entreprise
    axios.post("http://localhost:8000/api/entreprise", entrepriseData, config)
      .then(() => {
        showSnackbar("success", SNACKBAR_MESSAGES.success.axios.post)
        navigate("/admin/entreprises");
      })
      .catch((error) => {
        showSnackbar("error", SNACKBAR_MESSAGES.error.axios.post)
      });
  }
};


    return (
        <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Formulaire de création d'entreprise
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          name="name"
          label="Nom de l'entreprise"
          variant="outlined"
          fullWidth
          margin="normal"
          value={entreprise.name}
          onChange={handleChangeEntreprise}
        />
        <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
          Localités
        </Typography>

        <Box
          sx={{ display: "flex", flexDirection: "row", marginBottom: 2 }}
        >
          <TextField
            name="adress"
            label="Adresse"
            variant="outlined"
            fullWidth
            value={localiteInput.adress}
            onChange={handleLocaliteInputChange}
            margin="normal"
          />
          <TextField
            name="city"
            label="Ville"
            variant="outlined"
            fullWidth
            value={localiteInput.city}
            onChange={handleLocaliteInputChange}
            margin="normal"
          />
          <TextField
            name="code_postal"
            label="Code postal"
            variant="outlined"
            fullWidth
            value={localiteInput.code_postal}
            onChange={handleLocaliteInputChange}
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={handleAddLocalite}>
            Ajouter
          </Button>
        </Box>

        {entreprise.localities.map((localities: ILocalite, index: number) => (
          
          <Box
            key={localities.id}
            sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}
          >
            <Typography>
              {localities.adress}, {localities.city}, {localities.code_postal}
            </Typography>
            <IconButton onClick={() => handleRemoveLocalite(localities.id)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
        <TextField
          name="activity_area"
          label="Secteur d'activité"
          variant="outlined"
          fullWidth
          margin="normal"
          value={entreprise.activity_area}
          onChange={handleChangeEntreprise}
        />

        <TextField
          name="nb_cesi"
          label="Nombre de stagiaires CESI"
          type="number"
          variant="outlined"
          fullWidth
          margin="normal"
          value={entreprise.nb_cesi}
          onChange={handleChangeEntreprise}
        />

        {/* <Box sx={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
          <Typography sx={{ marginRight: "8px" }}>Confiance de pilote de promotion:</Typography>
          <Rating
            name="confiance"
            value={formData.confiance}
            onChange={(event, newValue) => handleRatingChange(newValue)}
          />
        </Box> */}

        <Button type="submit" variant="contained" color="primary">
            <Typography sx={{color:"black",fontFamily:"arial"}}>Enregistrer</Typography>
        </Button>
      </form>
    </Box>
    );
};

export default CreateEntreprise;