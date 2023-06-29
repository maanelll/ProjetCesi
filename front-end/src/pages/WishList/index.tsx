import React, { useEffect, useState, useContext } from 'react';
import { Box, Card, CardContent, Typography, IconButton,Button } from '@mui/material';
import { BusinessCenter, Delete, Favorite, FavoriteBorder, LocationOn } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import AuthContext from '../../config/authContext';
import { IWishlist } from '../../types';

const WishList = () => {
  const { token, loggedUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [wishList, setWishList] = useState<IWishlist[]>([]);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
    
    useEffect(() => {
  if (loggedUser) {
      const userId = loggedUser.id;

    axios
      .get(`http://localhost:8000/api/wishlist/${userId}`, config)
      .then(response => {
        setWishList(response.data);
        console.log(response.data)
      })
      .catch(error => {
        console.error('Error fetching wishlist:', error);
      });
  }
    }, [token, loggedUser]);
    
  const handleApplyButton = (internshipId: number) => {
      navigate(`/wishList/${internshipId}/apply`)
    }

    const handleRemoveFromWishlist = (internshipId: number) => {
      if (loggedUser) {
        axios
          .delete(`http://localhost:8000/api/remove_offer/${internshipId}`, config)
          .then(response => {
            // Remove the deleted internship from the wishList state
            setWishList(prevList => prevList.filter(internship => internship.id !== internshipId));
          })
          .catch(error => {
            console.error('Error removing internship from wishlist:', error);
          });
      }
      };

      const isInternshipInWishlist = (internshipId: number) => {
        return wishList.some(internship => internship.id === internshipId);
      };

    return (
        <Box display="flex" flexDirection="column" gap={2}>
      <Box
        display="flex"
        justifyContent="start"
        alignItems="start"
        paddingLeft="15px"
        sx={{ backgroundColor: 'warning', height: '20px', fontWeight: 'bold' }}
      >
        {wishList.length} Internship Offers in Wish List
      </Box>

      {wishList.map((internship) => (
        <Card key={internship.id}>
          <CardContent>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box>
                <Typography variant="h5">{internship.name}</Typography>
                <Typography variant="body1">{internship.entreprise_name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {/* {internship.localite} */}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Competences demandées:
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {internship.competences.map((competence) => competence).join(', ')}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <Button variant="contained" color="warning" onClick={() => handleApplyButton(internship.offreStage_id)}>
                  Postuler
                </Button>
                <IconButton color="warning" onClick={() => handleRemoveFromWishlist(internship.id)}>
                  {isInternshipInWishlist(internship.id) ? <Delete /> : <FavoriteBorder />}
                </IconButton>
              </Box>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default WishList;