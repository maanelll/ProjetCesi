import React from 'react';
import { Box, Button, Typography, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import UsersList from "../../../components/admin/UsersList";

const User = () => {
  const navigate = useNavigate();

  const handleClickAddUser = () => {
    navigate(`/admin/users/create`);
  };

  return (
    <div>
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: "1rem" }}>
        <Box>
          <Button variant="contained" color="primary" onClick={handleClickAddUser}>
            Ajouter un utilisateur
          </Button>
        </Box>
        <Box sx={{ marginLeft: "auto", marginRight: "2rem" }}>
          <TextField label="Rechercher" variant="outlined" size="small" sx={{ width: 250 }} />
        </Box>
      </Box>
      <Box sx={{ marginBottom: "2rem" }}>
        <UsersList />
      </Box>
    </div>
  );
};

export default User;




