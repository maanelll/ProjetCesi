import React from 'react';
import { Box, Button, Typography, Rating } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { DataGrid, GridCellParams, GridColDef} from '@mui/x-data-grid';
import EtudiantsList from "../../../components/admin/EtudiantsList";

const EtudiantAdmin = () => {
      const navigate = useNavigate()
      const handleClickAddEtudiant = () => {
      navigate(`/admin/etudiants/create`)
  }
    return (
          <div>
                <article>
            <header>
            <h1>Etidiants</h1>
            </header>
                </article>
        
            <section>
        {
          <>
            <Box display="flex" flexDirection="column" sx={{ mb: "60px" }}>
                <EtudiantsList />
            </Box>
            <Box sx={{ display: "flex", marginTop: "-80px", marginLeft:"50px"}}>
              <Button type="submit" variant="contained" color="primary" onClick={handleClickAddEtudiant}>
                <Typography sx={{color:"black",fontFamily:"arial"}} >Ajouter</Typography>
              </Button>
            </Box>
          </>
        }
      </section>
      

        </div>
    );
};

export default EtudiantAdmin;



