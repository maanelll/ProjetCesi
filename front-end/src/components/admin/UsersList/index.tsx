import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Box, Button, Typography } from "@mui/material";
import { DataGrid, GridCellParams, GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { IUser} from "../../../types";
import AuthContext from "../../../config/authContext";


const UsersList: React.FC = () => {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const [user, setUser] = useState<IUser[]>([]);
  const config = {
    headers: {
      Authorization: `Bearer ${token}` 
    }
  };
  const handleDeleteUserClick = (userId: number) => {
    axios.delete(`https://localhost:8000/api/delete_user/${userId}`, config)
      .then(()=>
        window.location.reload()
      )
      .catch((error) => {
      console.error("Error deleting", error)
    })
  };
  const handleEditUserClick = (userId: number) => {
    navigate(`/admin/users/${userId}/edit`)
  };
  useEffect(() => {
  axios.get(`https://localhost:8000/api/users`,config)
    .then(response => {
      setUser(response.data);
    })
    .catch(error => {
      console.error("Error fetching data:", error);
    });
  }, []);

const columns: GridColDef[] = [
  { field: "firstName", headerName: "Nom", width: 100 },
  { field: "lastName", headerName: "Prénom", width: 200 },
  { field: "role", headerName: "Rôle", width: 150 },
  { field: "center", headerName: "Centre", width: 150 },
  { 
    field: "promotions", 
    headerName: "Promotions", 
    width: 150,
    renderCell: (params: GridCellParams) => {
      const user = params.row as IUser;
      
      if (user.role === "ROLE_STUDENT" && user.promotion) {
        return <span>{user.promotion}</span>
      } else if (user.role === "ROLE_PILOT" && user.promotions) {
        return <span>{user.promotions.join(', ')}</span> 
      }
      return null;
    }  
  },
 
  {
    field: "actions",
    headerName: "Actions",
    width: 300,
    renderCell: (params: GridCellParams) => {
      return (
        <>
          <Button variant="contained" onClick={() => handleDeleteUserClick(params.row.id)}>
          delete
        </Button>
        <Button variant="contained" onClick={() => handleEditUserClick(params.row.id)}>
          edit
        </Button>
        </>
      );
    },
  },
];
    return (
        <>
      <Box sx={{ p: 3 , marginLeft: "20px" }}>
        <Typography variant="h5" sx={{ mb: 3 }}>
          Liste des utilisateurs
        </Typography>
        <div style={{ height: 300, width: "100%" }}>
          <DataGrid<IUser> rows={user} columns={columns} autoPageSize getRowId={(row) => row.id} />
        </div>
      </Box>
    </>
  );
};

export default UsersList;