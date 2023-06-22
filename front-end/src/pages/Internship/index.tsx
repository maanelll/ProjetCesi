import React, {useEffect, useState, useContext} from 'react';
import { Box, Card, CardContent, Typography, IconButton, TextField, InputAdornment, Pagination } from '@mui/material';
import { BusinessCenter, Favorite, FavoriteBorder, LocationOn } from '@mui/icons-material';
import { IOffrestage } from '../../types';
import axios from 'axios';
import AuthContext from '../../config/authContext';


const Internship = () => {
    const { token } = useContext(AuthContext);
    const [favorites, setFavorites] = useState<number[]>([]);
    const [searchSkills, setSearchSkills] = useState('');
    const [searchLocation, setSearchLocation] = useState('');
    const [internships, setInternships] = useState<IOffrestage[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(3);
    const config = {
    headers: {
      Authorization: `Bearer ${token}` 
    }
  };
    useEffect(() => {
      axios.get('http://localhost:8000/api/offrestage',config)
        .then(response => {
          const formattedInternships: IOffrestage[] = response.data.map((item: any) => {
            return {
              id: item.id,
              internship_duration: item.internship_duration,
              compensation_basis: item.compensation_basis,
              offer_date: new Date(item.offer_date),
              nb_places_offered: item.nb_places_offered,
              name: item.name,
              competence: item.competence,
              promotion: item.promotion,
              entreprise_name: item.entreprise_name,
              localite: item.localite,
            };
          });
          setInternships(formattedInternships);
        })
        .catch(error => {
          console.error('Error fetching internships:', error);
        });
    }, []);
    const handleFavoriteClick = (id: number) => {
        if (favorites.includes(id)) {
        setFavorites(favorites.filter((favoriteId) => favoriteId !== id));
        } else {
        setFavorites([...favorites, id]);
        }
    };

    const handleSkillsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchSkills(event.target.value);
  };

    const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchLocation(event.target.value);
  };
    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
      setCurrentPage(page);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = internships.slice(indexOfFirstItem, indexOfLastItem);
  
    const filteredInternships = currentItems.filter((internship) => {
    const skillsMatch =
      searchSkills === '' ||
      internship.competence.some(
        (competence) => competence && competence.toLowerCase().includes(searchSkills.toLowerCase())
      );
    const locationMatch =
      searchLocation === '' ||
      (internship.localite && internship.localite.toLowerCase().includes(searchLocation.toLowerCase()));
    return skillsMatch && locationMatch;
  });
  
    return (
        <Box display="flex" flexDirection="column" gap={2} >
          <Box display="flex" flexDirection="column" sx={{backgroundColor: '#eaecf2',padding: '45px'}} alignItems="center">
            
            <Box display="flex" alignItems="center" gap={2} sx={{ marginTop: '16px'}}>
                <TextField
                label="recherche par compétence"
                value={searchSkills}
                onChange={handleSkillsChange}
                sx={{ width: '500px', }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <BusinessCenter color="warning" />
                        </InputAdornment>
                        )            
                    }}          
                />
                <TextField
                label="Recherche par ville"
                value={searchLocation}
                onChange={handleLocationChange}
                sx={{ width: '500px' }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <LocationOn color="warning" />
                        </InputAdornment>
                        )        
                    }}
                />
            </Box>
            
        </Box>
        <Box
        display="flex"
        justifyContent="start"
        alignItems="start"
        paddingLeft={"15px"}
        sx={{ backgroundColor: 'warning', height: '20px', fontWeight: 'bold' }}
      >
        {filteredInternships.length} Offres de stage
        </Box>
      
      {filteredInternships.map((internship) => (
        <Card key={internship.id}>
          <CardContent>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <Typography variant="h6">{internship.entreprise_name}</Typography>
                <Typography variant="body1">{internship.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {internship.localite}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Competences demandées: {internship.competence.map((competence) => competence).join(', ')}
                </Typography>
              </Box>
              <IconButton
                color={favorites.includes(internship.id) ? 'warning' : 'warning'}
                onClick={() => handleFavoriteClick(internship.id)}
              >
                {favorites.includes(internship.id) ? (
                  <Favorite />
                ) : (
                  <FavoriteBorder />
                )}
              </IconButton>
            </Box>
          </CardContent>
        </Card>
      ))}
        {/* Pagination */}
      <Box display="flex" justifyContent="center" marginTop="20px">
        <Pagination
          count={Math.ceil(internships.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
        />
      </Box>
    </Box>
    );
};

export default Internship;