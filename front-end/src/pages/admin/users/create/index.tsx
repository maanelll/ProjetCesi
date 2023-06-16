import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import AuthContext from "../../../../config/authContext";
import { IUser, IPromotion } from "../../../../types";

interface CreateUserProps {
  isEditMode: boolean;
  existingUser?: IUser;
}

const CreateUser: React.FC<CreateUserProps> = ({ isEditMode, existingUser }) => {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const [roles, setRoles] = useState<string[]>([]);
  const [centers, setCenters] = useState<string[]>([]);
  const [promotions, setPromotions] = useState<IPromotion[]>([]);
  const [roleId, setRoleId] = useState<number>(0);
  const [selectedPromotions, setSelectedPromotions] = useState<number[]>([]);
  const [email, setEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [centerId, setCenterId] = useState<number>(0);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    axios.get('https://localhost:8000/api/roles', config)
      .then(response => {
        const roleNames = response.data.map((role: { id: number, role: string }) => role.role);
        setRoles(roleNames);
      })
      .catch(error => {
        console.error("Error fetching roles:", error);
      });

    axios.get('https://localhost:8000/api/centers', config)
      .then(response => {
        const centerNames = response.data.map((center: { id: number, center: string }) => center.center);
        setCenters(centerNames);
      })
      .catch(error => {
        console.error("Error fetching centers:", error);
      });

    axios.get('https://localhost:8000/api/promotion', config)
      .then(response => {
        setPromotions(response.data);
      })
      .catch(error => {
        console.error("Error fetching promotions:", error);
      });
  }, [token]);

  const handleRoleChange = (event: SelectChangeEvent<number>) => {
    const roleId = event.target.value as number;
    setRoleId(roleId);
    setSelectedPromotions([]);
  };

  const handlePromotionIdsChange = (event: SelectChangeEvent<number | number[]>) => {
    const selectedPromotions = Array.isArray(event.target.value) ? event.target.value : [event.target.value as number];
    setSelectedPromotions(selectedPromotions);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const userData = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: password,
      roleId: roleId,
      promotionIds: selectedPromotions,
      centerId: centerId,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    axios.post("https://localhost:8000/api/create_user", userData, config)
      .then(() => {
        navigate("/admin/users");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Formulaire de création d'un utilisateur
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          name="firstName"
          label="Nom"
          variant="outlined"
          fullWidth
          margin="normal"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          name="lastName"
          label="Prénom"
          variant="outlined"
          fullWidth
          margin="normal"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <TextField
          name="email"
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          name="password"
          label="Mot de passe"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormControl fullWidth>
          <InputLabel id="role-select-label">Rôle</InputLabel>
          <Select
            labelId="role-select-label"
            id="role-select"
            value={roleId}
            label="Rôle"
            onChange={handleRoleChange}
          >
            {roles.map((role, index) => (
              <MenuItem key={index + 1} value={index + 1}>
                {role}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl variant="outlined" fullWidth margin="normal">
          <InputLabel id="center-label">Centre</InputLabel>
          <Select
            labelId="center-label"
            value={centerId}
            onChange={(e) => setCenterId(e.target.value as number)}
            label="Centre"
            name="center"
          >
            {centers.map((center, index) => (
              <MenuItem key={index + 1} value={index + 1}>{center}</MenuItem>
            ))}
          </Select>
        </FormControl>

        {(roleId === 2 || roleId === 3) && (
          <FormControl variant="outlined" fullWidth margin="normal">
            <InputLabel id="promotion-label">Promotion{roleId === 3 ? '' : 's'}</InputLabel>
            <Select
              labelId="promotion-label"
              multiple={roleId === 2}
              value={selectedPromotions}
              onChange={handlePromotionIdsChange}
              label="Promotions"
              name="promotion"
            >
              {promotions.map((promotion) => (
                <MenuItem key={promotion.id} value={promotion.id}>
                  {promotion.promo}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        <Button type="submit" variant="contained" color="primary">
          Enregistrer
        </Button>
      </form>
    </Box>
  );
};

export default CreateUser;
