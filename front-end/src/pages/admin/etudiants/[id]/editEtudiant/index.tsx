import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { IEtudiant } from '../../../../../types';
import axios from 'axios';
import CreateEtudiant from '../../create';

const EditEtudiant = () => {
    const { etudiantId } = useParams();
    const [etudiant, setEtudiant] = useState<IEtudiant | null>(null);
    
    useEffect(() => {
    axios.get(`http://localhost:8000/api/edit_etudiant/${etudiantId}`)
      .then(response => {
        setEtudiant(response.data);
      })
      .catch(error => {
        console.error("Error fetching etudiant data:", error);
      });
  }, [etudiantId]);
    return (
        <div>
      {etudiant ? (
        <CreateEtudiant isEditMode={true} existingEtudiant={etudiant} />
      ) : (
        <p>chargement des données de l'etudiant...</p>
      )}
    </div>
    );
};

export default EditEtudiant;