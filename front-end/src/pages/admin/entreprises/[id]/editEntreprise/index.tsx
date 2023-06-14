import React,{useState, useEffect, useContext} from 'react';
import { useParams } from 'react-router-dom';
import { IEntreprise } from '../../../../../types';
import axios from 'axios';
import CreateEntreprise from '../../create';
import AuthContext from '../../../../../config/authContext';

const EditEntreprise = () => {
    const { entrepriseId } = useParams();
    const [entreprise, setEntreprise] = useState<IEntreprise | null>(null);
    const { token } = useContext(AuthContext);
    const config = {
    headers: {
      Authorization: `Bearer ${token}` 
    }
  };
    useEffect(() => {
    axios.get(`http://localhost:8000/api/entreprise/${entrepriseId}`,config)
      .then(response => {
        setEntreprise(response.data);
      })
      .catch(error => {
        console.error("Error fetching entreprise data:", error);
      });
  }, [entrepriseId]);
    return (
        <div>
      {entreprise ? (
        <CreateEntreprise isEditMode={true} existingEntreprise={entreprise} />
      ) : (
        <p>chargement des données de l'entreprise...</p>
      )}
    </div>
    );
};

export default EditEntreprise;