import { Box, Button, IconButton, Rating, TextField, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IEntreprise, ILocalite } from "../../../../types";
import AuthContext from "../../../../config/AuthContext";
import DeleteIcon from '@mui/icons-material/Delete';


interface CreateEntrepriseProps {
  isEditMode: boolean;
  existingEntreprise?: IEntreprise;
}

const CreateEntreprise:React.FC<CreateEntrepriseProps>= ({isEditMode,existingEntreprise}) => {
  const navigate = useNavigate()
  const { token } = useContext(AuthContext);
  const [entreprise, setEntreprise] = useState<IEntreprise>({
    id: isEditMode ? existingEntreprise?.id || 0 : 0,
    nom: isEditMode ? existingEntreprise?.nom || "" : "",
    secteur_act: isEditMode ? existingEntreprise?.secteur_act || "" : "",
    nb_stage_cesi: isEditMode ? existingEntreprise?.nb_stage_cesi || 0 : 0,
    localite: isEditMode ? existingEntreprise?.localite || [] : [],
  });
  const [localiteInput, setLocaliteInput] = useState("");

  const handleChangeEntreprise = (e: React.ChangeEvent<HTMLInputElement>) => {
      
    const { name, value } = e.target;
    setEntreprise((prevData) => ({ ...prevData, [name]: value }));
    };
  //   const handleRatingChange = (value: number | null) => {
  //   setFormData((prevData) => ({ ...prevData, confiance: value || 0 }));
  // };

  const handleLocaliteInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setLocaliteInput(e.target.value);
  };

  const handleAddLocalite = () => {
  if (localiteInput.trim() !== "") {
    const localiteData = {
      name: localiteInput.trim()
    };

    axios.post("http://localhost:8000/api/localite", localiteData, config)
      .then((response) => {
        const newLocalite = {
          id: response.data.localite,
          name: localiteData.name
        };
        setEntreprise((prevData) => {
          const updatedLocalites = [...prevData.localite, newLocalite];
          return {
            ...prevData,
            localite: updatedLocalites
          };
        });

        setLocaliteInput(""); 
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
        localite: prevData.localite.filter((localite) => localite.id !== localiteId)
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
  const localiteIds = entreprise.localite.map((localite) => localite.id);

  // Create the entreprise data with the associated localite IDs
  const entrepriseData = {
    nom: entreprise.nom,
    secteur_act: entreprise.secteur_act,
    nb_stage_cesi: entreprise.nb_stage_cesi,
    localite: localiteIds
  };

  // Post the entreprise data
  axios.post("http://localhost:8000/api/entreprise", entrepriseData, config)
    .then(() => {
      navigate("/admin/entreprises");
    })
    .catch((error) => {
      console.error(error);
    });
};


    return (
        <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Formulaire de création d'entreprise
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          name="nom"
          label="Nom de l'entreprise"
          variant="outlined"
          fullWidth
          margin="normal"
          value={entreprise.nom}
          onChange={handleChangeEntreprise}
        />
        <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
          Localités
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
          <TextField
            name="localiteInput"
            label="Nouvelle localité"
            variant="outlined"
            fullWidth
            value={localiteInput}
            onChange={handleLocaliteInputChange}
          />
          <Button variant="contained" color="primary" onClick={handleAddLocalite}>
            Ajouter
          </Button>
        </Box>

        {entreprise.localite.map((localite: ILocalite) => (
        <Box key={localite.id} sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
          <Typography>{localite.name}</Typography>
          <IconButton onClick={() => handleRemoveLocalite(localite.id)}>
            <DeleteIcon />
          </IconButton>
        </Box>
))}



        <TextField
          name="secteur_act"
          label="Secteur d'activité"
          variant="outlined"
          fullWidth
          margin="normal"
          value={entreprise.secteur_act}
          onChange={handleChangeEntreprise}
        />

        <TextField
          name="nb_stage_cesi"
          label="Nombre de stagiaires CESI"
          type="number"
          variant="outlined"
          fullWidth
          margin="normal"
          value={entreprise.nb_stage_cesi}
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