import { Box, Button, IconButton, Rating, TextField, Typography } from "@mui/material";
import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IEntreprise, ILocalite } from "../../../../types";
import AuthContext from "../../../../config/authContext";
import DeleteIcon from '@mui/icons-material/Delete';


interface CreateEntrepriseProps {
  isEditMode: boolean;
  existingEntreprise?: IEntreprise;
  existingLocalite?: ILocalite[];
}

const CreateEntreprise:React.FC<CreateEntrepriseProps>= ({isEditMode,existingEntreprise, existingLocalite}) => {
  const navigate = useNavigate()
  const { token } = useContext(AuthContext);
  const [entreprise, setEntreprise] = useState<IEntreprise>({
    id: isEditMode ? existingEntreprise?.id || 0 : 0,
    nom: isEditMode ? existingEntreprise?.nom || "" : "",
    secteur_act: isEditMode ? existingEntreprise?.secteur_act || "" : "",
    nb_stage_cesi: isEditMode ? existingEntreprise?.nb_stage_cesi || 0 : 0,
    localite: isEditMode ? existingLocalite || [] : [],
  });
  const [localiteInput, setLocaliteInput] = useState({
  address: "",
  city: "",
  postalCode: ""
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
    localiteInput.address.trim() !== "" &&
    localiteInput.city.trim() !== "" &&
    localiteInput.postalCode.trim() !== ""
  ) {
    const localiteData = {
      address: localiteInput.address.trim(),
      city: localiteInput.city.trim(),
      postalCode: localiteInput.postalCode.trim()
    };

    axios
      .post("http://localhost:8000/api/localite", localiteData, config)
      .then((response) => {
        const newLocalite = {
          id: response.data.localite,
          ...localiteData
        };

        setEntreprise((prevData) => {
          const updatedLocalites = [...prevData.localite, newLocalite];
          return {
            ...prevData,
            localite: updatedLocalites
          };
        });

        setLocaliteInput({
          address: "",
          city: "",
          postalCode: ""
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }
};
  const handleRemoveLocalite = (localiteId: number) => {
  // Make API request to delete the localite
  axios
    .delete(`http://localhost:8000/api/localite/${localiteId}`, config)
    .then(() => {
      // Remove the localite from the entreprise state
      setEntreprise((prevData) => ({
        ...prevData,
        localite: prevData.localite.filter(
          (localite) => localite.id !== localiteId
        )
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
      name="address"
      label="Adresse"
      variant="outlined"
      fullWidth
      value={localiteInput.address}
      onChange={handleLocaliteInputChange}
    />
    <TextField
      name="city"
      label="Ville"
      variant="outlined"
      fullWidth
      value={localiteInput.city}
      onChange={handleLocaliteInputChange}
    />
    <TextField
      name="postalCode"
      label="Code postal"
      variant="outlined"
      fullWidth
      value={localiteInput.postalCode}
      onChange={handleLocaliteInputChange}
    />
    <Button variant="contained" color="primary" onClick={handleAddLocalite}>
      Ajouter
    </Button>
  </Box>

        {entreprise.localite.map((localite: ILocalite) => (
        <Box
          key={localite.id}
          sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}
        >
          <Typography>
            {localite.address}, {localite.city}, {localite.postalCode}
          </Typography>
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