import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';
interface FormData {
  dureeStage: string;
  remuneration: string;
  dateOffre: string;
  nbPlacesOffertes: number;
  typePromotion: string;
}

const AddOffreStageForm = () => {

    const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    dureeStage: "",
    remuneration: "",
    dateOffre: "",
    nbPlacesOffertes: 0,
    typePromotion: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Perform form submission or validation logic here
    console.log(formData);
    navigate("/admin/offres-stage");
  };
    return (
        <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Formulaire de création d'offre de stage
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          name="dureeStage"
          label="Durée de stage"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.dureeStage}
          onChange={handleChange}
        />

        <TextField
          name="remuneration"
          label="Rénumération"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.remuneration}
          onChange={handleChange}
        />

        <TextField
          name="dateOffre"
          label="La date de l'offre"
          type="date"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.dateOffre}
          onChange={handleChange}
        />

        <TextField
          name="nbPlacesOffertes"
          label="Nombre de places offertes"
          type="number"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.nbPlacesOffertes}
          onChange={handleChange}
        />

        <TextField
          name="typePromotion"
          label="Type de promotion"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.typePromotion}
          onChange={handleChange}
        />

        <Button type="submit" variant="contained" color="primary">
          <Typography sx={{ color: "black", fontFamily: "Arial" }}>Enregistrer</Typography>
        </Button>
      </form>
    </Box>
    );
};

export default AddOffreStageForm;