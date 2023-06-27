import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Box, Typography, IconButton } from "@mui/material";
import { DataGrid, GridCellParams, GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { IUser, IPromotion } from "../../../types";
import AuthContext from "../../../config/authContext";
import {
  EditOutlined as EditIcon,
  DeleteOutline as DeleteIcon,
} from "@mui/icons-material";
import { styled } from "@mui/system";

const UsersList: React.FC = () => {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const [users, setUsers] = useState<IUser[]>([]);

  const StyledHeaderCell = styled("div")`
    font-size: 16px;
    font-weight: bold;
    text-align: "center";
  `;

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const handleDeleteUserClick = (userId: number) => {
    axios
      .delete(`http://localhost:8000/api/delete_user/${userId}`, config)
      .then(() => {
        // Refresh the users list after deletion
        fetchUsers();
      })
      .catch((error) => {
        console.error("Error deleting", error);
      });
  };

  const handleEditUserClick = (userId: number) => {
    navigate(`/admin/users/${userId}/edit`);
  };

  const fetchUsers = () => {
    axios
      .get(`http://localhost:8000/api/users`, config)
      .then((response) => {
        const users = response.data.map((user: any) => {
          // Si promotions est une chaîne, convertissez-la en un tableau contenant un objet IPromotion
          if (typeof user.promotions === "string") {
            return {
              ...user,
              promotions: [
                {
                  id: 1, // Assurez-vous de remplacer cette valeur par une valeur d'ID valide
                  promo: user.promotions,
                },
              ],
            };
          }
          // Si promotions est un tableau de chaînes, convertissez chaque chaîne en un objet IPromotion
          else if (Array.isArray(user.promotions)) {
            return {
              ...user,
              promotions: user.promotions.map(
                (promo: string, index: number) => ({
                  id: index + 1, // Assurez-vous de remplacer cette valeur par une valeur d'ID valide
                  promo,
                })
              ),
            };
          }
          return user;
        });
        setUsers(users);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const columns: GridColDef[] = [
    {
      field: "firstName",
      headerName: "Nom",
      width: 200,
      renderHeader: (params) => (
        <StyledHeaderCell>{params.colDef.headerName}</StyledHeaderCell>
      ),
    },
    {
      field: "lastName",
      headerName: "Prénom",
      width: 200,
      renderHeader: (params) => (
        <StyledHeaderCell>{params.colDef.headerName}</StyledHeaderCell>
      ),
    },
    {
      field: "role",
      headerName: "Rôle",
      width: 200,
      renderHeader: (params) => (
        <StyledHeaderCell>{params.colDef.headerName}</StyledHeaderCell>
      ),
    },
    {
      field: "center",
      headerName: "Centre",
      width: 200,
      renderHeader: (params) => (
        <StyledHeaderCell>{params.colDef.headerName}</StyledHeaderCell>
      ),
    },
    {
      field: "promotions",
      headerName: "Promotions",
      width: 200,
      renderHeader: (params) => (
        <StyledHeaderCell>{params.colDef.headerName}</StyledHeaderCell>
      ),
      renderCell: (params: GridCellParams) => {
        const user = params.row as IUser;
        if (Array.isArray(user.promotions)) {
          return (
            <ul style={{ listStyleType: "none" }}>
              {(user.promotions as IPromotion[]).map((promotion) => (
                <li key={promotion.id}>{promotion.promo}</li>
              ))}
            </ul>
          );
        } else if (typeof user.promotions === "string") {
          return <span>{user.promotions}</span>;
        }
        return null;
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderHeader: (params) => (
        <StyledHeaderCell>{params.colDef.headerName}</StyledHeaderCell>
      ),
      renderCell: (params: GridCellParams) => {
        const userId = params.row.id as number;
        return (
          <>
            <IconButton
              size="small"
              color="primary"
              onClick={() => handleEditUserClick(userId)}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              size="small"
              color="secondary"
              onClick={() => handleDeleteUserClick(userId)}
            >
              <DeleteIcon />
            </IconButton>
          </>
        );
      },
    },
  ];

  return (
    <Box sx={{ p: 3, marginLeft: "20px", width: "100%" }}>
      <Typography variant="h5" sx={{ mb: 3, fontSize: "1.5rem" }}>
        Liste des utilisateurs
      </Typography>
      <div style={{ height: "calc(100vh - 200px)", width: "100%" }}>
        <DataGrid
          rows={users}
          columns={columns}
          autoPageSize
          getRowId={(row) => row.id}
        />
      </div>
    </Box>
  );
};

export default UsersList;
