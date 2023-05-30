import { Box, Button, Rating, Typography } from "@mui/material";
import { DataGrid, GridCellParams, GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

const EntreprisesList: React.FC = () => {
  const navigate = useNavigate();
  type GridData = {
    id: number;
    nom: string;
    secteur_act: string;
    nb_stage_cesi: number;
    eval_stag: number;
    conf_pilote: number;
  };

  const columns: GridColDef[] = [
    { field: "nom", headerName: "Nom", width: 150 },
    { field: "secteur_act", headerName: "Secteur d'activité", width: 200 },
    { field: "nb_stage_cesi", headerName: "Nombre de Stagiaire", width: 150 },
    {
      field: "eval_stag",
      headerName: "Evaluation des stagiaires",
      width: 200,
      renderCell: (params) => (
        <Rating
          name={`rating-${params.row.id}`}
          value={params.value}
          readOnly
        />
      ),
    },
    {
      field: "conf_pilote",
      headerName: "Confiance de pilote de promo",
      width: 200,
      renderCell: (params) => (
        <Rating
          name={`rating-${params.row.id}`}
          value={params.value}
          readOnly
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params: GridCellParams) => {
        const handleButtonClick = (entrepriseId: number) => {
          navigate(`/admin/entreprises/${entrepriseId}/addOffreStageForm`);
        };

        return (
          <Button
            variant="contained"
            onClick={() => handleButtonClick(params.row.id)}
          >
            stage
          </Button>
        );
      },
    },
  ];

  const rows: GridData[] = [
    {
      id: 1,
      nom: "Attineos",
      secteur_act: "developpement",
      nb_stage_cesi: 5,
      eval_stag: 4,
      conf_pilote: 2,
    },
  ];

  return (
    <>
      <Box sx={{ p: 3, marginLeft: "20px" }}>
        <Typography variant="h5" sx={{ mb: 3 }}>
          Liste des entreprises
        </Typography>

        {/* Data Grid */}
        <div style={{ height: 300, width: "100%" }}>
          <DataGrid<GridData>
            rows={rows}
            columns={columns}
            autoPageSize
            getRowId={(row) => row.id}
          />
        </div>
      </Box>
    </>
  );
};

export default EntreprisesList;
