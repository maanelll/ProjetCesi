import { Box, Button, Rating, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IEntreprise, ILocalite } from "../../../../types";



const CreateEntreprise = () => {
  const navigate = useNavigate()
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const requestBody = {
    nom: entreprise.nom,
    secteur_act: entreprise.secteur_act,
    nb_stage_cesi: entreprise.nb_stage_cesi,
    localites:[]
    };
    const config = {
    headers: {
      Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2ODQ5MzQwNTEsImV4cCI6MTY4NDkzNzY1MSwicm9sZXMiOlsiUk9MRV9BRE1JTiJdLCJlbWFpbCI6InNhaWZAZXhhbXBsZS5jb20ifQ.plvWbSDk22AZRm6rBipnXwJ3sP0Ak6Mx9fqEkDnjzFTosviH0RckIqudxlx_Jj-l_3fhV3hNU2Vr9Rf_wcLLUDX94GEJBRC6aIUwvUTrfNfRpfeB8juKl4ShnAdzKElJtZiHpz9VQRCnFe_9rvi92_BCVTXcz0OSUM4m_jCBVaqFb5ra2T7Vj1KxHA1A-Zohh_RQFqU2iPfROTilAVSX58VciyLydNnf_LlGjPzCm5_63G5tZ6ua7Sl71Elrm2T6IplQYgsVzdySXN2-CWKNJtkV16dlx0NgwroYkenMUatMpiWNyDJHrklSZtJlKiSFlIArEnBzApNDlA_1G14IDaHzvA0-CjS3m4tLE_zXvGb8LY6ejoXtY3TRLnvcEVQHmjhT5d000RiIqsydyFxuD2hTiuuGs22K7ifBuX4sKeD1z-J6DKw-pdifnEBc40vUngehBUNB0EoSPvqbjVfRYps687BC_vmFgZAD1aRM8Wj6Uszhx5fj32GLPGDRTHGSDRzm85VyFf-YUiRk5BvNpdvxRhkX7vjDHich9o73yihBDo1AJkotuEJEHRd4YgZtl6PYfHfjNB_onhVTKIc9N5vYqbvBTPBByntSAKqeY-mcnc-onNVipJrPOGeHP6-1eU68CmolQzYAu5Ry7n2JXs9KHfVr2UNfL-CJu12Qznw` 
    }
  };
    const localiteRequests = entreprise.localites.map((localite) => {
        return axios.post(`http://localhost:8000/api/localite`, localite, config);
      });
    
    Promise.all(localiteRequests)
    .then((localiteResponses) => {
      // const localiteIds = localiteResponses.map((response) => response.data.id);
      // const entrepriseData = {
      //     ...entreprise,
      //     localites: localiteIds,
      //   };
        return axios.post(`http://localhost:8000/api/entreprise`, requestBody, config);
    })
    .then((entrepriseResponse)=>{
      const entrepriseId = entrepriseResponse.data.id;
      const patchRequest = axios.patch(
        `http://localhost:8000/api/entreprise/${entrepriseId}`,
        {
          id: entreprise.localites.map((localite) => localite.id),
        }
      );
      return patchRequest;
    })
    .then(()=>{
      navigate("/admin/entreprises");
    })
    .catch(error => {
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