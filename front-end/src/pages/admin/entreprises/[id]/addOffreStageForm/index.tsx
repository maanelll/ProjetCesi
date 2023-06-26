import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { useNavigate, useParams } from "react-router-dom";
import {
  ICompetence,
  ILocalite,
  IOffrestage,
  IPromotion,
} from "../../../../../types";
import { SNACKBAR_MESSAGES } from "../../../../../config/constants";
import axios from "axios";
import AuthContext from "../../../../../config/authContext";
import { useSnackbar } from "../../../../../context/SnackBarContext";
interface addOffreStageFormPropos {
  isEditMode: boolean;
  existingOffrestage?: IOffrestage | null;
}

const AddOffreStageForm: React.FC<addOffreStageFormPropos> = ({
  isEditMode,
  existingOffrestage,
}) => {
  const showSnackbar = useSnackbar();

  const [offre, setOffre] = useState<IOffrestage>({
    id: isEditMode ? existingOffrestage?.id || 0 : 0,
    name: isEditMode ? existingOffrestage?.name || "" : "",
    internship_duration: isEditMode
      ? existingOffrestage?.internship_duration || 0
      : 0,
    compensation_basis: isEditMode
      ? existingOffrestage?.compensation_basis || 0
      : 0,
    offer_date: isEditMode
      ? existingOffrestage?.offer_date || new Date()
      : new Date(),
    nb_places_offered: isEditMode
      ? existingOffrestage?.nb_places_offered || 0
      : 0,
    promotion: isEditMode ? existingOffrestage?.promotion || [] : [],

    competence: isEditMode ? existingOffrestage?.competence || [] : [],

    localite_id: isEditMode ? existingOffrestage?.localite_id || 0 : 0,
    localite: isEditMode
      ? existingOffrestage?.localite || {
          id: 0,
          adress: "",
          city: "",
          code_postal: "",
        }
      : { id: 0, adress: "", city: "", code_postal: "" },
  });

  const [localites, setLocalites] = useState<ILocalite[]>([]);
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const { entrepriseId } = useParams(); // fetch company id from url
  const [selectedLocality, setSelectedLocality] = useState("");
  const [competencesInput, setCompetencesInput] = useState<ICompetence>({
    id: 0,
    comp: "",
  });
  const [promotions, setPromotions] = useState<IPromotion[]>([]);
  const [selectedPromotion, setSelectedPromotion] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/promotion", config)
      .then((response) => {
        setPromotions(response.data);
        if (isEditMode) {
          const selectedPromoId = existingOffrestage?.promotion[0]?.id || "";
          setSelectedPromotion(selectedPromoId.toString());
        }
      })
      .catch((error) => {
        console.error("Error fetching promotions:", error);
      });
  }, []);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setOffre((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    setSelectedLocality(event.target.value as string);
  };
  const handleCompetenceInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setCompetencesInput((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddCompetence = () => {
    if (competencesInput?.comp.trim() !== "") {
      const competenceData: ICompetence = {
        id: competencesInput.id,
        comp: competencesInput?.comp.trim(),
      };

      axios
        .post("http://localhost:8000/api/competence", competenceData, config)
        .then((response) => {
          const newCompetence: ICompetence = {
            id: response.data.id,
            comp: competenceData.comp,
          };
          setOffre((prevData) => ({
            ...prevData,
            competence: [...prevData.competence, newCompetence],
          }));

          setCompetencesInput({
            id: 0,
            comp: "",
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  useEffect(() => {
    if (!isEditMode) {
      axios
        .get(`http://localhost:8000/api/entreprise/${entrepriseId}`, config)
        .then((response) => {
          setLocalites(response.data.localities);
          setOffre((prevData) => ({
            ...prevData,
            entreprise_id: Number(entrepriseId),
          }));
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, []);
  useEffect(() => {
    if (isEditMode && existingOffrestage) {
      const h = existingOffrestage?.localite_id;

      console.log("hedha offre de stage fel edit", existingOffrestage);
      axios
        .get(`http://localhost:8000/api/entreprise/${h}`, config)
        .then((response) => {
          setLocalites(response.data.localities);
          console.log("hedhi localite fel edit" + response.data);
          if (existingOffrestage)
            setOffre((prevData) => ({
              ...prevData,
              localite_id: Number(existingOffrestage?.localite_id),
            }));
          return axios.get(
            `http://localhost:8000/api/localite/${existingOffrestage.localite_id}`,
            config
          );
        })
        .then((response) => {
          setOffre((prevData) => ({
            ...prevData,
            localite: response.data,
          }));

          setSelectedLocality(response.data.id.toString()); // <-- Here's the new line of code
          console.log("Response from the second API call: ", response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, []);
  const handleRemoveCompetence = (competenceId: number) => {
    axios
      .delete(`http://localhost:8000/api/competence/${competenceId}`, config)
      .then(() => {
        setOffre((prevData) => ({
          ...prevData,
          competence: prevData.competence?.filter(
            (competence) => competence.id !== competenceId
          ),
        }));
        console.log(offre.competence);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const competenceIds = offre.competence?.map((competence) => competence.id);

  const offreStage = {
    name: offre.name,
    internship_duration: offre.internship_duration,
    compensation_basis: offre.compensation_basis,
    offer_date: offre.offer_date,
    nb_places_offered: offre.nb_places_offered,
    promotion: [selectedPromotion],
    localite_id: selectedLocality,
    competence: competenceIds,
    entreprise_id: entrepriseId,
  };
  const handlePromotionChange = (event: SelectChangeEvent) => {
    setSelectedPromotion(event.target.value as string);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!offre.offer_date) {
      console.error("offer_date or entrepriseId cannot be null");
      return;
    }

    if (!isEditMode) {
      axios
        .post("http://localhost:8000/api/offrestage", offreStage, config)
        .then((response) => {
          console.log(response);
          navigate("/admin/offreStages");
        })
        .catch((error) => {
          console.error("Error posting data:", error);
        });
    } else {
      if (existingOffrestage || offre)
        axios
          .patch(
            `http://localhost:8000/api/offrestage/${existingOffrestage?.id}`,
            offreStage,
            config
          )
          .then(() => {
            showSnackbar("success", SNACKBAR_MESSAGES.success.axios.patch);
            navigate("/admin/offreStages");
          })
          .catch(() => {
            showSnackbar("error", SNACKBAR_MESSAGES.error.axios.patch);
          });
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Formulaire de création d'offre de stage
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          name="name"
          label="Offre de stage "
          variant="outlined"
          fullWidth
          margin="normal"
          value={offre?.name}
          onChange={handleChange}
        />
        <TextField
          name="internship_duration"
          label="Durée de stage"
          variant="outlined"
          fullWidth
          margin="normal"
          value={offre?.internship_duration}
          onChange={handleChange}
        />

        <TextField
          name="compensation_basis"
          label="Rénumération"
          variant="outlined"
          fullWidth
          margin="normal"
          value={offre?.compensation_basis}
          onChange={handleChange}
        />

        <TextField
          name="offer_date"
          label="La date de l'offre"
          type="date"
          variant="outlined"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
          value={offre?.offer_date}
          onChange={handleChange}
        />

        <TextField
          name="nb_places_offered"
          label="Nombre de places offertes"
          type="number"
          variant="outlined"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
          value={offre?.nb_places_offered}
          onChange={handleChange}
        />
        <FormControl fullWidth>
          <InputLabel id="promotion-label">Promotion</InputLabel>
          <Select
            labelId="promotion-label"
            id="promotion-select"
            value={selectedPromotion}
            onChange={handlePromotionChange}
          >
            {promotions.map((promotion) => (
              <MenuItem key={promotion.id} value={promotion.id}>
                {promotion.promo}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="localite-label">Localité</InputLabel>
            <Select
              labelId="localite-label"
              id="localite-select"
              value={selectedLocality}
              label="Localité"
              onChange={handleSelectChange}
            >
              {localites.map((localite, index) => (
                <MenuItem key={index} value={localite.id}>
                  {`${localite?.adress} - ${localite.city} ${localite?.code_postal}`}{" "}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
          Compétences
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "row", marginBottom: 2 }}>
          <TextField
            name="comp"
            label="comp"
            variant="outlined"
            fullWidth
            value={competencesInput.comp}
            onChange={handleCompetenceInputChange}
            margin="normal"
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleAddCompetence}
          >
            Ajouter
          </Button>
        </Box>

        {offre.competence?.map((competence: ICompetence, index: number) => (
          <Box
            key={competence.id}
            sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}
          >
            <Typography>{competence.comp}</Typography>
            <IconButton onClick={() => handleRemoveCompetence(competence.id)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
        <Button type="submit" variant="contained" color="primary">
          <Typography sx={{ color: "black", fontFamily: "Arial" }}>
            Enregistrer
          </Typography>
        </Button>
      </form>
    </Box>
  );
};

export default AddOffreStageForm;
