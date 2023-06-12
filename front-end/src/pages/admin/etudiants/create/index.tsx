import { Box, Button, IconButton, Rating, TextField, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IEtudiant, ICentre, IPromotion } from "../../../../types";
import AuthContext from "../../../../config/authContext";



interface CreateEtudiantProps {
  isEditMode: boolean;
  existingEtudiant?: IEtudiant;
}

const CreateEtudiant:React.FC<CreateEtudiantProps>= ({isEditMode,existingEtudiant}) => {
  const navigate = useNavigate()
  const { token } = useContext(AuthContext);
  const [etudiant, setEtudiant] = useState<IEtudiant>({
    id: isEditMode ? existingEtudiant?.id || 0 : 0,
    nom: isEditMode ? existingEtudiant?.nom || "" : "",
    prenom: isEditMode ? existingEtudiant?.prenom || "" : "",
    email: isEditMode ? existingEtudiant?.email || "" : "",
    motdepasse: isEditMode ? existingEtudiant?.motdepasse || "" : "",
    centre: isEditMode ? existingEtudiant?.centre || "" : "",
    promotion: isEditMode ? existingEtudiant?.promotion || "" : ""
   
  });


  const handleChangeEtudiant = (e: React.ChangeEvent<HTMLInputElement>) => {
      
    const { name, value } = e.target;
    setEtudiant((prevData) => ({ ...prevData, [name]: value }));
    };
 

  const config = {
    headers: {
      Authorization: `Bearer ${token}` 
    }
  };


  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  // Create the etudiant data with the associated localite IDs
  const etudiantData = {
    nom: etudiant.nom,
    prenom: etudiant.prenom,
    email: etudiant.email,
    password: etudiant.motdepasse
 
  };

  // Post the etudiant data
  axios.post("http://localhost:8000/api/create_etudiant", etudiantData, config)
    .then(() => {
      navigate("/admin/etudiants");
    })
    .catch((error) => {
      console.error(error);
    });
};


    return (
        <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Formulaire de création d'etudiant
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          name="nom"
          label="Nom de l'etudiant"
          variant="outlined"
          fullWidth
          margin="normal"
          value={etudiant.nom}
          onChange={handleChangeEtudiant}
        />
        <TextField
          name="secteur_act"
          label="Secteur d'activité"
          variant="outlined"
          fullWidth
          margin="normal"
          value={etudiant.prenom}
          onChange={handleChangeEtudiant}
        />
        <TextField
          name="nb_stage_cesi"
          label="Nombre de stagiaires CESI"
          type="number"
          variant="outlined"
          fullWidth
          margin="normal"
          value={etudiant.email}
          onChange={handleChangeEtudiant}
        />
          <TextField
          name="nb_stage_cesi"
          label="Nombre de stagiaires CESI"
          type="number"
          variant="outlined"
          fullWidth
          margin="normal"
          value={etudiant.motdepasse}
          onChange={handleChangeEtudiant}
        />

        <Button type="submit" variant="contained" color="primary">
            <Typography sx={{color:"black",fontFamily:"arial"}}>Enregistrer</Typography>
        </Button>
      </form>
    </Box>
    );
};

export default CreateEtudiant;