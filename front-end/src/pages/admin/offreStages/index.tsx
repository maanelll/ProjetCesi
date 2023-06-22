import { Box } from "@mui/material";
import OffredestageList from "../../../components/admin/OffredestageList";

const Offre_stage_Admin = () => {
  return (
    <div>
      <article>
        <header>offres destages </header>
      </article>

      <section>
        {
          <>
            <Box display="flex" flexDirection="column" sx={{ mb: "60px" }}>
              <OffredestageList />
            </Box>
            <Box
              sx={{ display: "flex", marginTop: "-80px", marginLeft: "50px" }}
            ></Box>
          </>
        }
      </section>
    </div>
  );
};

export default Offre_stage_Admin;
