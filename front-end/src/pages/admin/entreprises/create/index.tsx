import { Box, Button, Rating, TextField, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IEntreprise, ILocalite } from "../../../../types";
import AuthContext from "../../../../config/authContext";



const CreateEntreprise = () => {
  const navigate = useNavigate()
  const { token } = useContext(AuthContext);
  const [entreprise, setEntreprise] = useState<IEntreprise>({
    id:0,
    nom: "",
    secteur_act: "",
    nb_stage_cesi: 0,
    localites: [],
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
      const newLocalite: ILocalite = {
        id: entreprise.localites.length + 1,
        name: localiteInput,
      };
      setEntreprise((prevData) => ({
        ...prevData,
        localites: [...prevData.localites, newLocalite],
      }));
      setLocaliteInput("");
    }
  };
  const config = {
    headers: {
      Authorization: `Bearer ${token}` 
    }
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const requestBody = {
    nom: entreprise.nom,
    secteur_act: entreprise.secteur_act,
    nb_stage_cesi: entreprise.nb_stage_cesi,
    localites:[]
    };
    const localite = {
      name:localiteInput
    }
    
    // const localiteRequests = entreprise.localites.map((localite) => {
    //     return axios.post(`http://localhost:8000/api/localite`, localite, config);
    //   });
    const requestLocalite = axios.post(`http://localhost:8000/api/localite`, localite, config);
    console.log(requestLocalite)
    // Promise.all(localiteRequests)
    // .then((localiteResponses) => {
    //   const localiteIds = localiteResponses.map((response) => response.data.id);
    //   const entrepriseData = {
    //       ...entreprise,
    //       localites: localiteIds,
    //     };
    //     return axios.post(`http://localhost:8000/api/entreprise`, entrepriseData, config);
    // })
    // .then((entrepriseResponse)=>{
    //   const entrepriseId = entrepriseResponse.data.id;
    //   const patchRequest = axios.patch(
    //     `http://localhost:8000/api/entreprise/${entrepriseId}`,
    //     {
    //       id: entreprise.localites.map((localite) => localite.id),
    //     }
    //   );
    //   return patchRequest;
    // })
    // .then(()=>{
    //   navigate("/admin/entreprises");
    // })
    // .catch(error => {
    //   console.error(error);
    // });
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

        {entreprise.localites.map((localite) => (
          <Typography key={localite.id}>{localite.name}</Typography>
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