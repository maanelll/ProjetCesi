import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { IOffrestage } from "../../../../../types";
import axios from "axios";
import AuthContext from "../../../../../config/authContext";
import AddOffreStageForm from "../../../entreprises/[id]/addOffreStageForm";

const EditOffreStage = () => {
  const { offreStageId } = useParams();
  const [offreStage, setOffreStage] = useState<IOffrestage | null>(null);
  const { token } = useContext(AuthContext);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/offrestage/${offreStageId}`, config)
      .then((response) => {
        setOffreStage(response.data);
      })
      .catch((error) => {
        console.error("Error fetching entreprise data:", error);
      });
  }, [offreStageId]);
  return (
    <div>
      {offreStage ? (
        <AddOffreStageForm isEditMode={true} existingEntreprise={offreStage} />
      ) : (
        <p>chargement des données de l'entreprise...</p>
      )}
    </div>
  );
};

export default EditOffreStage;
