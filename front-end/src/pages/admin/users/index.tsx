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
      
      <Box display="flex" flexDirection="column" sx={{ mb: "60px" }}>
        <UsersList />
      </Box>

       <Box
              sx={{ display: "flex", marginTop: "-80px", marginLeft: "50px" }}
            >
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={handleClickAddUser}
              >
                <Typography sx={{ color: "black", fontFamily: "arial" }}>
                  Ajouter
                </Typography>
              </Button>
            </Box>
    </div>
  );
};

export default User;




