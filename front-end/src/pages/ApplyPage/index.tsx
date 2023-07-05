import React, {useState, useEffect, useContext} from 'react';
import { useNavigate, useParams } from 'react-router';
import {  IApplication, IWishlist } from '../../types';
import axios from 'axios';
import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material';
import AuthContext from '../../config/authContext';
import { ArrowCircleUp } from '@mui/icons-material';
import { useSnackbar } from '../../context/SnackBarContext';
import { SNACKBAR_MESSAGES } from '../../config/constants';

const ApplyPage = () => {
    const internshipId = useParams();
    const showSnackbar = useSnackbar();
    const navigate = useNavigate();
    const { token,loggedUser } = useContext(AuthContext);
    const [offrestage, setOffrestage] = useState<IWishlist | null>(null);
    const [cvFile, setCVFile] = useState<File | null>(null);
    const [motivationFile, setMotivationFile] = useState<File | null>(null);

    const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
    };
    
    useEffect(() => {
    const fetchOffrestage = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/offrestage/${internshipId.internshipId}`,config);
        setOffrestage(response.data);
      } catch (error) {
        console.error('Error fetching internship offer:', error);
      }
    };

    fetchOffrestage();
  }, [internshipId]);
  
    const handleCVFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
        setCVFile(event.target.files[0]);
        }
    };

    const handleMotivationFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
        setMotivationFile(event.target.files[0]);
        }
    };

    const handleApply = async () => {
  try {
    if (!cvFile || !motivationFile) {
      console.error('CV file and motivation letter file are required.');
      return;
    }

    const reader = new FileReader();

    reader.onloadend = async () => {
      const cvDataUrl = reader.result as string;
      const motivationDataUrl = reader.result as string;

      const applicationData: IApplication = {
        id: 0,
        status: "En attente",
        submission_date: new Date(),
        cv: cvDataUrl,
        motivation_letter: motivationDataUrl,
        user_id: loggedUser?.id ?? 0,
        offreStage_id: Number(internshipId.internshipId)
      };

      try {
        await axios.post('http://localhost:8000/api/application/create', applicationData, config);
        showSnackbar("success", SNACKBAR_MESSAGES.success.axios.apply);
      } catch (error) {
        showSnackbar("error", SNACKBAR_MESSAGES.error.axios.apply);
      }
    };

    reader.readAsDataURL(cvFile);
    reader.readAsDataURL(motivationFile);
  } catch (error) {
    showSnackbar("error", SNACKBAR_MESSAGES.error.axios.apply);
  }
};

  if (!offrestage) {
    return <div>Loading...</div>;
  }
    return (
    <Box display="flex" justifyContent="center" gap={4}>
      <Card sx={{ width: '550px' }}>
        <CardContent>
          <Typography variant="h4" sx={{ mb: 2 }}>
            {offrestage.name}
          </Typography>
          <Typography variant="h6" sx={{ mb: 2 }}>
            <b>Durée de stage:</b> {offrestage.internship_duration} mois
          </Typography>
          <Typography variant="h6" sx={{ mb: 2 }}>
            <b>Rénumération:</b> {offrestage.compensation_basis} Brut
          </Typography>
          <Typography variant="h6" sx={{ mb: 2 }}>
            <b>Date de début de stage:</b> {offrestage.offer_date.toLocaleString()}
          </Typography>
          <Typography variant="h6" sx={{ mb: 2 }}>
            <b>Nombre de places disponibles:</b> {offrestage.nb_places_offered}
          </Typography>
        </CardContent>
      </Card>
      <Card sx={{ width: '550px' }}>
        <CardContent>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Postuler en ligne
          </Typography>
          <Typography variant="h6" sx={{ mb: 2 }}>
            CHOISIR MON CV
          </Typography>
          <TextField
            type="file"
            variant="outlined"
            onChange={handleCVFileChange}
            sx={{ mb: 2 }}
          />
          <Typography variant="h6" sx={{ mb: 2 }}>
            LETTRE DE MOTIVATION
          </Typography>
          <TextField
            type="file"
            variant="outlined"
            onChange={handleMotivationFileChange}
            sx={{ mb: 2 }}
          />
            <Box sx={{ display: 'flex', justifyContent: 'start' }}>
                <Button variant="contained" color='warning' onClick={handleApply} startIcon={<ArrowCircleUp />}>
                    Envoyer
                </Button>
            </Box>
        </CardContent>
      </Card>
    </Box>
    );
};

export default ApplyPage;