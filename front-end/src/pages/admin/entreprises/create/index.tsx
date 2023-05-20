import { Box, Button, Rating, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface FormData {
  nom: string;
  secteur: string;
  nbStagiaires: number;
  confiance: number;
}

const CreateEntreprise = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState<FormData>({
    nom: "",
    secteur: "",
    nbStagiaires: 0,
    confiance: 0,
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
    const handleRatingChange = (value: number | null) => {
    setFormData((prevData) => ({ ...prevData, confiance: value || 0 }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Perform form submission or validation logic here
      console.log(formData);
    navigate("/admin/entreprises")
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
          value={formData.nom}
          onChange={handleChange}
        />

        <TextField
          name="secteur"
          label="Secteur d'activité"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.secteur}
          onChange={handleChange}
        />

        <TextField
          name="nbStagiaires"
          label="Nombre de stagiaires CESI"
          type="number"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.nbStagiaires}
          onChange={handleChange}
        />

        <Box sx={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
          <Typography sx={{ marginRight: "8px" }}>Confiance de pilote de promotion:</Typography>
          <Rating
            name="confiance"
            value={formData.confiance}
            onChange={(event, newValue) => handleRatingChange(newValue)}
          />
        </Box>

        <Button type="submit" variant="contained" color="primary">
            <Typography sx={{color:"black",fontFamily:"arial"}}>Enregistrer</Typography>
        </Button>
      </form>
    </Box>
    );
};

export default CreateEntreprise;