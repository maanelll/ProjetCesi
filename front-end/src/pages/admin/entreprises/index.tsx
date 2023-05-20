import { Box, Button, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import EntreprisesList from "../../../components/admin/EntreprisesList";


const EntrepriseAdmin = () => {
  const navigate = useNavigate()
  const handleClickAddEntreprise = () => {
    navigate(`/admin/entreprises/create`)
  }

    return (
        <div>
                <article>
            <header>
            <h1>Entreprises</h1>
            </header>
                </article>
        
            <section>
        {
          <>
            <Box display="flex" flexDirection="column" sx={{ mb: "60px" }}>
                <EntreprisesList />
            </Box>
            <Box sx={{ display: "flex", marginTop: "-80px", marginLeft:"50px"}}>
              <Button type="submit" variant="contained" color="primary" onClick={handleClickAddEntreprise}>
                <Typography sx={{color:"black",fontFamily:"arial"}} >Créer</Typography>
              </Button>
            </Box>
          </>
        }
      </section>
      

        </div>
    );
};

export default EntrepriseAdmin;