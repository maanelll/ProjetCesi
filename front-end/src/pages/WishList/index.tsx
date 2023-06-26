import React, { useEffect, useState, useContext } from 'react';
import { Box, Card, CardContent, Typography, IconButton } from '@mui/material';
import { BusinessCenter, Favorite, FavoriteBorder, LocationOn } from '@mui/icons-material';
import axios from 'axios';
import AuthContext from '../../config/authContext';
import { IWishlist } from '../../types';

const WishList = () => {
    const { token, loggedUser } = useContext(AuthContext);
    const [wishList, setWishList] = useState<IWishlist[]>([]);
    console.log("ena howa" + loggedUser?.id)
    
    useEffect(() => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  if (loggedUser) {
      const userId = loggedUser.id;

    axios
      .get(`http://localhost:8000/api/wishlist/${userId}`, config)
      .then(response => {
        setWishList(response.data);
      })
      .catch(error => {
        console.error('Error fetching wishlist:', error);
      });
  }
}, [token, loggedUser]);
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
                {/* <Typography variant="h6">{internship.entreprise_name}</Typography> */}
                <Typography variant="body1">{internship.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {/* {internship.localite} */}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Competences demandées: {internship.competence.map((competence: any) => competence).join(', ')}
                </Typography>
              </Box>
              <IconButton color="warning">
                <Favorite />
              </IconButton>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default WishList;